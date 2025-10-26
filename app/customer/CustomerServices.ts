import api from "../../libs/Axios";
import { CustomerFormData } from "./CustomerUtils";

export async function postAddCustomer(data: CustomerFormData) {
  try {
    const response = await api.post("/customers", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
