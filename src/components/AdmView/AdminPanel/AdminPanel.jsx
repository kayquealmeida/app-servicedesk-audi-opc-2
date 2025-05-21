import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Pagination
} from '@mui/material';
import { ExpandMore, Add, Edit, Delete } from '@mui/icons-material';
import CategoryCreate from '../CategoryCreate/CategoryCreate';
import './AdminPanel.css';

const AdminPanel = () => {
  const { state, actions } = useAdmin();
  const [openForm, setOpenForm] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenForm = (type, item = null) => {
    setCurrentItem(item);
    setOpenForm(type);
  };

  const handleCloseForm = () => {
    setOpenForm(null);
    setCurrentItem(null);
  };

  const handleSubmit = async (formData) => {
    try {
      let result;
      if (openForm === 'category') {
        result = await actions.saveCategory(formData);
      }
      // Outros submits...

      setSnackbar({
        open: true,
        message: 'Salvo com sucesso!',
        severity: 'success'
      });
      handleCloseForm();
      actions.loadData();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      setSnackbar({
        open: true,
        message: 'Item excluído!',
        severity: 'success'
      });
      actions.loadData();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  if (state.loading && !state.categories.length) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (state.error) {
    return (
      <Alert severity="error" className="error-alert">
        {state.error}
      </Alert>
    );
  }

  return (
    <div className="admin-panel-container">
      {/* Cabeçalho e botões */}
      <div className="panel-header">
        <Typography variant="h5">Painel Administrativo</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenForm('category')}
        >
          Nova Categoria
        </Button>
      </div>

      {/* Lista de categorias */}
      {state.categories.map((category) => (
        <Accordion key={category.Id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{category.Name}</Typography>
            <div className="action-buttons">
              <IconButton onClick={(e) => {
                e.stopPropagation();
                handleOpenForm('category', category);
              }}>
                <Edit />
              </IconButton>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            {/* Subcategorias e links */}
            {/* ... */}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Paginação */}
      <Pagination
        count={Math.ceil(state.pagination.total / state.pagination.limit)}
        page={state.pagination.page}
        onChange={(e, page) => actions.handlePageChange(page)}
      />

      {/* Formulários modais */}
      {openForm === 'category' && (
        <CategoryCreate
          open={openForm === 'category'}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          initialData={currentItem}
        />
      )}

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminPanel;