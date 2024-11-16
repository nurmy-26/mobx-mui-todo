import { observer } from "mobx-react-lite";
import { useState } from "react";
import store from "../store";
import TodoCard from "./TodoCard";
import { Box, Button, Grid2, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useResponsive from "../../../lib/useResponsive";

const TodoSection = observer(() => {
  const isMobile = useResponsive();

  const initialListTitle = '';
  const [listTitle, setListTitle] = useState(initialListTitle);

  const handleAddTodolist = (e: React.FormEvent) => {
    e.preventDefault();

    store.addTodolist(listTitle);
    setListTitle(initialListTitle);
  };


  return (
    <Box component='section' aria-label="Списки дел">

      <Box sx={{
        mb: isMobile ? 4 : 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
      }}>
        {/* добавление нового списка */}
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

        <Button title="Удалить все списки" variant="contained" startIcon={<DeleteIcon />} onClick={() => store.clearTodolists()}>
          Все списки
        </Button>
      </Box>

      <Grid2 container component='ul' spacing={5}
        sx={{
          listStyleType: 'none',
          padding: 0,
        }}
      >
        {store.todolists.map((todolist) => (
          <Grid2 component='li' key={todolist.id}
            size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
            sx={{
              padding: 0,
            }}
          >
            <TodoCard todolist={todolist} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
})

export default TodoSection