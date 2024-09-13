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

export default function Helper() {
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Модальное окно для удаления
  const [editMode, setEditMode] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState({
    id: "",
    name: "",
    email: "",
    question: "",
    answer: "",
  });
  const [helperToDelete, setHelperToDelete] = useState(null);

  useEffect(() => {
    loadHelpers();
  }, []);

  const loadHelpers = () => {
    apiservices
      .getHelpers()
      .then((response) => {
        setHelpers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке категории:", error);
        setLoading(false);
      });
  };

  const handleDialogOpen = (category = null) => {
    if (category) {
      setSelectedHelper(category);
      setEditMode(true);
    } else {
      setSelectedHelper({
        id: "",
        name: "",
        email: "",
        question: "",
        answer: "",
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
    setSelectedHelper((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveHelper = () => {
    const { id, name, email, question, answer } = selectedHelper;

    if (editMode) {
      apiservices
        .updateHelper(id, name, email, question, answer)
        .then(() => {
          loadHelpers();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при редактировании категории:", error)
        );
    } else {
      apiservices
        .createHelper(name, email, question)
        .then(() => {
          loadHelpers();
          handleDialogClose();
        })
        .catch((error) =>
          console.error("Ошибка при добавлении категории:", error)
        );
    }
  };

  const handleConfirmDeleteOpen = (category) => {
    setHelperToDelete(category);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDeleteClose = () => {
    setOpenConfirmDialog(false);
    setHelperToDelete(null);
  };

  const handleDeleteHelper = () => {
    apiservices
      .deleteHelper(helperToDelete.id)
      .then(() => {
        loadHelpers();
        handleConfirmDeleteClose();
      })
      .catch((error) => console.error("Ошибка при удалении категории:", error));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Имя", width: 200 },
    { field: "email", headerName: "Почта", width: 150 },
    { field: "question", headerName: "Вопрос", width: 150 },
    { field: "answer", headerName: "Ответ", width: 150 },
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
        rows={helpers}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
      />

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {editMode ? "Редактировать сообщение" : "Добавить сообщение"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Имя"
            fullWidth
            value={selectedHelper.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Почта"
            fullWidth
            value={selectedHelper.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="question"
            label="Вопрос"
            fullWidth
            value={selectedHelper.question}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="answer"
            label="Ответ"
            fullWidth
            value={selectedHelper.answer}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button onClick={handleSaveHelper}>
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
            Вы уверены, что хотите удалить сообщение в поддержку{" "}
            <strong>{helperToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose}>Нет</Button>
          <Button color="error" onClick={handleDeleteHelper}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
