"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registry_1 = require("./schemas/registry");
var fs = require("fs");
// Read orders.json
var data = fs.readFileSync("orders.json", "utf-8");
var orders = JSON.parse(data);
orders.forEach(function (order, idx) {
    var result = registry_1.schemaRegistry.order.safeParse(order);
    if (result.success) {
        var o = result.data;
        console.log("\nOrder #".concat(idx + 1, " is valid!"));
        console.log("Customer:", o.customer.name);
        console.log("Products:", o.products.map(function (p) { return p.name; }).join(", "));
        console.log("Payment type:", o.payment.type);
        console.log("Shipping city:", o.shipping.city);
        console.log("Status:", o.status);
        console.log("Placed at:", o.placedAt.toISOString());
    }
    else {
        console.log("\nOrder #".concat(idx + 1, " is INVALID!"));
        result.error.issues.forEach(function (issue, i) {
            console.log("  ".concat(i + 1, ". ").concat(issue.path.join("."), ": ").concat(issue.message));
        });
    }
});
