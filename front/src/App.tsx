import React from 'react';

// import './App.css';
import { LoginPage } from './pages/login/LoginPage';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';

const App: React.FC = () => {
  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        height: '20px'
      },
      colors: {
        // active: 'red',
        // brand: 'red',
        // control: {
        //   dark: 'yellow',
        // },
        // text: {
        //   dark: 'lightgray'
        // }
      }
    }
  };
  return (
    <Grommet theme={theme} full={true}>
      <Box fill={true} background="dark-1">
        <BrowserRouter>
          <Route exact path="/" component={LoginPage} />
        </BrowserRouter>
      </Box>
    </Grommet>
  );
};

export default App;
