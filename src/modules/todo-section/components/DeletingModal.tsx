import { Modal, Box, Typography, Button } from '@mui/material';
import store from '../store';


type DeletingModalProps = {
  listId: string;
  listTitle: string;
  open: boolean;
  handleClose: () => void;
}

const DeletingModal = ({ listId, listTitle, open, handleClose }: DeletingModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='deleting-modal'
      aria-describedby='Подтверждение удаления списка'
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
      >
        <Typography variant='h3' sx={{ mb: 1 }}>
          Вы действительно хотите удалить этот список?
        </Typography>
        <Typography noWrap color='info' sx={{ mb: 4 }} variant='h3'>{listTitle}</Typography>

        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, justifyContent: 'center', alignItems: 'center' }}>
          <Button sx={{ minWidth: { xs: '120px', sm: '140px' } }} variant="outlined" onClick={() => store.deleteTodolist(listId)}>
            Удалить
          </Button>
          <Button sx={{ minWidth: { xs: '100px', sm: '100px' } }} onClick={handleClose} variant='contained' color='primary'>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeletingModal;