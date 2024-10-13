import OrderModel from "@/models/orderModel";
import React from "react";
import dateFormat from "dateformat";
import SalesChart from "@/components/module/SalesChart";
import GridView from "@/components/module/GridView";
import { formatPrice } from "@/utils/helper";

const sevenDaysSalesHistory = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const dateList: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    dateList.push(dateString);
  }

  const last7DaysSales: { _id: string; totalAmount: number }[] =
    await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

  const sales = dateList.map((date) => {
    const matchedSale = last7DaysSales.find((sale) => sale._id === date);
    return {
      day: dateFormat(date, "ddd"),
      sale: matchedSale ? matchedSale.totalAmount : 0,
    };
  });

  const totalSales = last7DaysSales.reduce((prevValue, { totalAmount }) => {
    return (prevValue += totalAmount);
  }, 0);

  return { sales, totalSales };
};

async function Sales() {
  const salesData = await sevenDaysSalesHistory();

  return (
    <div>
      <GridView>
        <div className="bg-blue-500 p-4 rounded space-y-4">
          <h1 className="font-semibold text-3xl text-white">
            {formatPrice(salesData.totalSales)}
          </h1>
          <div className="text-white">
            <p>Total Sales</p>
            <p>Last 7 Days</p>
          </div>
        </div>
      </GridView>
      <div className="mt-10">
        <h1 className="font-semibold text-3xl mb-4">
          Last 7 days sales history
        </h1>
        <SalesChart data={salesData.sales} />
      </div>
    </div>
  );
}

export default Sales;
