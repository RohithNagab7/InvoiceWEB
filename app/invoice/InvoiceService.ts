import api from "@/libs/Axios";
import { InvoiceForm } from "./InvoiceUtils";

export async function postInvoiceService(data: InvoiceForm) {
  try {
    const response = await api.post("/invoices", data);
    return response.data;
  } catch (err) {
    console.error("Error posting invoice:", err);
    throw err;
  }
}