import FeaturedProductForm from "@/components/module/FeaturedProductForm";
import FeaturedProductTable from "@/components/module/FeaturedProductTable";
import React from "react";

function AddFeaturedProduct() {
  return (
    <div>
      <FeaturedProductForm />
      <FeaturedProductTable products={[]} />
    </div>
  );
}

export default AddFeaturedProduct;
