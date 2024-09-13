import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: "20px",
        textAlign: "center",
        color: "rgba(255,255,255,1)",
      }}
    >
      <Typography variant="body1">Инструкции и документы</Typography>
      <Typography variant="body2">© Dau Entertainment, 2024</Typography>
      <Typography variant="body2">Все права защищены</Typography>
    </Box>
  );
}
