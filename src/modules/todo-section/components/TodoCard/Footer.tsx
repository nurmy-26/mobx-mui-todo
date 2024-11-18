import { observer } from 'mobx-react-lite';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TItem } from '../../types';


type FooterProps = {
  items: TItem[];
  openListDeletingModal: () => void;
  handleClearAllTodos: () => void;
}

const Footer = observer(({ items, handleClearAllTodos }: FooterProps) => {
  return (
    <Box component='footer' sx={{ ml: 'auto' }} data-cy="card-footer">
      {items.length !== 0 && (
        <Button
          title="Удалить все задачи"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleClearAllTodos}
          data-cy="del-all-tasks-btn"
        >
          Все задачи
        </Button>
      )}
    </Box>
  );
});

export default Footer;