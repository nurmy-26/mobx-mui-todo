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
    <Box component='footer' sx={{ ml: 'auto' }}>
      {items.length !== 0 && (
        <Button
          title="Удалить все элементы"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleClearAllTodos}
        >
          Все элементы
        </Button>
      )}
    </Box>
  );
});

export default Footer;