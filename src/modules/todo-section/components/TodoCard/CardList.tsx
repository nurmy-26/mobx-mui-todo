import { observer } from 'mobx-react-lite';
import { Checkbox, IconButton, List, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TItem } from '../../types';


type CardListProps = {
  items: TItem[];
  listId: string;
  handleToggleTodo: (listId: string, todoId: string) => void;
  handleDeleteTodo: (listId: string, todoId: string) => void;
}

const CardList = observer(({ items, listId, handleToggleTodo, handleDeleteTodo }: CardListProps) => {
  return (
    <List
      sx={{
        mb: 4,
        mx: 'auto',
        width: '100%',
        maxHeight: 400,
        overflow: 'auto',
        listStyleType: 'none',
        padding: 0,
        flexGrow: 1,
        display: 'grid',
        gridTemplateRows: 'auto',
        alignContent: 'start',
      }}
    >
      {items.map((todo) => (
        <ListItemButton
          key={todo.id}
          role="listitem"
          sx={{
            p: 0,
            backgroundColor: '#FFF',
            borderRadius: '4px',
            '&:hover .delete-icon': {
              visibility: 'visible',
            }
          }}
          onClick={() => handleToggleTodo(listId, todo.id)}
        >
          <ListItemIcon>
            <Checkbox
              checked={todo.isDone}
              tabIndex={-1}
              disableRipple
              inputProps={{
                'aria-labelledby': todo.id,
              }}
            />
          </ListItemIcon>
          <Typography sx={{
            flexGrow: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>
            {todo.title}
          </Typography>
          <IconButton
            aria-label='Удалить элемент'
            className='delete-icon'
            sx={{ visibility: 'hidden' }}
            onClick={() => handleDeleteTodo(listId, todo.id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </ListItemButton>
      ))}
    </List>
  );
});

export default CardList;