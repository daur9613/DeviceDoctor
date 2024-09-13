import React, { useState , useEffect } from "react";
import "./registrationForm.css";
import apiservices from "../apiservices";
import { Link , useNavigate} from "react-router-dom";
const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    // Проверка, зарегистрирован ли уже пользователь
    if (sessionStorage.getItem("registered")) {
      navigate('/'); // Перенаправление на главную страницу, если уже зарегистрирован
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await apiservices.register(name, phone, password);
      setSuccess("Регистрация успешна!");
      setErrors("");
      sessionStorage.setItem("registered", "true"); 
      // Навигация после успешного выполнения запроса
      navigate('/');
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      setErrors("Ошибка регистрации. Пожалуйста, попробуйте снова.");
      setSuccess("");
    }
  };

  return (
  <div className="reg_conteiner">
    <div className="registration-window">
      <h2 className="title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Имя Пользователя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <div className="buttonContainer">
        <Link to="/login" className="linkButton"> У меня есть аккаунт</Link>
          <button type="submit" className="button">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  </div>  
  );
};

export default RegistrationForm;
