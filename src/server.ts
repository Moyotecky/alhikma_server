import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./utils/database/db";
import CareerRouter from "./modules/career/career.routes";
import NewsRouter from "./modules/news/article.routes";



const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors());

database.connect();

app.use('/careers', CareerRouter);
app.use('/news', NewsRouter);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

