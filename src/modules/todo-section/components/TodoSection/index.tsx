import { observer } from "mobx-react-lite";
import { useState } from "react";
import store from "../../store";
import TodoList from "../TodoList";

const TodoSection = observer(() => {
  const initialListTitle = '';
  const [listTitle, setListTitle] = useState(initialListTitle);

  const handleAddTodolist = (e: React.FormEvent) => {
    e.preventDefault();

    store.addTodolist(listTitle);
    setListTitle(initialListTitle);
  };


  return (
    <section aria-label="Списки дел">
      {/* добавление нового списка */}
      <form onSubmit={handleAddTodolist}>
        <input
          placeholder={'Введите название списка'}
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
        />
        <button type='submit' disabled={listTitle === ''}>+</button>
      </form>

      <button onClick={() => store.clearTodolists()}>CLEAR ALL LISTS</button>

      <ul>
        {store.todolists.map((todolist) => (
          <li key={todolist.id} >
            <TodoList todolist={todolist} />
          </li>
        ))}
      </ul>
    </section>
  )
})

export default TodoSection