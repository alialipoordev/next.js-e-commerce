import React from "react";
import GridView from "../module/GridView";
import ProductModel from "@/models/productModel";
import connectDB from "@/lib/connectDB";
import ProductCard from "../module/ProductCard";
import FeaturedProductsSlider from "../module/FeaturedProductsSlider";
import FeaturedProductModel from "@/models/featuredProduct";
import CategoryMenu from "../module/CategoryMenu";

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
      rating: product.rating,
    };
  });

  return JSON.stringify(productList);
};

const fetchFeaturedProducts = async () => {
  await connectDB();
  const products = await FeaturedProductModel.find().sort("-createdAt");

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      link: product.link,
      linkTitle: product.linkTitle,
      banner: product.banner.url,
    };
  });
};

async function HomePage() {
  const latestProducts = await fetchProducts();
  const parsedProducts = JSON.parse(latestProducts) as ProductList[];
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className="py-4 space-y-4">
      <FeaturedProductsSlider products={featuredProducts} />
      <CategoryMenu />
      <GridView>
        {parsedProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </GridView>
    </div>
  );
}

export default HomePage;
