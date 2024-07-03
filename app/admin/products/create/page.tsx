"use client"

import ProductForm from '@/components/module/ProductForm'
import { NewProductInfo } from '@/types';
import React from 'react'

function Create() {
  const handleCreateProduct = (values: NewProductInfo) => {
    console.log(values);
  };

  return (
    <ProductForm onSubmit={handleCreateProduct}/>
  )
}

export default Create