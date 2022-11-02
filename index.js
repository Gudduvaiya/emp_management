const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/apiV1/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/", routes);

app.listen(4500);
