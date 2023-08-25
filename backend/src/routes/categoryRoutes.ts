import { Router } from "express";
import {
  getCategory,
  newCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getCategory);
router.post("/", newCategory);

export default router;