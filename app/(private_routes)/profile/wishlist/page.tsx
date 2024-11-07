import { authOptions } from "@/auth";
import WishlistModel from "@/models/wishlistModel";
import { ObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const fetchProducts = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/404");

  const wishlist = await WishlistModel.findOne<{
    products: [
      {
        _id: ObjectId;
        title: string;
        thumbnail: { url: string };
        price: { discounted: number };
      }
    ];
  }>({
    user: session.user.id,
  }).populate({
    path: "products",
    select: "title thumbnail.url price.discounted",
  });

  if (!wishlist) return [];

  return wishlist?.products.map(({ _id, price, thumbnail, title }) => {
    return {
      id: _id.toString(),
      price: price.discounted,
      thumbnail: thumbnail.url,
      title,
    };
  });
};

async function Wishlist() {
  const products = await fetchProducts();
  console.log(products)
  return <div>Wishlist</div>;
}

export default Wishlist;
