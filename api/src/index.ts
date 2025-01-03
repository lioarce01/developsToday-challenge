import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import countriesRouter from "./routes/countries";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/countries", countriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
