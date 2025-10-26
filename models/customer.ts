import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CustomerSchema = new Schema({
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
  },
  discount: {
    type: Number,
    required: [true, "Discount is required"],
    min: [0, "Discount cannot be less than 0"],
    max: [100, "Discount cannot be more than 100"],
    default: 0,
  },
}, {timestamps: true});

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
