import { Router } from "express";
import { newProduct, deleteProduct, getProductId, getProducts, updateProduct } from "../controllers/productController";
//import { validateToken, isSeller } from "../midlewares/validateToken";

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductId);
router.delete('/:id', deleteProduct);
router.post('/', newProduct);
router.put('/:id', updateProduct);

export default router;