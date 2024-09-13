import React, { useState } from "react";
import "./help.css"; // Импортируем CSS файл

const SupportForm = () => {
  // Состояния для хранения значений полей ввода
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику для отправки данных на сервер или их дальнейшей обработки
    alert(`Имя: ${name}\nПочта: ${email}\nВопрос: ${question}`);
  };

  return (
    <div className="help-container">
      <div className="help-header">
        <h2 className="headerText">Поддержка</h2>
      </div>
      <form onSubmit={handleSubmit} className="help-form">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="help-input"
            required
          />
          <input
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="help-input"
            required
          />
        </div>
        <textarea
          placeholder="Ваш вопрос"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="textarea"
          required
        />
        <button type="submit" className="button-submit">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default SupportForm;