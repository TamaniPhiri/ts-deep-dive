import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/user-route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server on @ http://localhost:${process.env.PORT}`);
});
