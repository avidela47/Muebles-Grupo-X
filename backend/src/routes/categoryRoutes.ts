import { Router } from "express";
import {
  getCategory,
  newCategory,
  createCategoryByDefault,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getCategory);
router.post("/default", createCategoryByDefault);
router.post("/", newCategory);

export default router;