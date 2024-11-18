import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useResponsive from "../../../lib/useResponsive";
import AddListForm from "./AddListForm";
import modalStore from "../store/modal";
import store from "../store/todolists";
import { observer } from "mobx-react-lite";


const ControlBar = observer(() => {
  const isMobile = useResponsive();
  const todolists = store.todolists;

  // открыть модалку с подтверждением удаления
  const openAllListsDeletingModal = () => {
    modalStore.openAllListsModal();
  }


  return (
    <Box sx={{
      mb: isMobile ? 4 : 1,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
    }}
      data-cy="control-bar"
    >
      <AddListForm />

      <Button
        title="Удалить все списки"
        variant="contained"
        startIcon={<DeleteIcon />}
        disabled={todolists.length === 0}
        onClick={openAllListsDeletingModal}
        data-cy="del-all-lists-btn"
      >
        Все списки
      </Button>
    </Box>
  );
});

export default ControlBar;
