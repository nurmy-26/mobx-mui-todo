import { Box, Button, Modal, Typography } from '@mui/material';


type ConfirmationModalProps = {
  isOpened: boolean;
  handleClose: () => void;
  modalLabel: string;
  modalDescription: string;

  actionText: string;
  subjectText: string;
  accentSubjectText?: string;
  btnSubmitText: string;
  handleSubmit: () => void;
  btnCancelText: string;
  handleCancel: () => void;
}

const ConfirmationModal = ({
  isOpened,
  handleClose,
  modalLabel,
  modalDescription,

  actionText,
  subjectText,
  accentSubjectText,
  btnSubmitText,
  handleSubmit,
  btnCancelText,
  handleCancel,
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby={modalLabel}
      aria-describedby={modalDescription}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: {
            xs: 280,
            sm: 400,
            md: 720,
          },
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}
        data-cy="confirmation-modal"
      >
        <Typography variant='h3' sx={{ mb: 1 }}>
          Вы действительно хотите {actionText} {subjectText}?
        </Typography>
        {accentSubjectText &&
          <Typography variant='h3' noWrap color='info' sx={{ mb: 4 }}>
            {accentSubjectText}
          </Typography>}

        <Box sx={{
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            sx={{ minWidth: { xs: '120px', sm: '140px' } }}
            variant="outlined"
            onClick={handleSubmit}
            data-cy="modal-submit-btn"
          >
            {btnSubmitText}
          </Button>
          <Button
            sx={{ minWidth: { xs: '100px', sm: '100px' } }}
            onClick={handleCancel}
            variant='contained'
            color='primary'
            data-cy="modal-cancel-btn"
          >
            {btnCancelText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;