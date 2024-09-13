import express from "express";
import {
  CreateRating,
  getOneRating,
  getRatings,
  UpdateRating,
  deleteRating,
} from "../controller/ratingController.js";

const ratingRouter = express.Router();

ratingRouter.post("/Rating", CreateRating);
ratingRouter.get("/Rating", getRatings);
ratingRouter.get("/Rating/:id", getOneRating);
ratingRouter.put("/Rating/:id", UpdateRating);
ratingRouter.delete("/Rating/:id", deleteRating);

export default ratingRouter;
