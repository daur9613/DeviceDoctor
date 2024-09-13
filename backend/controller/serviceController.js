import Services from "../models/services.js";
import Category from "../models/category.js";
import ServiceCategory from "../models/ServiceCategory.js";

export const CreateService = async (req, res) => {
  try {
    const { name, description, userID, price, location, categories } = req.body;

    if (
      !name ||
      !description ||
      !userID ||
      !price ||
      !location ||
      !Array.isArray(categories)
    ) {
      return res.status(400).json({
        message: "All fields are required and categories must be an array",
      });
    }

    const service = await Services.create({
      name,
      description,
      userID,
      price,
      location,
    });

    const serviceCategoryEntries = categories.map((categoryId) => ({
      serviceId: service.id,
      categoryId,
    }));

    await ServiceCategory.bulkCreate(serviceCategoryEntries);

    const createdService = await Services.findOne({
      where: { id: service.id },
      include: [
        {
          model: Category,
          as: "categories_services",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    // Возвращаем созданную услугу с категориями
    res.status(201).json(createdService);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

// Получение всех услуг
export const getServices = async (req, res) => {
  try {
    // Запрашиваем услуги с подключением категорий
    const services = await Services.findAll({
      include: [
        {
          model: Category,
          as: "categories_services",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    // Отладочный вывод для проверки структуры данных
    console.log(
      "Services with included categories:",
      JSON.stringify(services, null, 2)
    );

    // Маппинг данных: добавляем массив ids категорий в каждую услугу
    const servicesWithCategories = services.map((service) => {
      // Проверка на существование categories_services
      const categories = service.categories_services
        ? service.categories_services.map((category) => category.name)
        : [];

      return {
        ...service.toJSON(),
        categories,
      };
    });

    res.json(servicesWithCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

// Получение одной услуги по ID
export const getOneService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};

// В функции UpdateService (servicesController.js)
export const UpdateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, userID, price, location, categories } = req.body;

    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (name) service.name = name;
    if (description) service.description = description;
    if (userID) service.userID = userID;
    if (price) service.price = price;
    if (location) service.location = location;

    await service.save();

    // Удаляем старые связи
    await ServiceCategory.destroy({
      where: { serviceId: id },
    });

    // Создаем новые связи
    const serviceCategoryEntries = categories.map((categoryId) => ({
      serviceId: id,
      categoryId,
    }));

    await ServiceCategory.bulkCreate(serviceCategoryEntries);

    res.status(200).json(service);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

// Удаление услуги
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};
