import z from "zod";

export const customerSchema = z.object({
  customerName: z.string()
    .min(2, "Customer name must be at least 2 characters")
    .max(50, "Customer name cannot exceed 50 characters"),
  discount:  z.preprocess((val) => Number(val), z.number()
    .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot exceed 100"))
});

export type CustomerFormData = z.infer<typeof customerSchema>;