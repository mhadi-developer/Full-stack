import express from "express";
import "dotenv/config";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/catagory.routes.js";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/orderOperations.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import http from 'node:http'
import {Server} from "socket.io"


const app = express();

// ✅ List of allowed origins


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4000",
];

const server = http.createServer(app)
const port = process.env.PORT || 5000;

const io = new Server(server, {
   cors:{
    origin: allowedOrigins, // your frontend
    credentials: true, // needed because your fetch uses credentials
  }
})



app.use(
  cors({
    origin: allowedOrigins, // your frontend
    credentials: true, // needed because your fetch uses credentials
  })
);



app.use(express.json());
app.use(cookieParser());

// ✅ ROUTES AFTER MIDDLEWARE
app.use(productRoutes);
app.use(categoryRoutes);
app.use(userRoutes);
app.use(paymentRoutes);
app.use(orderRoutes);
app.use(cartRoutes);

 // socket io server event 
io.on('connection', (socket) => {

 console.log("user joined through Admin", socket.id);

  io.emit("response", { message: "hello from the server" });
   io.emit("serverName", { message: "hello from the  Hadi jserver" });

  
})


app.set('socket', io); // io accessable in wholw scope of the app....


// START SERVER
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

startServer();
