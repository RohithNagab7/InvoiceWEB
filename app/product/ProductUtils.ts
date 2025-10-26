import z from "zod";

export const ProductSchema = z.object({
  productName: z.string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name cannot exceed 100 characters"),
  price: z.preprocess((val) => Number(val), z.number()
    .min(1, "Price must be greater than 0")),
});

export type ProductFormData = z.infer<typeof ProductSchema>;