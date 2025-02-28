import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const ProductModel = mongoose.model(productCollection, productSchema);

//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails,
