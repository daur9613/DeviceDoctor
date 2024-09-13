import express from "express";
import {
  CreateService,
  getServices,
  getOneService,
  UpdateService,
  deleteService,
} from "../controller/serviceController.js";

const ServiceRouter = express.Router();

ServiceRouter.post("/Service", CreateService);
ServiceRouter.get("/Service", getServices);
ServiceRouter.get("/Service/:id", getOneService);
ServiceRouter.put("/Service/:id", UpdateService);
ServiceRouter.delete("/Service/:id", deleteService);

export default ServiceRouter;
