export interface ProductTypes {
  _id: string;
  productName: string;
  price: number;
};

export interface ProductsContextType {
  products: ProductTypes[];
  setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>;
};

export type CustomerTypes = {
  _id?: string;
  customerName: string;
  discount: number;
};

export type CustomersContextType = {
  customers: CustomerTypes[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerTypes[]>>;
};
