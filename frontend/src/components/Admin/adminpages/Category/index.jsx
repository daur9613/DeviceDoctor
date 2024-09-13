import React, { useState, useEffect } from "react";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import apiservices from "../../../../apiservices";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Модальное окно для удаления
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
    image: "",
  });
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    apiservices
      .getCategories()
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке категории:", error);
        setLoading(false);
      });
  };

  const handleDialogOpen = (category = null) => {
    if (category) {
      setSelectedCategory(category);
      setEditMode(true);
    } else {
      setSelectedCategory({
        id: "",
        name: "",
        image: "",
      });
      setEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCategory = () => {
    const { id, name, image } = selectedCategory;

    if (editMode) {
      apiservices
        .updateCategory(id, name, image)
        .then(() => {
          loadCategories();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при редактировании категории:", error)
        );
    } else {
      apiservices
        .createCategory(name, image)
        .then(() => {
          loadCategories();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при добавлении категории:", error)
        );
    }
  };

  const handleConfirmDeleteOpen = (category) => {
    setCategoryToDelete(category);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDeleteClose = () => {
    setOpenConfirmDialog(false);
    setCategoryToDelete(null);
  };

  const handleDeleteCategory = () => {
    apiservices
      .deleteCategory(categoryToDelete.id)
      .then(() => {
        loadCategories();
        handleConfirmDeleteClose();
      })
      .catch((error) => console.error("Ошибка при удалении категории:", error));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Название", width: 200 },
    { field: "image", headerName: "Изображение", width: 150 },
    {
      field: "actions",
      headerName: "Действия",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleDialogOpen(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleConfirmDeleteOpen(params.row)} // Открытие окна подтверждения
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Button
        variant="outlined"
        onClick={() => handleDialogOpen()}
        startIcon={<Add />}
        sx={{ m: 2 }}
      >
        Добавить категорию
      </Button>

      <DataGridPro
        rows={categories}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
      />

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {editMode ? "Редактировать категорию" : "Добавить категорию"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Название"
            fullWidth
            value={selectedCategory.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Изображение"
            fullWidth
            value={selectedCategory.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button onClick={handleSaveCategory}>
            {editMode ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={handleConfirmDeleteClose}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">
          Подтверждение удаления
        </DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить категорию{" "}
            <strong>{categoryToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>Нет</Button>
          <Button color="error" onClick={handleDeleteCategory}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
