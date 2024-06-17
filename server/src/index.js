import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import colors from "colors";
import cookieParser from "cookie-parser";
import appRoutes from "./routes/index.js";
import { connectdb } from "./config/DB.js";
import path from "path";

dotenv.config();
connectdb();
const app = express();
const PORT = process.env.PORT || 3300;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// app routes
app.use("/api/v1/", appRoutes);

// Deployment variables
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

// app middleware
app.use((err, req, res, next) => {
  const message = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`App configured on http://localhost:${PORT}`.cyan.underline);
});
