const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");

// Load environment variables
dotenv.config();

// Khởi tạo Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware cho Express để parse dữ liệu JSON
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Định nghĩa các routes
routes(app);

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
