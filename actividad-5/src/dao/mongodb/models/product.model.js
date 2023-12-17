import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  category: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 100 },
  stock: { type: Number, required: true },
  code: { type: String, required: true, max: 100 },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
