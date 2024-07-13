import React from "react";
import GridView from "../module/GridView";
import ProductModel from "@/models/productModel";
import connectDB from "@/lib/connectDB";
import ProductCard from "../module/ProductCard";

interface ProductList {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
}

const fetchProducts = async () => {
  await connectDB();
  const products = await ProductModel.find().sort("-createdAt").limit(20);

  const productList: ProductList[] = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
    };
  });

  return JSON.stringify(productList);
};

async function HomePage() {
  const latestProducts = await fetchProducts();
  const parsedProducts = JSON.parse(latestProducts) as ProductList[];

  return (
    <GridView>
      {parsedProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </GridView>
  );
}

export default HomePage;
