import { observer } from 'mobx-react-lite';
import { Box, Card } from '@mui/material';
import { TList } from '../../types';
import CardTitle from './CardTitle';
import CardDate from './CardDate';
import AddTaskForm from './AddTaskForm';
import CardList from './CardList';
import Footer from './Footer';


type TodoCardProps = {
  todolist: TList;
  handleAddTodo: (listId: string, title: string) => void;
  handleToggleTodo: (listId: string, todoId: string) => void;
  handleDeleteTodo: (listId: string, todoId: string) => void;
  openListDeletingModal: () => void;
  handleClearAllTodos: () => void;
}

const TodoCard = observer(({
  todolist,
  handleAddTodo,
  handleToggleTodo,
  handleDeleteTodo,
  openListDeletingModal,
  handleClearAllTodos
}: TodoCardProps) => {
  const { id: listId, title: listTitle, creationDate: listDate, items } = todolist;

  return (
    <Card component={'article'} elevation={3} sx={{
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
    }}>

      <CardTitle listId={listId} listTitle={listTitle} openListDeletingModal={openListDeletingModal} />

      <Box component='section' sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: items.length === 0 ? '' : 'space-between',
        flexGrow: 1
      }}>
        <CardDate listDate={listDate} />

        <AddTaskForm listId={listId} handleAddTodo={handleAddTodo} />

        <CardList
          items={items}
          listId={listId}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
        />

        <Footer
          items={items}
          openListDeletingModal={openListDeletingModal}
          handleClearAllTodos={handleClearAllTodos}
        />
      </Box>
    </Card>
  );
});

export default TodoCard;