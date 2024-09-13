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

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Модальное окно для удаления
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    username: "",
    phone: "",
    address: "",
    role: "",
    password: "",
  });
  const [userToDelete, setUserToDelete] = useState(null); // Для хранения пользователя для удаления

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    apiservices
      .getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке пользователей:", error);
        setLoading(false);
      });
  };

  const handleDialogOpen = (user = null) => {
    if (user) {
      setSelectedUser(user); // Редактируемый пользователь
      setEditMode(true);
    } else {
      setSelectedUser({
        id: "",
        username: "",
        phone: "",
        address: "",
        role: "",
        password: "",
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
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveUser = () => {
    const { id, username, role, image, phone, password, address } =
      selectedUser;

    if (editMode) {
      apiservices
        .updateUser(id, username, role, image, phone, password, address) // Обновление пользователя
        .then(() => {
          loadUsers(); // Обновляем список после редактирования
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при редактировании пользователя:", error)
        );
    } else {
      apiservices
        .createUser(username, role, image, phone, password, address) // Добавление пользователя
        .then(() => {
          loadUsers(); // Обновляем список после добавления
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при добавлении пользователя:", error)
        );
    }
  };

  // Открытие модального окна подтверждения удаления
  const handleConfirmDeleteOpen = (user) => {
    setUserToDelete(user);
    setOpenConfirmDialog(true);
  };

  // Закрытие модального окна подтверждения удаления
  const handleConfirmDeleteClose = () => {
    setOpenConfirmDialog(false);
    setUserToDelete(null);
  };

  // Удаление пользователя после подтверждения
  const handleDeleteUser = () => {
    apiservices
      .deleteUser(userToDelete.id) // Удаление пользователя
      .then(() => {
        loadUsers(); // Обновляем список после удаления
        handleConfirmDeleteClose();
      })
      .catch((error) =>
        console.error("Ошибка при удалении пользователя:", error)
      );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Имя пользователя", width: 200 },
    { field: "phone", headerName: "Телефон", width: 150 },
    { field: "address", headerName: "Адрес", width: 200 },
    { field: "role", headerName: "Роль", width: 100 },
    { field: "password", headerName: "Пароль", width: 200 },
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
        Добавить пользователя
      </Button>

      <DataGridPro
        rows={users}
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
          {editMode ? "Редактировать пользователя" : "Добавить пользователя"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Имя пользователя"
            fullWidth
            value={selectedUser.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Телефон"
            fullWidth
            value={selectedUser.phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Адрес"
            fullWidth
            value={selectedUser.address}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Роль"
            fullWidth
            value={selectedUser.role}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            value={selectedUser.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button onClick={handleSaveUser}>
            {editMode ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно для подтверждения удаления */}
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
            Вы уверены, что хотите удалить пользователя{" "}
            <strong>{userToDelete?.username}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>Нет</Button>
          <Button color="error" onClick={handleDeleteUser}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
