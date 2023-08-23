import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Product } from "./product";

export const Category = sequelize.define("category", {
  idCategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.belongsTo(Category, { foreignKey: "idCategory", as: "productCategory" });