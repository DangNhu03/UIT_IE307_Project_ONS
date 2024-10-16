const auth = require("./authRoutes");
const product = require("./productRoutes");
const cart = require("./cartRoutes");
const order = require("./orderRoutes");
const account = require("./accountRoutes");
const voucher= require("./voucherRoutes")
const route = (app) => {
  app.use("/products", product);
  app.use("/", auth);
  app.use("/accounts", account);
  app.use("/carts", cart);
  app.use("/orders", order);
  app.use("/vouchers", voucher)
};

module.exports = route;
