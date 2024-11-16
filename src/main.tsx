import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material'

let theme = createTheme({
  palette: {
    primary: {
      main: "#63657F",
    },
    secondary: {
      main: "#CCCEDF",
    },
    success: {
      main: '#77feff',
    },
    error: {
      main: '#b10a20',
    }
  },
  typography: {
    fontFamily: 'Open Sans, Arial, sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: 400,
    },
    button: {
      fontSize: '.85rem',
      '@media (max-width:600px)': {
        fontSize: '.7rem',
      },
    },
  },
});

theme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  disableAlign: false,
  factor: 4,
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline - аналог CSS-ресета, оптимизированный для MUI */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
