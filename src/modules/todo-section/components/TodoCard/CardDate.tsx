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
    >
      {listCreationDate}
    </Typography>
  );
};

export default CardDate;