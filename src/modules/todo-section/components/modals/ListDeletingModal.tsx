import { useMemo } from 'react';
import { observer } from "mobx-react-lite";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import store from '../../store/todolists';
import modalStore from '../../store/modal';


type ListDeletingModalProps = {
  isOpened: boolean;
}

const ListDeletingModal = observer(({ isOpened }: ListDeletingModalProps) => {
  const listId = modalStore.deletingListId;
  const listTitle = useMemo(() => {
    return store.todolists.find(item => item.id === listId)?.title;
  }, [listId]);

  const handleClose = () => {
    modalStore.closeListModal();
  }

  const handleDelete = () => {
    if (listId !== null) {
      store.deleteTodolist(listId);
      handleClose();
    }
  }

  return (
    <ConfirmationModal
      isOpened={isOpened}
      handleClose={handleClose}
      modalLabel={'deleting-modal'}
      modalDescription={'Подтверждение удаления списка'}

      actionText={'удалить'}
      subjectText={'этот список'}
      accentSubjectText={listTitle}
      btnSubmitText={'Удалить'}
      handleSubmit={handleDelete}
      btnCancelText={'Отмена'}
      handleCancel={handleClose}
    />
  );
});

export default ListDeletingModal;