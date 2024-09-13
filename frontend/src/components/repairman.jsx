import React, { useState } from "react";
import Reviews from "./master-reviews";
import Order from "./zaivka"; // Импортируем компонент Order
import "./repairman.css";

function RepairmanPage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex-center">
      <div className="container">
        <div className="profile">
          <div className="master-description">
            <div className="pfp">
              <img src="/images/avatar.png" alt="pfp" />
              <div className="rating">☆☆☆☆☆</div>
              <div className="date details">с 20.02.2019</div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              eum porro voluptatibus explicabo ut dolor minus laboriosam! Minus
              qui quasi optio, consectetur repellendus a libero, dolores harum
              inventore ratione odit.
            </p>
          </div>
          <div className="button-group">
            <div className="group-sf">
              <button className="share">Поделиться</button>
              <button className="follow">Подписаться</button>
            </div>
            <button className="order" onClick={openModal}>
              Оставить заявку
            </button>
          </div>
        </div>
        <Reviews />
      </div>

      <Order showModal={showModal} closeModal={closeModal} />
    </div>
  );
}

export default RepairmanPage;
