export interface ItemsTypes {
    productName: string,
    quantity: number;
    price: number;
    amount: number;
}

export interface InvoiceForm {
    customerName: string;
    discount: number;
    items:  ItemsTypes[];
    totalAmount: number;
    grandTotalAmount: number;
}