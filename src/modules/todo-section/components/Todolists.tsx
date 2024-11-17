import { observer } from "mobx-react-lite";
import { Grid2 } from "@mui/material";
import store from '../store/todolists';
import TodoCard from "./TodoCard";
import modalStore from "../store/modal";


const Todolists = observer(() => {
  // добавление нового элемента в список
  const handleAddTodo = (listId: string, todoTitle: string) => {
    store.addTodo(listId, todoTitle);
  };

  // переключение статуса выполнения
  const handleToggleTodo = (listId: string, todoId: string) => {
    store.toggleTodo(listId, todoId);
  };

  // удаление элемента из списка
  const handleDeleteTodo = (listId: string, todoId: string) => {
    store.deleteTodo(listId, todoId);
  };

  // открыть модалку с подтверждением удаления
  const openListDeletingModal = (listId: string) => {
    modalStore.openListModal(listId);
  }

  // очистить список
  const handleClearAllTodos = (listId: string) => {
    store.clearTodos(listId);
  }

  return (
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
          <TodoCard
            todolist={todolist}
            handleAddTodo={handleAddTodo}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
            openListDeletingModal={() => openListDeletingModal(todolist.id)}
            handleClearAllTodos={() => handleClearAllTodos(todolist.id)}
          />
        </Grid2>
      ))}
    </Grid2>
  );
});

export default Todolists;