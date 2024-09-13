import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function ServiceItem({ service }) {
  return (
    <Card sx={{ marginBottom: "15px" }}>
      <CardContent>
        <Typography variant="h5">{service.name}</Typography>
        <Typography>{service.description}</Typography>
        <Typography>Автор: {service.userID}</Typography>
        <Typography>
          Средний отзыв: {service.averageRating ? service.averageRating : 3}
        </Typography>
        <Button variant="contained">Подробнее</Button>
      </CardContent>
    </Card>
  );
}
