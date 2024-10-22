import GridView from "@/components/module/GridView";
import ProductCard from "@/components/module/ProductCard";
import SearchFilter from "@/components/module/SearchFilter";
import connectDB from "@/lib/connectDB";
import ProductModel, { ProductDocument } from "@/models/productModel";
import React from "react";
import type { Product } from "@/components/module/ProductCard";
import { FilterQuery } from "mongoose";

interface Options {
  query: string;
  priceSort?: "asc" | "desc";
  maxRating?: number;
  minRating?: number;
}

interface SearchProps {
  searchParams: Options;
}

const searchProducts = async ({
  query,
  maxRating,
  minRating,
  priceSort,
}: Options) => {
  await connectDB();

  const filter: FilterQuery<ProductDocument> = {
    title: { $regex: query, $options: "i" },
  };

  if (typeof minRating === "number" && typeof maxRating === "number") {
    const minCondition = minRating >= 0;
    const maxCondition = maxRating <= 5;

    if (minCondition && maxCondition) {
      filter.rating = { $gte: minRating, $lte: maxRating };
    }
  }

  const products = await ProductModel.find({
    ...filter,
  }).sort({ "price.discounted": priceSort === "asc" ? 1 : -1 });

  const productList = products.map((product) => {
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

async function Search({ searchParams }: SearchProps) {
  const { maxRating, minRating } = searchParams;

  const searchResults = JSON.parse(
    await searchProducts({
      ...searchParams,
      minRating: minRating ? +minRating : undefined,
      maxRating: maxRating ? +maxRating : undefined,
    })
  ) as Product[];

  return (
    <div>
      <SearchFilter>
        <GridView>
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GridView>
      </SearchFilter>
    </div>
  );
}

export default Search;
