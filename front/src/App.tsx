import React from 'react';

import { LoginPage } from './pages/login/LoginPage';
import { BrowserRouter, Route, Redirect, RouteProps } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { HomePage } from './pages/home/HomePage';
import { AuthService } from './services/AuthService';
import { SignUpPage } from './pages/signup/SignUpPage';
import { PageView } from './pages/page-view/PageView';

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
        size: '16px',
        height: '20px'
      },
    }
  };
  return (
    <Grommet theme={theme} full={true}>
      <Box fill={true} background="dark-1">
        <BrowserRouter>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/page-view/:email/" component={PageView} />
        </BrowserRouter>
      </Box>
    </Grommet>
  );
};

export default App;
