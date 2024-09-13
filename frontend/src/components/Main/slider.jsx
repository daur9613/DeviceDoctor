import React, { useState, useEffect, Image, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

export default function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <Box
      sx={{
        position: "relative", // Добавляем относительное позиционирование для Box
        height: "600px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          position: "absolute", // Позиционируем текст абсолютно относительно Box
          zIndex: 10, // Устанавливаем z-index, чтобы текст был поверх изображения
          top: "50%", // Горизонтальное центрирование
          left: "50%", // Вертикальное центрирование
          transform: "translate(-50%, -50%)", // Центрируем текст по обеим осям
          color: "white", // Белый цвет текста для контраста с фоном
          fontSize: "50px", // Размер шрифта
          fontWeight: "bold", // Жирный текст
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Тень для лучшей видимости текста
        }}
      >
        DeviceDoctor
      </Typography>
      <Typography
        sx={{
          position: "absolute", // Позиционируем текст абсолютно относительно Box
          zIndex: 10, // Устанавливаем z-index, чтобы текст был поверх изображения
          top: "60%", // Горизонтальное центрирование
          left: "50%", // Вертикальное центрирование
          transform: "translate(-50%, -50%)", // Центрируем текст по обеим осям
          color: "white", // Белый цвет текста для контраста с фоном
          fontSize: "25px", // Размер шрифта
          fontWeight: "bold", // Жирный текст
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Тень для лучшей видимости текста
        }}
      >
        Ремонт любой техники
      </Typography>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/slide1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide4.jpg" />
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </Box>
  );
}

//<Button variant="contained">Заказать</Button>
