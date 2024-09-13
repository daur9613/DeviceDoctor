import React from "react";
import { Box, Typography } from "@mui/material";

export default function CategoryItem({ category, onClick }) {
  return (
    <Box
      onClick={() => onClick(category.id)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Центрирование
        padding: "15px",
        border: "2px solid #ccc", // Серая граница
        borderRadius: "10px", // Скругление углов
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Легкая тень
        transition: "transform 0.3s, box-shadow 0.3s", // Анимация на наведение
        "&:hover": {
          transform: "scale(1.05)", // Легкое увеличение при наведении
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Увеличение тени при наведении
        },
        margin: "10px", // Внешний отступ для расположения карточек друг от друга
        textAlign: "center", // Центрирование текста
        maxWidth: "250px", // Ограничение ширины карточки
      }}
    >
      <img
        src={`/images/${category.image}`}
        alt={category.name}
        style={{
          width: "50px",
          height: "50px",
          marginRight: "15px",
        }}
      />
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        {category.name}
      </Typography>
    </Box>
  );
}
