import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import "./CloseButton.css"; // Adicione o arquivo CSS personalizado

const CloseButton = ({ onClose }) => {
  return (
    <Tooltip className="close-content" title="Fechar" arrow>
      <IconButton
        onClick={onClose}
        className="close-button"
        aria-label="Fechar"
        size="large"
      >
        <CloseIcon className="close-icon" />
      </IconButton>
    </Tooltip>
  );
};

export default CloseButton;
