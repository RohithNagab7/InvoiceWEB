export const ProductFields = {
  PRODUCTNAME: "productname",
  PRICE: "price",
};

export const productMapping = {
  [ProductFields.PRODUCTNAME]: {
    heading: "Product Name",
    name: "productName",
    type: "text",
  },
  [ProductFields.PRICE]: {
    heading: "Price",
    name: "price",
    type: "number",
  },
};

export const ProductFormFields = [
  productMapping[ProductFields.PRODUCTNAME],
  productMapping[ProductFields.PRICE],
];
