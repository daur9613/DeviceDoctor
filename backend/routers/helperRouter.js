import express from "express";
import {
  CreateHelper,
  getOneHelper,
  getHelpers,
  UpdateHelper,
  deleteHelper,
} from "../controller/helperController.js";

const helperRouter = express.Router();

helperRouter.post("/Helper", CreateHelper);
helperRouter.get("/Helper", getHelpers);
helperRouter.get("/Helper/:id", getOneHelper);
helperRouter.put("/Helper/:id", UpdateHelper);
helperRouter.delete("/Helper/:id", deleteHelper);

export default helperRouter;
