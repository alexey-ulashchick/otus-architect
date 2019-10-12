import React, { useState, SetStateAction, Dispatch } from 'react';
import { Button, Form, FormField, Heading } from 'grommet';
import { LoginForm, LoginButton, Header, PageHeader, ErrorMessage } from './LoginPageStyles';
import { AuthService } from '../../services/AuthService';
import { Redirect } from 'react-router';
import { Loader } from '../../components/Loader';

interface ILoginForm {
  email: string;
  password: string;
}

const authService = AuthService.getInstance();

export const LoginPage: React.FC = () => {
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(false);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');

  if (authService.isAuthorized()) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  const login = (value: ILoginForm) => {
    setLoading(true);
    authService.login(value.email, value.password).subscribe(
      () => {
        setLoading(false);
      },
      (err: Error) => {
        setLoading(false);
        setError(err.message);
      }
    );
  };

  return (
    <div>
      {isLoading ? <Loader /> : ''}
      <header className={PageHeader}>
        <Heading level="5">Registration</Heading>
        <Button type="button" label="Sign Up" />
      </header>
      <div className={LoginForm}>
        <Heading className={Header} level="3">
          FaceVK
        </Heading>
        {error ? <div className={ErrorMessage}>{error}</div> : ''}
        <Form onChange={() => setError('')} onSubmit={(event: any) => login((event as { value: ILoginForm }).value)}>
          <FormField name="email" label="Email" required={true} />
          <FormField name="password" label="Password" type="password" required={true} />
          <Button className={LoginButton} type="submit" primary label="Login" />
        </Form>
      </div>
    </div>
  );
};
