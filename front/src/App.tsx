import React from 'react';

// import './App.css';
import { LoginPage } from './pages/login/LoginPage';
import { BrowserRouter, Route, Redirect, RouteProps } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { HomePage } from './pages/home/HomePage';
import { AuthService } from './services/AuthService';

const authService = AuthService.getInstance();

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }: RouteProps) => {
  const Component = component!;

  return <Route {...rest} render={props => (authService.isAuthorized() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)} />;
};

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
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
        </BrowserRouter>
      </Box>
    </Grommet>
  );
};

export default App;
