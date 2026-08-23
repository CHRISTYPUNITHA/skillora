import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";

import { prisma } from "./lib/prisma.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);

const __dirname = new URL(".", import.meta.url).pathname;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
}
);

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

    await prisma.$disconnect();

    process.exit(1);
  }
}

startServer();