const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const users_router = require("./routes/api/users/router_user");
const products_router = require("./routes/api/products/router_products");
const categories_router = require("./routes/api/categories/router_categories");
const carts_router = require("./routes/api/Cart/router_cart");
const orders_router = require("./routes/api/orders/router_orders");
const posts_router = require('./routes/api/Posts/router_post')
const app = express();

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200,
  })
);


app.use('/api/users', users_router);
app.use('/api/products', products_router);
app.use('/api/categories', categories_router);
app.use('/api/posts', posts_router);
app.use('/api/orders',orders_router);
app.use('/api/cart', carts_router);


module.exports = app;
