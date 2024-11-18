import { Container, Typography } from '@mui/material';
import { TodoSection } from './modules';
import useResponsive from './lib/useResponsive';

const App = () => {
  const isMobile = useResponsive();


  return (
    <Container
      component={'main'}
      sx={{ mt: 24, mb: 4, textAlign: 'center', color: 'primary.main' }}
    >
      <Typography
        variant='h1'
        sx={{ mb: isMobile ? 3 : 1 }}
        data-cy="app-title"
      >
        TODO APP
      </Typography>

      <TodoSection />
    </Container>
  )
}

export default App