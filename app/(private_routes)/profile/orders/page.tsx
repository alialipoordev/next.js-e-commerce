import { authOptions } from "@/auth";
import OrderListPublic from "@/components/module/OrderListPublic";
import OrderModel from "@/models/orderModel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import type { Orders } from "@/components/module/OrderListPublic";
import connectDB from "@/lib/connectDB";

const fetchOrders = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  await connectDB();
  const orders = await OrderModel.find({ userId: session.user.id }).sort(
    "-createdAt"
  );
  const result: Orders[] = orders.map((order) => {
    return {
      id: order._id.toString(),
      paymentStatus: order.paymentStatus,
      date: order.createdAt.toString(),
      total: order.totalAmount,
      deliveryStatus: order.deliveryStatus,
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

async function Order() {
  const result = await fetchOrders();
  if (!result) return redirect("/404");

  return <OrderListPublic orders={JSON.parse(result)} />;
}

export default Order;
