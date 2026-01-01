import express from "express";
import "dotenv/config";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/catagory.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

// ✅ MIDDLEWARE FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ ROUTES AFTER MIDDLEWARE
app.use(productRoutes);
app.use(categoryRoutes);
app.use(userRoutes);

// START SERVER
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

startServer();
