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
    >
      <TextField
        id="new-list"
        label="Новый список"
        variant="standard"
        sx={{ mb: 2 }}
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />

      <IconButton
        aria-label='Добавить список'
        type='submit'
        disabled={listTitle === ''}
        sx={{ color: 'primary.main' }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddListForm;