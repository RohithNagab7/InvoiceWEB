import { NextResponse } from "next/server";
import dbConnect from "../../../libs/mongoose";
import Invoice from "../../../models/invoice";

export async function GET() {
  await dbConnect();
  const invoices = await Invoice.find({});
  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();

  const invoice = new Invoice(data);
  await invoice.save();

  const invoices = await Invoice.find({});
  return NextResponse.json(invoices, { status: 201 });
}
