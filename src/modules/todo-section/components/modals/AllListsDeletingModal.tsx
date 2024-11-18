import { observer } from "mobx-react-lite";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import store from '../../store/todolists';
import modalStore from '../../store/modal';


type AllListsDeletingModalProps = {
  isOpened: boolean;
}

const AllListsDeletingModal = observer(({ isOpened }: AllListsDeletingModalProps) => {
  const handleClose = () => {
    modalStore.closeAllListsModal();
  }

  const handleDelete = () => {
    store.clearTodolists();
    handleClose();
  }

  return (
    <ConfirmationModal
      isOpened={isOpened}
      handleClose={handleClose}
      modalLabel={'deleting-modal'}
      modalDescription={'Подтверждение удаления списка'}

      actionText={'удалить'}
      subjectText={'все списки'}
      accentSubjectText={`Это действие удалит их безвозвратно.`}
      btnSubmitText={'Удалить'}
      handleSubmit={handleDelete}
      btnCancelText={'Отмена'}
      handleCancel={handleClose}
      data-cy="all-lists-del-modal"
    />
  );
});

export default AllListsDeletingModal;