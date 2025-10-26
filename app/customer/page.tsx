"use client";

import CustomFormComp from "@/components/customformcomp/CustomFormComp";
import { useForm } from "react-hook-form";
import { CustomerFormFields } from "./CustomerFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerFormData, customerSchema } from "./CustomerUtils";
import { postAddCustomer } from "./CustomerServices";
import { useCustomers } from "@/context/CustomerContext";
import GlobalCustomTable from "@/components/globalcustomtable/GlobalCustomTable";
import { CustomercolumnsData } from "@/libs/GlobalData";

function CustomerPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(customerSchema),
    mode: "onChange",
  });

  const { customers, setCustomers } = useCustomers();

  const submitHandler = async (data: CustomerFormData) => {
    try {
      const payload = {
        customerName: data.customerName,
        discount: data.discount
      }
      const updatedCustomers = await postAddCustomer(payload);
      setCustomers(updatedCustomers);
      reset();
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  return (
    <div className="flex gap-24 w-[80%] h-full justify-center items-center">
   
      <div className="w-1/2">
        <GlobalCustomTable columns={CustomercolumnsData} data={customers}/>
      </div>
      <CustomFormComp
        MappingFields={CustomerFormFields}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default CustomerPage;
