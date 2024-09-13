import React, { useState } from "react";
import {
  Box,
  Button,
  nativeSelectClasses,
  TextField,
  Typography,
} from "@mui/material";
import apiservices from "../../apiservices";
import { useNavigate } from "react-router-dom";

const SupportForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    apiservices
      .createHelper(name, email, question)
      .then(() => {
        alert(`Ваш вопрос отправлен модераторам. Ожидайте ответа на почту`);
        nav.to("/");
      })
      .catch((error) =>
        console.error("Ошибка при добавлении категории:", error)
      );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Поддержка
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          label="Имя"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Почта"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Ваш вопрос"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            alignSelf: "center",
            paddingX: 4,
            paddingY: 1,
          }}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

export default SupportForm;
