import React, { useState, useEffect } from 'react';
import ActionForm from '../../ActionForm/ActionForm';
import './LinkCreate.css';

const LinkCreate = ({ categories, subCategories, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    location: '',
    category: '',
    subCategory: ''
  });

  const [filteredSubs, setFilteredSubs] = useState([]);
  const [errors, setErrors] = useState({
    name: false,
    url: false,
    category: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.buttonName || '',
        url: initialData.TemplateUrl || '',
        location: initialData.location || '',
        category: initialData.Category || '',
        subCategory: initialData.SubCategory || ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (formData.category) {
      const subs = subCategories
        .filter(item => item.Category === formData.category)
        .map(item => item.SubCategory);
      setFilteredSubs([...new Set(subs)]);
    } else {
      setFilteredSubs([]);
    }
  }, [formData.category, subCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      url: !formData.url.trim() || !isValidUrl(formData.url),
      category: !formData.category
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    onSave({
      Category: formData.category,
      SubCategory: formData.subCategory || '',
      location: formData.location.trim() || null,
      isInternal: false,
      buttonName: formData.name.trim(),
      TemplateUrl: formData.url.trim(),
      ModalImg: "",
      ModalTitle: "",
      ModalText: "",
      isPopUP: false,
      ToolTip: ""
    });
  };

  return (
    <ActionForm
      title={initialData ? 'Editar Link' : 'Novo Link'}
      onSave={handleSubmit}
      onCancel={onCancel}
    >
      <div className="formField">
        <label className="formLabel">Nome do Link:</label>
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
        <label className="formLabel">URL:</label>
        <input
          name="url"
          type="text"
          value={formData.url}
          onChange={handleChange}
          className={`formInput ${errors.url ? 'error' : ''}`}
          placeholder="https://exemplo.com"
        />
        {errors.url && (
          <span className="errorMessage">
            {!formData.url ? 'Campo obrigatório' : 'URL inválida'}
          </span>
        )}
      </div>

      <div className="formField">
        <label className="formLabel">Localização (opcional):</label>
        {console.log(formData)}
        <input
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="formInput"
        />
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

      {filteredSubs.length > 0 && (
        <div className="formField">
          <label className="formLabel">Subcategoria (opcional):</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="formInput"
          >
            <option value="">Selecione...</option>
            {filteredSubs.map((sub, index) => (
              <option key={index} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}
    </ActionForm>
  );
};

export default LinkCreate;