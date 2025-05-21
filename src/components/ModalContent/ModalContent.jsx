import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseButton from '../CloseButton/CloseButton';
import './ModalContent.css';


const ModalContent = ({ open, onClose, title, text, modalImg }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 540,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 5,
  };

  const renderTextWithEmail = (text) => {
    const emailRegex = /([\w.-]+@[\w.-]+\.\w+)/g;

    const parts = text.split(emailRegex);

    return parts.map((part, index) => {
      if (emailRegex.test(part)) {
        return (
          <a key={index} href={`mailto:${part}`} style={{ color: '#1976d2' }}>
            {part}
          </a>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="close-button">
          <CloseButton onClose={onClose} />

        </div>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          <img
            src={`${import.meta.env.BASE_URL}assets/${modalImg}.png`}
            className="icon-salesForce"
            alt={modalImg}
          />
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          {renderTextWithEmail(text)}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalContent;
