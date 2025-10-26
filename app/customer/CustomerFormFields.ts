export const CustomerFields = {
  CUSTOMERNAME: "customername",
  DISCOUNT: "discount",
};

export const CustomerMapping = {
  [CustomerFields.CUSTOMERNAME]: {
    heading: "Customer Name",
    name: "customerName",
    type: "text",
  },
  [CustomerFields.DISCOUNT]: {
    heading: "Discount",
    name: "discount",
    type: "number",
  },
};

export const CustomerFormFields = [
  CustomerMapping[CustomerFields.CUSTOMERNAME],
  CustomerMapping[CustomerFields.DISCOUNT],
];
