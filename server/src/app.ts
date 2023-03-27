import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes";
import morgan from "morgan";

//initialisation
dotenv.config();
const app: Express = express();
// app.use(morgan("dev"));

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
// app.use(cookieParser());
app.use(router);

//starting server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
