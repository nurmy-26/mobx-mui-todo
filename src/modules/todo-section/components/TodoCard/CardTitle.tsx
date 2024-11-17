import { observer } from 'mobx-react-lite';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useEditTitle from '../../hooks/useEditTitle';
import { MouseEvent } from 'react';


type CardTitleProps = {
  listId: string;
  listTitle: string;
  openListDeletingModal: () => void;
}

const CardTitle = observer(({ listId, listTitle, openListDeletingModal }: CardTitleProps) => {
  const {
    editingInputRef,
    isEditing,
    handleEdit,
    handleCloseEdit,

    newListTitle,
    setNewListTitle,
    handleSubmitRename,
    handleResetRename,
  } = useEditTitle(listId);

  const openDeletingList = (e: MouseEvent) => {
    // чтоб при нажатии на удаление не вызывалось редактирование
    e.stopPropagation();

    openListDeletingModal();
  }


  return (
    <Box
      component='header'
      onClick={handleEdit}
      sx={{
        p: 2,
        minHeight: 80,
        display: 'flex',
        backgroundColor: 'secondary.main',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover .edit-icon': {
          visibility: 'visible',
        },
      }}>
      {/* если вошли в режим редактирования - отобразится инпут (форма) */}
      {isEditing ? (
        <Box
          component='form'
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onSubmit={handleSubmitRename}
          onReset={handleResetRename}
        >
          <TextField
            id="rename-list"
            label="Переименовать"
            variant="standard"
            inputRef={editingInputRef}
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={handleCloseEdit}
          />

          <IconButton
            aria-label='Переименовать список'
            type='submit'
            disabled={newListTitle === ''}
            sx={{ color: 'success.main', backgroundColor: 'secondary.light' }}
          >
            <DoneIcon />
          </IconButton>

          <IconButton
            aria-label='Отмена'
            type='reset'
            sx={{ color: 'error.main', backgroundColor: 'secondary.light' }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <Typography variant='h2' noWrap color="primary" sx={{ borderRadius: '4px', }}>
            {listTitle}
          </Typography>

          <IconButton
            className='edit-icon'
            sx={{ ml: 1, visibility: 'hidden', p: 0.5 }}
            aria-label='Редактировать имя списка'
          >
            <EditIcon fontSize='small' />
          </IconButton>

          <IconButton
            aria-label='Удалить список'
            title={'Удалить список'}
            sx={{ marginLeft: 'auto' }}
            onClick={openDeletingList}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}

    </Box>
  );
});

export default CardTitle;