// models/Service.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Service = sequelize.define("Service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  userID: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
});

// Определение ассоциаций
Service.belongsTo(User, { foreignKey: "userID", as: "user" });
User.hasMany(Service, { foreignKey: "userID", as: "services_user" });

export default Service;
