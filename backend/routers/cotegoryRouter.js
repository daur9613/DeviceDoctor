import express from "express";
import {
  CreateCategory,
  getCategories,
  getOneCategory,
  deleteCategory,
  UpdateCategory,
  getServicesByCategory,
} from "../controller/categoryController.js";

const CategoryRouter = express.Router();

CategoryRouter.post("/Category", CreateCategory);
CategoryRouter.get("/Category", getCategories);
CategoryRouter.get("/Category/:id", getOneCategory);
CategoryRouter.get("/Category/:id/services", getServicesByCategory);
CategoryRouter.put("/Category/:id", UpdateCategory);
CategoryRouter.delete("/Category/:id", deleteCategory);

export default CategoryRouter;
