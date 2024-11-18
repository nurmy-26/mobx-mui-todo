import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import store from '../store/todolists';


const AddListForm = () => {
  const initialListTitle = '';
  const [listTitle, setListTitle] = useState(initialListTitle);

  // добавить новый список
  const handleAddTodolist = (e: React.FormEvent) => {
    e.preventDefault();

    store.addTodolist(listTitle);
    setListTitle(initialListTitle);
  };

  return (
    <Box
      component='form'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onSubmit={handleAddTodolist}
      data-cy="add-list-form"
    >
      <TextField
        id="new-list"
        label="Новый список"
        variant="standard"
        sx={{ mb: 2 }}
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
        data-cy="add-list-input"
      />

      <IconButton
        aria-label='Добавить список'
        type='submit'
        disabled={listTitle === ''}
        sx={{ color: 'primary.main' }}
        data-cy="add-list-btn"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddListForm;