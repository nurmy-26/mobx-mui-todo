import { observer } from 'mobx-react-lite';
import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { getFormattedDate } from '../helpers/getFormattedDate';
import store from '../store';
import { TList } from '../types';
import { Box, Button, Card, Checkbox, IconButton, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import useModal from '../hooks/useModal';
import DeletingModal from './DeletingModal';


type TodoCardProps = {
  todolist: TList;
}

const TodoCard = observer(({ todolist }: TodoCardProps) => {
  const { id: listId, title: listTitle, creationDate: listDate, items } = todolist;
  const listCreationDate = getFormattedDate(listDate, 'medium');
  const { open, handleOpen, handleClose } = useModal();

  const initialItemTitle = '';
  const [itemTitle, setItemTitle] = useState(initialItemTitle);


  const initialEditing = false;
  const [isEditing, setIsEditing] = useState(initialEditing);
  const resetEditing = () => setIsEditing(initialEditing);

  const initialNewTitle = '';
  const [newListTitle, setNewListTitle] = useState(initialNewTitle);

  const editingInputRef = useRef<HTMLInputElement | null>(null);

  // добавление нового элемента в список
  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();

    store.addTodo(listId, itemTitle);
    setItemTitle(initialItemTitle);
  };

  // переход в режим редактирования
  const handleEdit = () => {
    setIsEditing(true);
    // таймаут позволяет отложить установку фокуса до момента, 
    // когда все изменения в DOM завершены и элемент действительно существует
    setTimeout(() => {
      if (editingInputRef.current) {
        editingInputRef.current.focus();
      }
    }, 150);
  }

  const handleCloseEdit = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      resetEditing();
      setNewListTitle(initialNewTitle);
    }
  }

  // подтвердить переименование
  const handleSubmitRename = (e: FormEvent) => {
    e.preventDefault();

    store.renameTodolist(listId, newListTitle);
    resetEditing();
    setNewListTitle(initialNewTitle);
  };

  // сбросить переименование
  const handleReset = (e: FormEvent) => {
    e.preventDefault();

    resetEditing();
    setNewListTitle(initialNewTitle);
  }


  return (
    <Card component={'article'} elevation={3} sx={{
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box
        onClick={handleEdit}
        sx={{
          p: 2,
          minHeight: 80,
          display: 'flex',
          backgroundColor: 'secondary.main',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover .edit-icon': {
            visibility: 'visible',
          },
        }}>
        {isEditing ? (
          <Box
            component='form'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            onSubmit={handleSubmitRename}
            onReset={handleReset}
          >
            <TextField
              id="rename-list"
              label="Переименовать"
              variant="standard"
              inputRef={editingInputRef}
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              onKeyDown={handleCloseEdit}
            />

            <IconButton
              aria-label='Переименовать список'
              type='submit'
              disabled={newListTitle === ''}
              sx={{ color: 'success.main', backgroundColor: 'secondary.light' }}
            >
              <DoneIcon />
            </IconButton>

            <IconButton
              aria-label='Отмена'
              type='reset'
              sx={{ color: 'error.main', backgroundColor: 'secondary.light' }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <Typography variant='h2' noWrap color="primary" sx={{ borderRadius: '4px', }}>
              {listTitle}
            </Typography>

            <IconButton
              className='edit-icon'
              sx={{ ml: 1, visibility: 'hidden', p: 0.5 }}
              aria-label='редактировать'
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </>
        )}

      </Box>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
        <Typography
          variant={'body2'}
          color="secondary"
          sx={{ textAlign: 'right' }}
        >
          {listCreationDate}
        </Typography>

        {/* добавление нового элемента в список */}
        <Box
          component='form'
          sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          onSubmit={handleAddTodo}
        >
          <TextField
            id="new-todo"
            label="Новая задача"
            variant="standard"
            sx={{ mb: 2 }}
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
          />

          <IconButton
            aria-label='Добавить список'
            type='submit'
            disabled={itemTitle === ''}
            sx={{ color: 'primary.main' }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <List
          sx={{
            mb: 4,
            mx: 'auto',
            width: '100%',
            listStyleType: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
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
              onClick={() => store.toggleTodo(listId, todo.id)}
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
              <ListItemText id={todo.id} primary={todo.title} />
              <IconButton
                aria-label='Удалить элемент'
                className='delete-icon'
                sx={{ visibility: 'hidden' }}
                onClick={() => store.deleteTodo(listId, todo.id)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </ListItemButton>
          ))}
        </List>

        <Box aria-label="кнопки" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {items.length !== 0 && (
            <Button title="Удалить все элементы" variant="contained" startIcon={<DeleteIcon />} onClick={() => store.clearTodos(listId)}>
              Все элементы
            </Button>
          )}

          <IconButton
            aria-label='Удалить список'
            title={'Удалить список'}
            sx={{ marginLeft: 'auto' }}
            onClick={handleOpen}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <DeletingModal listId={listId} listTitle={listTitle} open={open} handleClose={handleClose} />
    </Card>
  );
});

export default TodoCard;