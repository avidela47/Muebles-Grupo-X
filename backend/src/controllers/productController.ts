import { Request, Response } from "express";
import { Product } from "../models/product";
import { Category } from "../models/category";

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Product.findAll({
        include: [{ model: Category, as: 'productCategory', attributes: ["name"] }],
    });
    res.json(listProducts);
};

export const newProduct = async (req: Request, res: Response) => {
    const { name, description, price, image, stock, idCategory } = req.body;

    try {
        await Product.create({
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
    } catch (error) {
        res.status(400).json({
            msg: "Upps!!! ocurrio un error, comuniquese con soporte",
            error,
        });
    }
};

export const getProductId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`,
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (product) {
            await product.update(body);
            res.json({
                msg: "Producto actualizado con exito!",
            });
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Upps!!! ocurrio un error, comuniquese con soporte",
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`,
        });
    } else {
        await product.destroy();
        res.json({
            msg: `Producto con el id ${id} eliminado con exito!`,
        });
    }
};
