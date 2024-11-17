import { makeAutoObservable } from "mobx";

class ModalStore {
  isListModalOpened = false;
  isAllListsModalOpened = false;
  deletingListId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openListModal(id: string) {
    this.deletingListId = id;
    this.isListModalOpened = true;
  }

  closeListModal() {
    this.deletingListId = null;
    this.isListModalOpened = false;
  }

  openAllListsModal() {
    this.isAllListsModalOpened = true;
  }

  closeAllListsModal() {
    this.isAllListsModalOpened = false;
  }
}

const modalStore = new ModalStore();
export default modalStore;
