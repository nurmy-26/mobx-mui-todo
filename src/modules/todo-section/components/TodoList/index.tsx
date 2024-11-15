import { observer } from 'mobx-react-lite';
import { FormEvent, useRef, useState } from 'react';
import { getFormattedDate } from '../../helpers/getFormattedDate';
import store from '../../store';
import { TList } from '../../types';


type TodoListProps = {
  todolist: TList;
}

const TodoList = observer(({ todolist }: TodoListProps) => {
  const { id: listId, title: listTitle, creationDate: listDate, items } = todolist;
  const listCreationDate = getFormattedDate(listDate);

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
    }, 0);
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
    <article>
      {isEditing ? (
        <form onSubmit={handleSubmitRename} onReset={handleReset}>
          <input ref={editingInputRef} value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} />
          <button disabled={newListTitle === ''} type="submit">Save</button>
          <button type="reset">Cancel</button>
        </form>
      ) : (
        // todo - добавить подсказку при наведении о возможности редактировать (карандаш)
        <div onClick={handleEdit}>
          <p>{listTitle}</p>
        </div>
      )}

      <p>{listCreationDate}</p>

      {/* добавление нового элемента в список */}
      <form onSubmit={handleAddTodo}>
        <input
          placeholder={'Новая задача'}
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />
        <button disabled={itemTitle === ''} type='submit'>+</button>
      </form>

      <button onClick={() => store.clearTodos(listId)}>CLEAR ITEMS</button>

      <button onClick={() => store.deleteTodolist(listId)}>DELETE LIST</button>

      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.isDone}
              onChange={() => store.toggleTodo(listId, todo.id)}
            />
            {todo.title}
            <button onClick={() => store.deleteTodo(listId, todo.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
});

export default TodoList;