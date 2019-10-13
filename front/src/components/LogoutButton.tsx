import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { Button } from 'grommet';

export const LogoutButton = withRouter(({ history }) => (
  <Button
    type="button"
    label="Logout"
    onClick={() => {
      AuthService.getInstance().logout();
      history.push('/login');
    }}
  />
));
