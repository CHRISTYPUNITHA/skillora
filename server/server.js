import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import {prisma} from "./lib/prisma.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    console.log("✅ PostgreSQL connected successfully");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ PostgreSQL connection failed");
    console.error(error);

    process.exit(1);
  }
}

startServer();