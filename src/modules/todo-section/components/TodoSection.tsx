import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import modalStore from "../store/modal";
import ControlBar from "./ControlBar";
import Todolists from "./Todolists";
import ListDeletingModal from "./modals/ListDeletingModal";
import AllListsDeletingModal from "./modals/AllListsDeletingModal";


const TodoSection = observer(() => {
  return (
    <Box component='section' aria-label="Списки дел">
      <ControlBar />

      <Todolists />

      {/* общая модалка для подтверждения удаления списка */}
      <ListDeletingModal isOpened={modalStore.isListModalOpened} />

      {/* модалка для подтверждения удаления всех списков */}
      <AllListsDeletingModal isOpened={modalStore.isAllListsModalOpened} />
    </Box>
  );
});

export default TodoSection