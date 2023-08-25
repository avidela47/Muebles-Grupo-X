"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductId = exports.newProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const category_1 = require("../models/category");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.Product.findAll({
        include: [{ model: category_1.Category, as: 'productCategory', attributes: ["name"] }],
    });
    res.json(listProducts);
});
exports.getProducts = getProducts;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, image, stock, idCategory } = req.body;
    try {
        yield product_1.Product.create({
            name,
            description,
            price,
            image,
            stock,
            idCategory,
        });
        res.json({
            msg: `El producto ${name} fue creado exitosamente!`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Upps!!! ocurrio un error, comuniquese con soporte",
            error,
        });
    }
});
exports.newProduct = newProduct;
const getProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.Product.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`,
        });
    }
});
exports.getProductId = getProductId;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const product = yield product_1.Product.findByPk(id);
        if (product) {
            yield product.update(body);
            res.json({
                msg: "Producto actualizado con exito!",
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: "Upps!!! ocurrio un error, comuniquese con soporte",
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.Product.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`,
        });
    }
    else {
        yield product.destroy();
        res.json({
            msg: `Producto con el id ${id} eliminado con exito!`,
        });
    }
});
exports.deleteProduct = deleteProduct;
