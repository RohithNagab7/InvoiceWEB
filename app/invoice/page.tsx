"use client";

import { useCustomers } from "@/context/CustomerContext";
import { useProducts } from "@/context/ProductContext";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InvoiceForm, ItemsTypes } from "./InvoiceUtils";
import GlobalInputComp from "@/components/inputfields/GlobalInputComp";
import GlobalSelectComp from "@/components/inputfields/GlobalSelectComp";
import GlobalCustomTable from "@/components/globalcustomtable/GlobalCustomTable";
import { postInvoiceService } from "./InvoiceService";
import { generateInvoicePDF } from "@/libs/GlobalData";

function InvoicePage() {
  const { customers } = useCustomers();
  const { products } = useProducts();

  const { control, watch, setValue, getValues, handleSubmit } =
    useForm<InvoiceForm>({
      defaultValues: {
        customerName: "",
        discount: 0,
        items: [],
        totalAmount: 0,
        grandTotalAmount: 0,
      },
    });

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  // watches
  const watchItems = watch("items");
  const customerWatch = watch("customerName");

  useEffect(() => {
    // nothing to do if no items
    if (!Array.isArray(watchItems) || watchItems.length === 0) {
      setValue("totalAmount", 0);
      setValue("discount", 0); // discount amount
      setValue("grandTotalAmount", 0);
      return;
    }

    let totalAmount = 0;
    const updatedItems = watchItems.map((item) => {
      const product = products.find((p) => p.productName === item.productName);
      if (!product) {
        const amt = Number(item.amount) || 0;
        totalAmount += amt;
        return item;
      }
      const price = Number(product.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const amount = price * quantity;
      totalAmount += amount;

      return { ...item, price, amount };
    });

    if (JSON.stringify(updatedItems) !== JSON.stringify(watchItems)) {
      setValue("items", updatedItems, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    const selectedCustomer = customers.find(
      (c) => c.customerName === customerWatch
    );
    const discountPercent = selectedCustomer
      ? Number(selectedCustomer.discount) || 0
      : 0;

    const discountAmount = (discountPercent / 100) * totalAmount;
    const grandTotalAmount = totalAmount - discountAmount;

    setValue("totalAmount", totalAmount, { shouldDirty: false });
    setValue("discount", discountAmount, { shouldDirty: false });
    setValue("grandTotalAmount", grandTotalAmount, { shouldDirty: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchItems), customerWatch, products]);

  const footerValues = [
    { label: "Total", value: getValues("totalAmount") },
    { label: "Discount", value: getValues("discount") },
    { label: "Grand Total", value: getValues("grandTotalAmount") },
  ];

  const handleAddRow = () => {
    
    append({ productName: "", quantity: 1, price: 0, amount: 0 });
  };

  const onSubmit = async (data: InvoiceForm) => {
    try {
      const response = await postInvoiceService(data);
      console.log("Invoice saved:", response);
      generateInvoicePDF(data);
      alert("Invoice saved and PDF downloaded successfully!");
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Failed to save invoice!");
    }
  };

  const columns = [
    {
      key: "productName",
      label: "Product",
      render: (item: ItemsTypes, index: number) => (
        <Controller
          key={index}
          name={`items.${index}.productName`}
          control={control}
          render={({ field }) => (
            <GlobalSelectComp
              {...field}
              item={products
                .map((p) => p.productName)
                .filter(
                  (name) =>
                    !watchItems.some(
                      (i, idx) => i.productName === name && idx !== index
                    )
                )}
            />
          )}
        />
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (item: ItemsTypes, index: number) => (
        <Controller
          key={index}
          name={`items.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <GlobalInputComp {...field} type="number" min={1} max={100} />
          )}
        />
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (item: ItemsTypes) => <p>{item.price}</p>,
    },
    {
      key: "amount",
      label: "Amount",
      render: (item: ItemsTypes) => <p>{item.amount}</p>,
    },
  ];

  return (
    <div className="w-[80%] h-full justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-12">
        <div className="w-full justify-between items-center flex gap-8">
          <Controller
            name="customerName"
            control={control}
            render={({ field }) => (
              <GlobalSelectComp
                {...field}
                heading="Select Customer"
                item={customers.map((c) => c.customerName)} 
              />
            )}
          />
          <button
            className="mt-4 p-2 bg-orange-400 text-white rounded w-[30%]"
            onClick={() => handleAddRow()}
            type="button"
          >
            Add Product
          </button>
        </div>
        <div className="w-full">
          <GlobalCustomTable
            columns={columns}
            invoiceComp
            footerValues={footerValues}
            data={fields}
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-orange-400 text-white rounded w-[60%]">Save & download PDF</button>
      </form>
    </div>
  );
}

export default InvoicePage;
