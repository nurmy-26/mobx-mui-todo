import { useState, useCallback, useRef, FormEvent, KeyboardEvent } from "react";
import store from "../store/todolists";

const useEditTitle = (listId: string) => {
  // режим редактирования
  const initialEditing = false;
  const [isEditing, setIsEditing] = useState(initialEditing);
  const resetEditing = useCallback(
    () => setIsEditing(initialEditing),
    [initialEditing]
  );

  // новое значение для имени списка
  const initialNewTitle = "";
  const [newListTitle, setNewListTitle] = useState(initialNewTitle);

  // ссылка на поле редактирования для фокуса
  const editingInputRef = useRef<HTMLInputElement | null>(null);

  // переход в режим редактирования
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    // таймаут позволяет отложить установку фокуса до момента,
    // когда все изменения в DOM завершены и элемент действительно существует
    setTimeout(() => {
      if (editingInputRef.current) {
        editingInputRef.current.focus();
      }
    }, 0);
  }, []);

  // отменить редактирование при нажатии Esc
  const handleCloseEdit = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetEditing();
        setNewListTitle(initialNewTitle);
      }
    },
    [resetEditing]
  );

  // подтвердить переименование
  const handleSubmitRename = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      store.renameTodolist(listId, newListTitle);
      resetEditing();
      setNewListTitle(initialNewTitle);
    },
    [listId, newListTitle, resetEditing]
  );

  // сбросить переименование
  const handleResetRename = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      resetEditing();
      setNewListTitle(initialNewTitle);
    },
    [resetEditing]
  );

  return {
    editingInputRef,
    isEditing,
    handleEdit,
    handleCloseEdit,

    newListTitle,
    setNewListTitle,
    handleSubmitRename,
    handleResetRename,
  };
};

export default useEditTitle;
