import { Container, Typography } from '@mui/material';
import TodoSection from './modules/todo-section/components/TodoSection';

const App = () => {
  return (
    <Container component={'main'} sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}>

      <Typography gutterBottom variant='h1'>TODO APP</Typography>

      <TodoSection />

    </Container>
  )
}

export default App