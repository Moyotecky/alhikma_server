import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./utils/database/db";
import { config } from "dotenv";
import CareerRouter from "./modules/career/career.routes";


config();

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors());

database.connect();

app.use('/careers', CareerRouter);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

