import express from "express";
import {
  CreateApplication,
  getApplications,
  getOneApplication,
  UpdateApplication,
  deleteApplication,
} from "../controller/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.post("/Application", CreateApplication);
applicationRouter.get("/Application", getApplications);
applicationRouter.get("/Application/:id", getOneApplication);
applicationRouter.put("/Application/:id", UpdateApplication);
applicationRouter.delete("/Application/:id", deleteApplication);

export default applicationRouter;
