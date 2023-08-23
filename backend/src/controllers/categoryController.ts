import { NextFunction, Request, Response } from "express";
import { Category } from "../models/category";

export const getCategory = async (req: Request, res: Response) => {
  const listCategory = await Category.findAll();

  res.json(listCategory);
};

export const createCategoryByDefault = async (
  req: Request,
  res: Response
) => {
  try {
    await Category.create({
      name: "Mesas",
    });
    await Category.create({
      name: "Sillas",
    });
    await Category.create({
      name: "Vajillas",
    });
    res.json({
      msg: `Las categorías por defecto fueron creadas exitosamente!`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error al crear las categorías por defecto ",
      error,
    });
  }
};

export const newCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    await Category.create({
      name,
    });
    res.json({
      msg: `La categoría ${name} fue creada exitosamente!`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error al crear una categoría",
      error,
    });
  }
};