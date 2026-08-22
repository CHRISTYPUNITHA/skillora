import express from "express";
import authRoutes from "./routes/auth.routes.js";
import {prisma} from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

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