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

export default function Application() {
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({
    id: "",
    userID: "",
    servicesID: "",
    date: "",
    category: "",
  });
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication = () => {
    apiservices
      .getApplication()
      .then((response) => {
        setApplication(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке заявок:", error);
        setLoading(false);
      });
  };

  const handleDialogOpen = (user = null) => {
    if (user) {
      setSelectedApplication(user);
      setEditMode(true);
    } else {
      setSelectedApplication({
        id: "",
        userID: "",
        servicesID: "",
        date: "",
        category: "",
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
    setSelectedApplication((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveApplication = () => {
    const { id, userID, serviceID, date, category } = selectedApplication;

    if (editMode) {
      apiservices
        .updateApplication(id, userID, serviceID, date, category)
        .then(() => {
          loadApplication();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при редактировании пользователя:", error)
        );
    } else {
      apiservices
        .createApplication(userID, serviceID, date, category)
        .then(() => {
          loadApplication();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при добавлении пользователя:", error)
        );
    }
  };

  const handleConfirmDeleteOpen = (user) => {
    setApplicationToDelete(user);
    setOpenConfirmDialog(true);
  };

  // Закрытие модального окна подтверждения удаления
  const handleConfirmDeleteClose = () => {
    setOpenConfirmDialog(false);
    setApplicationToDelete(null);
  };

  // Удаление пользователя после подтверждения
  const handleDeleteApplication = () => {
    apiservices
      .deleteApplication(applicationToDelete.id) // Удаление пользователя
      .then(() => {
        loadApplication(); // Обновляем список после удаления
        handleConfirmDeleteClose();
      })
      .catch((error) =>
        console.error("Ошибка при удалении пользователя:", error)
      );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userID", headerName: "Автор", width: 200 },
    { field: "serviceID", headerName: "Услуга", width: 150 },
    { field: "date", headerName: "Дата", width: 200 },
    { field: "category", headerName: "Категория", width: 100 },
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
      <DataGridPro
        rows={application}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
      />

      {/* Модальное окно для добавления/редактирования пользователя */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {editMode ? "Редактировать заявку" : "Добавить заявку"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="userID"
            label="Имя пользователя"
            fullWidth
            value={selectedApplication.userID}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="serviceID"
            label="Телефон"
            fullWidth
            value={selectedApplication.servicesID}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Адрес"
            fullWidth
            value={selectedApplication.date}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Роль"
            fullWidth
            value={selectedApplication.category}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button onClick={handleSaveApplication}>
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
            Вы уверены, что хотите удалить заявку{" "}
            <strong>{applicationToDelete?.id}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>Нет</Button>
          <Button color="error" onClick={handleDeleteApplication}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
