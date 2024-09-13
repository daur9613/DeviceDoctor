import './registrationForm.css'
import React, {useState,} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import apiservices from '../apiservices';

const LoginForm = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          await apiservices.login(phone, password);
          setSuccess("Вход прошол успешен!");   
          setErrors("");

          navigate('/');
        } catch (err) {
          console.error("Ошибка входа:", err);
          setErrors("Ошибка вход. Пожалуйста, попробуйте снова.");
          setSuccess("");
        }
      };
    
  
    return (
    <div className="reg_conteiner">
        <div className="registration-window">
            <h2 className="title">Вход</h2>
                <form onSubmit={handleSubmit} className="form">
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
                    <Link to="/registration" className="linkButton"> У меня нет аккаунт</Link>
                    <button type="submit" className="button">
                    войти
                    </button>
                </div>
            </form>
        </div>
      </div>
    );
  };

export default LoginForm