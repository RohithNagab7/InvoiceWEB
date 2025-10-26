import { NextResponse } from "next/server";
import dbConnect from "../../../libs/mongoose";
import Product from "../../../models/product";

// GET all products
export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

// POST a new product and returning all products
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  await new Product(data).save();

  const products = await Product.find({});
  return NextResponse.json(products, { status: 201 });
}
