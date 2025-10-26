import { ProductFormData } from './ProductUtils';
import api from "../../libs/Axios";

export async function postAddProduct(data: ProductFormData) {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
