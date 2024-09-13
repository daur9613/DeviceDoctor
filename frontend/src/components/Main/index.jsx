import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import apiservices from "../../apiservices.js"; // Ваш файл для API запросов\
import Slider from "./slider";
import CategoryItem from "./category_item";
import ServiceItem from "./service_item";

export default function Main() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    // Получаем категории при загрузке
    apiservices.getCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setLoading(true);
    // Загружаем услуги по выбранной категории
    console.log("categoryClick", categoryId);
    apiservices
      .getServicesByCategory(categoryId)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке услуг по категории:", error);
        setLoading(false);
      });
  };

  return (
    <Box>
      <Slider />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            overflowX: isMobile ? "auto" : "hidden", // Горизонтальный скролл на мобильных
            overflowY: isMobile ? "hidden" : "auto", // Вертикальный скролл на десктопе
            scrollSnapType: isMobile ? "x mandatory" : "none", // Тач прокрутка
            scrollbarWidth: "none", // Скрыть полосу прокрутки (для Firefox)
            "&::-webkit-scrollbar": {
              display: "none", // Скрыть полосу прокрутки (для Chrome/Safari)
            },
            "-webkit-overflow-scrolling": "touch", // Улучшение прокрутки на iOS
            gap: 2,
          }}
        >
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </Box>
        <Box>
          {loading ? (
            <Typography>Загрузка услуг...</Typography>
          ) : (
            services?.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
