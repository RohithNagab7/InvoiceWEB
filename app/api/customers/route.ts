import { NextResponse } from "next/server";
import dbConnect from "../../../libs/mongoose";
import Customer from "../../../models/customer";

// GET all customers
export async function GET() {
  await dbConnect();
  const customers = await Customer.find({});
  return NextResponse.json(customers);
}

// POST a new customer and returning all customers
export async function POST(req: Request) {
  console.log("ksdjhksdjh");
  await dbConnect();
  const data = await req.json();
  await new Customer(data).save();

  const customers = await Customer.find({});
  return NextResponse.json(customers, { status: 201 });
}
