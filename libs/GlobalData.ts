import { InvoiceForm, ItemsTypes } from "@/app/invoice/InvoiceUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export const NavLinksData = [
  { name: "Customer", href: "/customer" },
  { name: "Product", href: "/product" },
  { name: "Invoice", href: "/invoice" },
];

export const CustomercolumnsData = [
  { key: "customerName", label: "Customer Name" },
  { key: "discount", label: "Discount (%)" },
];

export const ProductColumnsData = [
  { key: "productName", label: "Product Name" },
  { key: "price", label: "Price" },
];

export const generateInvoicePDF = (invoiceData: InvoiceForm) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice", 14, 20);

  doc.setFontSize(12);
  doc.text(`Customer: ${invoiceData.customerName}`, 14, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);

  const tableColumn = ["Product", "Quantity", "Price", "Amount"];
  const tableRows = invoiceData.items.map((item: ItemsTypes) => [
    item.productName,
    item.quantity,
    item.price,
    item.amount,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 60;

  doc.text(
    `Total: ${invoiceData.totalAmount.toLocaleString("en-IN")}`,
    14,
    finalY + 10
  );
  doc.text(
    `Discount: ${invoiceData.discount.toLocaleString("en-IN")}`,
    14,
    finalY + 18
  );
  doc.text(
    `Grand Total: ${invoiceData.grandTotalAmount.toLocaleString("en-IN")}`,
    14,
    finalY + 26
  );

  doc.save(`invoice_${invoiceData.customerName}.pdf`);
};
