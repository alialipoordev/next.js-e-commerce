import ProductTablePage from "@/components/template/ProductTablePage";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";
import React from "react";

interface AdminSearchProps {
  searchParams: { query: string };
}

const searchProducts = async (query: string) => {
  await connectDB();
  const products = await ProductModel.find({
    title: { $regex: query, $options: "i" },
  });

  const results = products.map(
    ({
      _id,
      title,
      thumbnail,
      description,
      price,
      sale,
      category,
      quantity,
    }) => {
      return {
        id: _id.toString(),
        title,
        thumbnail: thumbnail.url,
        description,
        price: {
          mrp: price.base,
          salePrice: price.discounted,
          saleOff: sale,
        },
        category,
        quantity,
      };
    }
  );

  return JSON.stringify(results);
};

async function AdminSearch({ searchParams }: AdminSearchProps) {
  const { query } = searchParams;
  const results = JSON.parse(await searchProducts(query));
  return (
    <div>
      <ProductTablePage
        products={results}
        showPageNavigator={false}
        currentPageNo={0}
      />
    </div>
  );
}

export default AdminSearch;
