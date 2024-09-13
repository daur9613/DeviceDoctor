import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import router from "./routers/authRouter.js";
import models from "./models/main.js";
import helmet from "helmet";
import cors from "cors";
import applicationRouter from "./routers/applicationRouter.js";
import CategoryRouter from "./routers/cotegoryRouter.js";
import ratingRouter from "./routers/ratingRouter.js";
import ServiceRouter from "./routers/serviceRouter.js";
import helperRouter from "./routers/helperRouter.js";

async function start() {
  dotenv.config();

  const PORT = process.env.PORT;

  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(
    cors({
      origin: "*", // Или укажите конкретный домен или IP
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use("/api", router);
  app.use("/api", applicationRouter);
  app.use("/api", CategoryRouter);
  app.use("/api", ratingRouter);
  app.use("/api", helperRouter);
  app.use("/api", ServiceRouter);

  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`server started on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
