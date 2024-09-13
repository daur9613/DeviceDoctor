import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Helper = sequelize.define("Helper", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  question: { type: DataTypes.STRING, allowNull: false },
  answer: { type: DataTypes.STRING, allowNull: true },
});

export default Helper;
