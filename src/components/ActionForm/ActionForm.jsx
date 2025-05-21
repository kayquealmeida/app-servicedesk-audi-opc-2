import React from 'react';
import './ActionForm.css';

export const ActionForm = ({
  title,
  children,
  onSave,
  onCancel,
  saveLabel = "Salvar",
  cancelLabel = "Cancelar",
  isSubmitting = false
}) => (
  <div className="action-form">
    <h2 className="action-form__title">{title}</h2>
    <form onSubmit={onSave} className="action-form__form">
      <div className="action-form__content">
        {children}
      </div>
      <div className="action-form__buttons">
        <button
          type="button"
          onClick={onCancel}
          className="action-form__button action-form__button--cancel"
          disabled={isSubmitting}
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          className="action-form__button action-form__button--save"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Salvando...
            </>
          ) : saveLabel}
        </button>
      </div>
    </form>
  </div>
);

export default ActionForm;