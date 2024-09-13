import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Rating = sequelize.define('Rating',{
    id:{type:DataTypes.INTEGER , primaryKey:true , autoIncrement:true},
    count:{type:DataTypes.STRING , allowNull:false, defaultValue:0},
    userID:{type:DataTypes.INTEGER , allowNull:false},
    authorID:{type:DataTypes.INTEGER , allowNull:false},
    comment:{type:DataTypes.STRING , allowNull:true},
})

export default Rating