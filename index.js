const express = require("express");
const cors = require("cors");
const routes = require("./src/apiV1/routes");
// require('./db/config')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/', routes);

app.listen(4500);