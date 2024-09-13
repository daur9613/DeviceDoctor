import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Application = sequelize.define("Application", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userID: { type: DataTypes.INTEGER, allowNull: false },
  servicesID: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.NOW },
  category: { type: DataTypes.STRING, allowNull: false },
});

export default Application;
