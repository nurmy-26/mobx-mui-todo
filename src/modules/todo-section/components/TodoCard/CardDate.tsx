import { Typography } from '@mui/material';
import { getFormattedDate } from '../../helpers/getFormattedDate';


type CardDateProps = {
  listDate: Date;
}

const CardDate = ({ listDate }: CardDateProps) => {
  const listCreationDate = getFormattedDate(listDate, 'medium');


  return (
    <Typography
      variant={'body2'}
      color="secondary"
      sx={{ textAlign: 'right' }}
      data-cy="todo-date"
    >
      {listCreationDate}
    </Typography>
  );
};

export default CardDate;