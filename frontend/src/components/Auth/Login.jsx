import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import apiservices from "../../apiservices";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiservices.login(phone, password);
      setSuccess("Вход прошел успешно!");
      setErrors("");
      navigate("/");
    } catch (err) {
      console.error("Ошибка входа:", err);
      setErrors("Ошибка входа. Пожалуйста, попробуйте снова.");
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
          Вход
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
        <Box sx={{ justifyContent: "center", alignItems: "right" }}>
          <Link to="/registration">У меня нет аккаунта</Link>
          <Button type="submit" variant="contained" color="primary">
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
