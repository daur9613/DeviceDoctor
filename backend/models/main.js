import User from "./User.js";
import Application from "./application.js";
import Rating from "./rating.js";
import Helper from "./helper.js";
import Category from "./category.js";
import Services from "./services.js";
import ServiceCategory from "./ServiceCategory.js";

const models = {
  User,
  Application,
  Rating,
  Category,
  Services,
  ServiceCategory,
  Helper,
};

User.hasMany(Rating, { foreignKey: "userID", as: "ratings" });
Rating.belongsTo(User, { foreignKey: "userID" });

User.hasMany(Application, { foreignKey: "userID", as: "applications" });
Application.belongsTo(User, { foreignKey: "userID" });

User.hasMany(Services, { foreignKey: "userID", as: "services" });
Services.belongsTo(User, { foreignKey: "userID" });

Services.belongsToMany(Category, {
  through: "ServiceCategory",
  as: "categories_services",
  foreignKey: "serviceId",
});
Category.belongsToMany(Services, {
  through: "ServiceCategory",
  as: "services_categories",
  foreignKey: "categoryId",
});

export default models;
