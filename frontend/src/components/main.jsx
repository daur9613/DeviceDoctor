import React, { useState, useRef } from "react";
import washMachine from "../images/washingMachine.png";
import fridge from "../images/fridge.png";
import microwave from "../images/microwave.png";
import toaster from "../images/toaster.png";
import pc from "../images/PC.png";
import iron from "../images/iron.png";
import mixer from "../images/mixer.png";
import bake from "../images/bake.png";
import blender from "../images/blender.png";
import conditioner from "../images/conditioner.png";
import vacuumcleaner from "../images/vacuumCleaner.png";
import tv from "../images/TV.png";
import yellowStar from "../images/yellowStar.png";
import fire from "../images/fire.png";
import calendar from "../images/calendar.png";
import search from "../images/search2.png";
import MasterCard from "./miniProfile";

function MainPage() {
  const categoriesRef = useRef(null);

  const handleOrderClick = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    { src: washMachine, label: "Стиральная машина" },
    { src: fridge, label: "Холодильник" },
    { src: microwave, label: "Микроволновка" },
    { src: toaster, label: "Тостер" },
    { src: pc, label: "Компьютер" },
    { src: iron, label: "Утюг" },
    { src: mixer, label: "Миксер" },
    { src: bake, label: "Духовка" },
    { src: blender, label: "Блендер" },
    { src: conditioner, label: "Кондиционер" },
    { src: vacuumcleaner, label: "Пылесос" },
    { src: tv, label: "Телевизор" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const masters = [
    {
      name: "Коля",
      categories: ["компьютеров", "микроволновок", "холодильников"],
      rating: 4,
      startDate: "2024-04-20",
      description:
        "Опытный мастер по ремонту, специализирующийся на ремонте компьютеров, микроволновок и телевизоров. Обладая многолетним опытом, я предлагаю качественные услуги по диагностике и устранению неисправностей различных устройств.",
    },
    {
      name: "Иван",
      categories: ["утюгов", "блендеров"],
      rating: 5,
      startDate: "2023-01-15",
      description:
        "Мастер с большим опытом в ремонте утюгов и блендеров. Я предоставляю услуги по качественному ремонту малой бытовой техники.",
    },
    {
      name: "Анна",
      categories: ["стиральных машин", "духовок", "пылесосов"],
      rating: 5,
      startDate: "2021-11-05",
      description:
        "Предоставляю качественный ремонт стиральных машин, духовых шкафов и пылесосов. Работаю с известными брендами бытовой техники.",
    },
    // Add more masters as needed
  ];

  const filteredMasters = masters.filter((master) =>
    master.categories.some((category) =>
      category.toLowerCase().includes(selectedCategory.toLowerCase())
    )
  );

  const handleSearchCategory = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleTagClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category);
  };

  return (
    <>
      <main>
        <section className="order-section">
          <h1>Device Doctor</h1>
          <p>Ремонт техники</p>
          <button onClick={handleOrderClick}>Заказать</button>
        </section>
        <section className="categories-masters flex-center">
          <div className="container cm-cont">
            <div className="search">
              <div
                className="search-tag"
                onClick={() => handleTagClick("с высокой оценкой")}
              >
                <img src={yellowStar} alt="" /> с высокой оценкой
              </div>
              <div
                className="search-tag"
                onClick={() => handleTagClick("топы")}
              >
                <img src={fire} alt="" />
                топы
              </div>
              <div
                className="search-tag"
                onClick={() => handleTagClick("по дате регистрации")}
              >
                <img src={calendar} alt="" />
                по дате регистрации
              </div>
              <img src={search} width={20} height={20} alt="" />
            </div>

            <div className="categories" ref={categoriesRef}>
              <h1>Категории</h1>
              <div className="search-category">
                <input
                  type="text"
                  placeholder="Категории"
                  value={searchTerm}
                  onChange={handleSearchCategory}
                />
                <img src={search} alt="" />
              </div>
              <div className="categories-container">
                {categories.map((category, index) => (
                  <div
                    className="category-item"
                    key={index}
                    onClick={() => handleTagClick(category.label)}
                  >
                    <img src={category.src} alt={category.label} />
                    <p>{category.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="masters">
              {filteredMasters.length > 0 ? (
                filteredMasters.map((master, index) => (
                  <MasterCard
                    key={index}
                    name={master.name}
                    categories={master.categories}
                    rating={master.rating}
                    startDate={master.startDate}
                    description={master.description}
                  />
                ))
              ) : (
                <p>Мастера по данной категории не найдены.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MainPage;
