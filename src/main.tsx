import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './index.css';
import App from './App.tsx';
import theme from './config/mui-theme.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline - аналог CSS-ресета, оптимизированный для MUI */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
