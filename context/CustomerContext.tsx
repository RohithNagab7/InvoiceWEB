"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CustomersContextType, CustomerTypes } from "@/libs/GlobalUtils"; // adjust path
import axios from "axios";

// Create the context
const CustomersContext = createContext<CustomersContextType | undefined>(undefined);

// Provider component
export function CustomersProvider({
  children,
  initialCustomers = [],
}: {
  children: ReactNode;
  initialCustomers?: CustomerTypes[];
}) {
  const [customers, setCustomers] = useState<CustomerTypes[]>(initialCustomers);

  
  useEffect(() => {
      const fetchCustomers = async () => {
       try {
         const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers`);
         setCustomers(res.data);
       } catch (err) {
         console.error("Failed to fetch customers:", err);
       }
     };
    fetchCustomers();
  }, []);

  return (
    <CustomersContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomersContext.Provider>
  );
}

// Custom hook to access context
export function useCustomers() {
  const context = useContext(CustomersContext);
  if (!context)
    throw new Error("useCustomers must be used within a CustomersProvider");
  return context;
}
