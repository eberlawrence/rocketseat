import React from 'react';
import GlobalStyles from './styles/global';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks/index';
import Routes from './routes';

const App: React.FC = () => {


  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </ Router>
  );
};

export default App;
