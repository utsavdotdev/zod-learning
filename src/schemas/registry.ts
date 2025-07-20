import {
  ProductSchema,
  CustomerSchema,
  AddressSchema,
  PaymentSchema,
  OrderSchema,
} from "./order";

export const schemaRegistry = {
  product: ProductSchema,
  customer: CustomerSchema,
  address: AddressSchema,
  payment: PaymentSchema,
  order: OrderSchema,
};
