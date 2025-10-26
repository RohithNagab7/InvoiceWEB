"use client"

import CustomFormComp from "@/components/customformcomp/CustomFormComp";
import { ProductFormFields } from "./ProductFormFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, ProductSchema } from "./ProductUtils";
import { useProducts } from "@/context/ProductContext";
import { postAddProduct } from "./ProductServices";
import GlobalCustomTable from "@/components/globalcustomtable/GlobalCustomTable";
import { ProductColumnsData } from "@/libs/GlobalData";

function ProductsPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({resolver: zodResolver(ProductSchema),
    mode: "onChange",
  });
  const {products, setProducts} = useProducts();
  const submitHandler = async (data: ProductFormData) => {
    try {
      console.log("asdasd");
      const payload = {
        productName: data.productName,
        price: data.price
      }
      const updatedCustomers = await postAddProduct(payload);
      setProducts(updatedCustomers);
      reset();
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };
  return (
    <div className="flex gap-24 w-[80%] h-full justify-center items-center">
     
       <div className="w-1/2">
        <GlobalCustomTable columns={ProductColumnsData} data={products}/>
      </div>
      <CustomFormComp
        MappingFields={ProductFormFields}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default ProductsPage;
