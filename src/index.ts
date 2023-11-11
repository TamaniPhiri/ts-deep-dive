import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`server on @ http://localhost:${process.env.PORT}`);
});
