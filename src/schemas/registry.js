"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaRegistry = void 0;
var order_1 = require("./order");
exports.schemaRegistry = {
    product: order_1.ProductSchema,
    customer: order_1.CustomerSchema,
    address: order_1.AddressSchema,
    payment: order_1.PaymentSchema,
    order: order_1.OrderSchema,
};
