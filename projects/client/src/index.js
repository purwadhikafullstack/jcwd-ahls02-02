import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { globalStore } from './Redux/Reducers/index';
import { createStore } from 'redux';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#5FB6C3',
      light: '#7FC4CF',
      dark: '#427F88',
      contrastText: 'rgba(255,255,255,0.87)'
    },
    secondary: {
      main: '#F7C749',
      light: '#F8D26D',
      dark: '#AC8B33'
    },
    error: {
      main: '#ed6660',
      light: '#F0847F',
      dark: '#A54743',
      contrastText: '#FFFFFF'
    },
    typography: {
      fontFamily: 'Mulish',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStore(globalStore)}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
