import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseButton from '../CloseButton/CloseButton';

const ModalContent = ({ open, onClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 5,
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
          Sales Force
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          Para mais informações sobre o Sales Force, entre em contato com o email abaixo:
          <a href="mailto:ZlUWf@example.com"> salesforce@example.com</a>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalContent;
