"use client"

import { formatPrice } from "@/utils/helper";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesChartProps {
  data: {
    day: string;
    sale: number;
  }[];
}

function SalesChart({ data }: SalesChartProps) {
  return (
    <LineChart
      margin={{ left: 10, top: 20 }}
      width={600}
      height={400}
      data={data}
    >
      <Line type="monotone" dataKey="sale" stroke="#8884d8" />
      <XAxis dataKey="day" />
      <YAxis dataKey="sale" tickFormatter={(value) => formatPrice(value)} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip formatter={(value, name) => [formatPrice(+value), name]} />
    </LineChart>
  );
}

export default SalesChart;
