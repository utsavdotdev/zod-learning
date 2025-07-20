"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.OrderStatusEnum = exports.PaymentSchema = exports.AddressSchema = exports.CustomerSchema = exports.ProductSchema = void 0;
var zod_1 = require("zod");
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.uuid().describe("Product UUID"),
    name: zod_1.z.string().min(2).describe("Product name"),
    price: zod_1.z.coerce.number().positive().describe("Product price (USD)"),
    tags: zod_1.z.array(zod_1.z.string()).default([]).describe("Product tags"),
});
exports.CustomerSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    name: zod_1.z.string().min(2),
    email: zod_1.z.email(),
    phone: zod_1.z
        .string()
        .regex(/^\+?[0-9]{10,15}$/)
        .optional(),
});
exports.AddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    zip: zod_1.z.string().regex(/^\d{5}$/),
    country: zod_1.z.string(),
});
exports.PaymentSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("card"),
        cardNumber: zod_1.z.string().length(16),
        cardHolder: zod_1.z.string(),
        expiry: zod_1.z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/),
        cvc: zod_1.z.string().length(3),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("paypal"),
        email: zod_1.z.email(),
    }),
]);
exports.OrderStatusEnum = zod_1.z.enum([
    "pending",
    "paid",
    "shipped",
    "cancelled",
]);
exports.OrderSchema = zod_1.z
    .object({
    orderId: zod_1.z.string().uuid(),
    customer: exports.CustomerSchema,
    products: zod_1.z.array(exports.ProductSchema).min(1),
    payment: exports.PaymentSchema,
    shipping: exports.AddressSchema,
    status: exports.OrderStatusEnum.default("pending"),
    placedAt: zod_1.z.coerce.date(),
})
    .describe("Order with customer, products, payment, and shipping info");
