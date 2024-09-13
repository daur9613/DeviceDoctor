import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import apiservices from "../../../../apiservices";

export default function Service() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]); // Список всех категорий для Select
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState({
    id: "",
    name: "",
    userID: "",
    description: "",
    price: "",
    location: "",
    categories_services: [], // Массив выбранных категорий
  });
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    loadServices();
    loadCategories(); // Загружаем категории
  }, []);

  const loadServices = () => {
    apiservices
      .getServices()
      .then((response) => {
        const transformedServices = response.data.map((service) => ({
          ...service,
          categories_services: service.categories_services.map((cat) => cat.id), // Преобразование в массив идентификаторов
        }));
        setServices(transformedServices);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке услуг:", error);
        setLoading(false);
      });
  };

  const loadCategories = () => {
    apiservices
      .getCategories() // Предположим, что API для получения категорий существует
      .then((response) => {
        setCategories(response.data); // Загружаем категории для Select
      })
      .catch((error) => {
        console.error("Ошибка при загрузке категорий:", error);
      });
  };

  const handleDialogOpen = (service = null) => {
    if (service) {
      setSelectedService(service);
      setEditMode(true);
    } else {
      setSelectedService({
        id: "",
        name: "",
        userID: "",
        description: "",
        price: "",
        location: "",
        categories_services: [],
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
    setSelectedService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    setSelectedService((prevState) => ({
      ...prevState,
      categories_services: event.target.value, // Массив выбранных категорий
    }));
  };

  const handleSaveService = () => {
    const {
      id,
      name,
      userID,
      description,
      price,
      location,
      categories_services,
    } = selectedService;
    const categories = categories_services.map((c) => {
      return c.id;
    });

    if (editMode) {
      apiservices
        .updateService(
          id,
          name,
          userID,
          description,
          price,
          location,
          categories
        )
        .then(() => {
          loadServices();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при редактировании услуги:", error)
        );
    } else {
      apiservices
        .createService(name, userID, description, price, location, categories)
        .then(() => {
          loadServices();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при добавлении услуги:", error)
        );
    }
  };

  const handleConfirmDeleteOpen = (service) => {
    setServiceToDelete(service);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDeleteClose = () => {
    setOpenConfirmDialog(false);
    setServiceToDelete(null);
  };

  const handleDeleteService = () => {
    apiservices
      .removeService(serviceToDelete.id)
      .then(() => {
        loadServices();
        handleConfirmDeleteClose();
      })
      .catch((error) => console.error("Ошибка при удалении услуги:", error));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Название", width: 200 },
    { field: "userID", headerName: "Автор", width: 200 },
    { field: "description", headerName: "Описание", width: 150 },
    { field: "price", headerName: "Цена", width: 100 },
    { field: "location", headerName: "Локация", width: 200 },
    {
      field: "categories",
      headerName: "Категории",
      width: 200,
      renderCell: (params) => {
        if (params.row && params.row.categories) {
          return params.row.categories.map((cat) => cat).join(", ");
        }
        return "";
      },
    },
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
          onClick={() => handleConfirmDeleteOpen(params.row)}
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
        Добавить услугу
      </Button>

      <DataGridPro
        rows={services}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
      />

      {/* Модальное окно для добавления/редактирования услуги */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {editMode ? "Редактировать услугу" : "Добавить услугу"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Название услуги"
            fullWidth
            value={selectedService.name}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="userID"
            label="Автор"
            fullWidth
            value={selectedService.userID}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Описание"
            fullWidth
            value={selectedService.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Цена"
            fullWidth
            value={selectedService.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Локация"
            fullWidth
            value={selectedService.location}
            onChange={handleInputChange}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="category-select-label">Категории</InputLabel>
            <Select
              labelId="category-select-label"
              multiple
              value={selectedService.categories_services}
              onChange={handleCategoryChange}
              renderValue={(selected) =>
                selected
                  .map(
                    (categoryId) =>
                      categories.find((cat) => cat.id === categoryId)?.name // Имена выбранных категорий
                  )
                  .join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300, // Максимальная высота выпадающего списка
                    width: 250, // Ширина выпадающего списка
                  },
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Checkbox
                    checked={selectedService.categories_services.includes(
                      category.id
                    )}
                  />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button onClick={handleSaveService}>
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
            Вы уверены, что хотите удалить услугу{" "}
            <strong>{serviceToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>Нет</Button>
          <Button color="error" onClick={handleDeleteService}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
