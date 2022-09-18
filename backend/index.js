const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routers");

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", rootRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successful");
  })
  .catch((err) => {
    console.log("Unable to connect to the database", err);
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running...");
});
