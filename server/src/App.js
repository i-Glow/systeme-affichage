const express = require("express");
const router = require("./routes");
const cors = require("cors");

//initialisation
require("dotenv").config();
const app = express();

//constants
const PORT = process.env.PORT || 8080;
const CORS_OPTIONS = {
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
  optionsSuccessStatus: 204,
};

//midllewares
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(router);

//starting server
app.listen(PORT, "localhost", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
