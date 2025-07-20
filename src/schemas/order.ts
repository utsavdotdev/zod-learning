import { z } from "zod";

export const ProductSchema = z.object({
  id: z.uuid().describe("Product UUID"),
  name: z.string().min(2).describe("Product name"),
  price: z.coerce.number().positive().describe("Product price (USD)"),
  tags: z.array(z.string()).default([]).describe("Product tags"),
});

export const CustomerSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2),
  email: z.email(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/)
    .optional(),
});

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string().regex(/^\d{5}$/),
  country: z.string(),
});

export const PaymentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("card"),
    cardNumber: z.string().length(16),
    cardHolder: z.string(),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/),
    cvc: z.string().length(3),
  }),
  z.object({
    type: z.literal("paypal"),
    email: z.email(),
  }),
]);

export const OrderStatusEnum = z.enum([
  "pending",
  "paid",
  "shipped",
  "cancelled",
]);

export const OrderSchema = z
  .object({
    orderId: z.string().uuid(),
    customer: CustomerSchema,
    products: z.array(ProductSchema).min(1),
    payment: PaymentSchema,
    shipping: AddressSchema,
    status: OrderStatusEnum.default("pending"),
    placedAt: z.coerce.date(),
  })
  .describe("Order with customer, products, payment, and shipping info");

export type Product = z.infer<typeof ProductSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type Order = z.infer<typeof OrderSchema>;
