import React, { useState } from 'react';
import './FileInput.css';

const FileInput = ({
  label,
  name,
  existingFile,
  error,
  onChange,
  lightMode = false
}) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`file-input ${error ? 'has-error' : ''} ${lightMode ? 'file-input--light' : ''}`}>
      <label htmlFor={`file-input-${name}`}>{label}</label>

      <div className={`file-input__preview ${error ? 'has-error' : ''}`}>
        {preview || existingFile ? (
          <img
            src={preview || existingFile}
            alt="Preview"
            className="file-input__image"
          />
        ) : (
          <div className="file-input__placeholder">
            {error || 'Nenhum arquivo selecionado'}
          </div>
        )}
      </div>

      <input
        id={`file-input-${name}`}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="file-input__input"
      />

      <button
        type="button"
        onClick={() => document.getElementById(`file-input-${name}`).click()}
        className="file-input__button"
      >
        Selecionar Arquivo
      </button>

      {error && !preview && !existingFile && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
};

export default FileInput;