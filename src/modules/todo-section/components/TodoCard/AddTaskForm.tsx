import { FormEvent, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


type AddTaskFormProps = {
  listId: string;
  handleAddTodo: (listId: string, title: string) => void;
}

const AddTaskForm = ({ listId, handleAddTodo }: AddTaskFormProps) => {
  const initialItemTitle = '';
  const [itemTitle, setItemTitle] = useState(initialItemTitle);

  // добавление новой задачи в список
  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    handleAddTodo(listId, itemTitle); // прокинутая ф-я работает со стором
    setItemTitle(initialItemTitle);
  }


  return (
    <Box
      component='form'
      sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
      onSubmit={addTodo}
      data-cy="add-task-form"
    >
      <TextField
        id="new-todo"
        label="Новая задача"
        variant="standard"
        sx={{ mb: 2 }}
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
        data-cy="add-task-input"
      />

      <IconButton
        aria-label='Добавить список'
        type='submit'
        disabled={itemTitle === ''}
        sx={{ color: 'primary.main' }}
        data-cy="add-task-btn"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddTaskForm;