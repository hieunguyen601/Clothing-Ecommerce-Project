import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["men", "women", "kids", "accessories"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  stock: {
    type: Number,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "Stock must be integer",
    },
  },
  brand: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    default: [],
  },
  colors: {
    type: [String],
    default: [],
  },
});

const Product = mongoose.model("Product", productsSchema);

export default Product;
