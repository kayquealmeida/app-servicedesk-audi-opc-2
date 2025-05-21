import React, { useState, useEffect } from 'react';
import ActionForm from '../../ActionForm/ActionForm';
import FileInput from '../../FileInput/FileInput';
import './CategoryCreate.css';

const CategoryCreate = ({
  categories,
  initialData,
  onSave,
  onCancel
}) => {
  const [form, setForm] = useState({
    name: '',
    darkIcon: null,
    lightIcon: null,
    hasPopup: false,
    popupTitle: '',
    popupContent: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.Category || '',
        darkIcon: null,
        lightIcon: null,
        hasPopup: initialData.isPopUP || false,
        popupTitle: initialData.ModalTitle || '',
        popupContent: initialData.ModalText || ''
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (
      !initialData &&
      categories.includes(form.name.trim())
    ) {
      newErrors.name = 'Categoria já existe';
    }

    if (form.hasPopup) {
      if (!form.popupTitle.trim()) newErrors.popupTitle = 'Título é obrigatório';
      if (!form.popupContent.trim()) newErrors.popupContent = 'Conteúdo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formData = {
        Category: form.name.trim(),
        isPopUP: form.hasPopup,
        ModalImg: form.darkIcon || initialData?.ModalImg,
        ModalTitle: form.popupTitle,
        ModalText: form.popupContent,
        // Campos padrão para manter estrutura
        SubCategory: "",
        isInternal: false,
        buttonName: "",
        TemplateUrl: "",
        ToolTip: "",
        ...(initialData && { oldCategoryName: initialData.Category })
      };
      await onSave(formData);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (name, file) => {
    setForm(prev => ({ ...prev, [name]: file }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <ActionForm
      title={initialData ? `Editando "${form.name}"` : 'Nova Categoria'}
      onSave={handleSubmit}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
    >
      <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
        <label htmlFor="category-name">Nome da Categoria</label>
        <input
          id="category-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="form-input"
        />
        {errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <FileInput
        label="Ícone Escuro"
        name="darkIcon"
        existingFile={initialData?.ModalImg}
        onChange={(file) => handleFileChange('darkIcon', file)}
      />

      <FileInput
        label="Ícone Claro"
        name="lightIcon"
        existingFile={initialData?.ModalImg}
        onChange={(file) => handleFileChange('lightIcon', file)}
        lightMode
      />

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="hasPopup"
            checked={form.hasPopup}
            onChange={handleChange}
            className="checkbox-input"
          />
          Habilitar Popup
        </label>
      </div>

      {form.hasPopup && (
        <>
          <div className={`form-group ${errors.popupTitle ? 'has-error' : ''}`}>
            <label htmlFor="popup-title">Título do Popup</label>
            <input
              id="popup-title"
              name="popupTitle"
              type="text"
              value={form.popupTitle}
              onChange={handleChange}
              className="form-input"
            />
            {errors.popupTitle && (
              <span className="error-message">{errors.popupTitle}</span>
            )}
          </div>

          <div className={`form-group ${errors.popupContent ? 'has-error' : ''}`}>
            <label htmlFor="popup-content">Conteúdo do Popup</label>
            <textarea
              id="popup-content"
              name="popupContent"
              rows={4}
              value={form.popupContent}
              onChange={handleChange}
              className="form-textarea"
            />
            {errors.popupContent && (
              <span className="error-message">{errors.popupContent}</span>
            )}
          </div>
        </>
      )}
    </ActionForm>
  );
};

export default CategoryCreate;