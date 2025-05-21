import React, { useState, useEffect } from 'react';
import ActionForm from '../../ActionForm/ActionForm';
import './SubCategoryCreate.css';

const SubCategoryCreate = ({
  categories,
  initialData,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    category: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.SubCategory || '',
        category: initialData.Category || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      category: !formData.category
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    onSave({
      Category: formData.category,
      SubCategory: formData.name.trim(),
      // Campos padrão para manter estrutura
      isInternal: false,
      buttonName: "",
      TemplateUrl: "",
      ModalImg: "",
      ModalTitle: "",
      ModalText: "",
      isPopUP: false,
      ToolTip: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  return (
    <ActionForm
      title={initialData ? 'Editar Subcategoria' : 'Nova Subcategoria'}
      onSave={handleSubmit}
      onCancel={onCancel}
    >
      <div className="formField">
        <label className="formLabel">Nome da Subcategoria:</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`formInput ${errors.name ? 'error' : ''}`}
        />
        {errors.name && <span className="errorMessage">Campo obrigatório</span>}
      </div>

      <div className="formField">
        <label className="formLabel">Categoria:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`formInput ${errors.category ? 'error' : ''}`}
          disabled={!!initialData}
        >
          <option value="">Selecione...</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <span className="errorMessage">Selecione uma categoria</span>}
      </div>
    </ActionForm>
  );
};

export default SubCategoryCreate;