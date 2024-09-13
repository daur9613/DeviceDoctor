import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import apiservices from "../../apiservices";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("registered")) {
      navigate("/"); // Перенаправление на главную страницу, если уже зарегистрирован
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiservices.register(name, phone, password);
      setSuccess("Регистрация успешна!");
      setErrors("");
      sessionStorage.setItem("registered", "true");
      navigate("/");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      setErrors("Ошибка регистрации. Пожалуйста, попробуйте снова.");
      setSuccess("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Регистрация
        </Typography>
        {errors && (
          <Typography color="error" variant="body2">
            {errors}
          </Typography>
        )}
        {success && (
          <Typography color="primary" variant="body2">
            {success}
          </Typography>
        )}
        <TextField
          label="Имя Пользователя"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Телефон"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Box justifyContent="space-between" alignItems="center">
          <Link to="/login">У меня есть аккаунт</Link>
          <Button type="submit" variant="contained" color="primary">
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
