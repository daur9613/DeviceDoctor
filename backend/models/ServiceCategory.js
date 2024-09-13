// В модели ServiceCategory (serviceCategory.js)
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Services from "./services.js"; // Импортируем модель Services

const ServiceCategory = sequelize.define("ServiceCategory", {
  serviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Services",
      key: "id",
    },
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Categories",
      key: "id",
    },
    allowNull: false,
  },
});

// Удаляем связи при удалении услуги
Services.afterDestroy(async (service, options) => {
  await ServiceCategory.destroy({
    where: { serviceId: service.id },
  });
});

export default ServiceCategory;
