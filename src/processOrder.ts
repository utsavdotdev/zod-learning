import { schemaRegistry } from "./schemas/registry";
import { Order } from "./schemas/order";
import * as fs from "fs";

// Read orders.json
const data = fs.readFileSync("orders.json", "utf-8");
const orders: unknown[] = JSON.parse(data);

orders.forEach((order, idx) => {
  const result = schemaRegistry.order.safeParse(order);
  if (result.success) {
    const o: Order = result.data;
    console.log(`\nOrder #${idx + 1} is valid!`);
    console.log("Customer:", o.customer.name);
    console.log("Products:", o.products.map((p) => p.name).join(", "));
    console.log("Payment type:", o.payment.type);
    console.log("Shipping city:", o.shipping.city);
    console.log("Status:", o.status);
    console.log("Placed at:", o.placedAt.toISOString());
  } else {
    console.log(`\nOrder #${idx + 1} is INVALID!`);
    result.error.issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue.path.join(".")}: ${issue.message}`);
    });
  }
});
