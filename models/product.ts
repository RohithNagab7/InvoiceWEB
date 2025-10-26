import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
}, {timestamps: true});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
