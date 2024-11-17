import { Container, Typography } from '@mui/material';
import { TodoSection } from './modules/todo-section';
import useResponsive from './lib/useResponsive';

const App = () => {
  const isMobile = useResponsive();


  return (
    <Container component={'main'} sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}>
      <Typography variant='h1' sx={{ mb: isMobile ? 3 : 1 }}>TODO APP</Typography>

      <TodoSection />
    </Container>
  )
}

export default App