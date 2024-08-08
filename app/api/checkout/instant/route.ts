import { authOptions } from "@/auth";
import { getCartItems } from "@/lib/cartHelper";
import ProductModel from "@/models/productModel";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const strip = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json(
        {
          error: "Unauthorized request!",
        },
        { status: 401 }
      );

    const data = await req.json();
    const productId = data.productId as string;

    if (!isValidObjectId(productId))
      return NextResponse.json(
        {
          error: "Invalid product id!",
        },
        { status: 401 }
      );

    const product = await ProductModel.findById(productId);
    if (!product)
      return NextResponse.json(
        { error: "Product not found!" },
        { status: 404 }
      );

    const line_items = {
      price_data: {
        currency: "USD",
        unit_amount: product.price.discounted * 100,
        product_data: {
          name: product.title,
          images: [product.thumbnail.url],
        },
      },
      quantity: 1,
    };

    const customer = await strip.customers.create({
      metadata: {
        userId: session.user.id,
        type: "instant-checkout",
        product: JSON.stringify({
          id: product.id,
          title: product.title,
          price: product.price.discounted,
          thumbnail: product.thumbnail.url,
          qty: 1,
        }),
      },
    });

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [line_items],
      success_url: process.env.PAYMENT_SUCCESS_URL,
      cancel_url: process.env.PAYMENT_CANCEL_URL,
      shipping_address_collection: { allowed_countries: ["US"] },
      customer: customer.id,
    };

    const checkoutSession = await strip.checkout.sessions.create(params);
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json(
      {
        error: "something went wrong,could not checkout!",
      },
      { status: 500 }
    );
  }
};
