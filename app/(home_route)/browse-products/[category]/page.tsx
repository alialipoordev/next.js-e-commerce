import React from "react";
import ProductModel from "@/models/productModel";
import connectDB from "@/lib/connectDB";
import GridView from "@/components/module/GridView";
import ProductCard from "@/components/module/ProductCard";
import CategoryMenu from "@/components/module/CategoryMenu";

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

const fetchProductsByCategory = async (category: string) => {
  await connectDB();
  const products = await ProductModel.find({ category })
    .sort("-createdAt")
    .limit(20);

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

interface ProductByCategoryProps {
  params: { category: string };
}

async function ProductByCategory({
  params: { category },
}: ProductByCategoryProps) {
  const products = await fetchProductsByCategory(decodeURIComponent(category));
  const parsedProducts = JSON.parse(products) as ProductList[];

  return (
    <div className="py-4 space-y-4">
      <CategoryMenu />
      {parsedProducts.length ? (
        <GridView>
          {parsedProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </GridView>
      ) : (
        <h1 className="text-center pt-10 font-semibold text-2xl opacity-40">
          Sorry There Are No Products In This Category!
        </h1>
      )}
    </div>
  );
}

export default ProductByCategory;
