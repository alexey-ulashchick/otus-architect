import React, { useState, SetStateAction, Dispatch } from 'react';
import { Button, Form, FormField, Heading } from 'grommet';
import { LoginForm, LoginButton, Header, PageHeader, Loader, ErrorMessage, accentColor } from './LoginPageStyles';
import { AuthService } from '../../services/AuthService';
import { delay } from 'rxjs/operators';
import { ClimbingBoxLoader } from 'react-spinners';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const authService = new AuthService();
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(false);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');

  const login = (value: ILoginForm) => {
    setLoading(true);
    authService
      .login(value.email, value.password)
      .pipe(delay(1000))
      .subscribe(
        res => {
          setLoading(false);
          console.log('Success', res);
        },
        (err: Error) => {
          setLoading(false);
          setError(err.message);
        }
      );
  };

  return (
    <div>
      {isLoading ? (
        <div className={Loader}>
          <ClimbingBoxLoader css={'z-index: 1;'} color={accentColor.toString()} />
        </div>
      ) : (
        ''
      )}
      <header className={PageHeader}>
        <Heading level="5">Registration</Heading>
        <Button type="button" label="Sign Up" />
      </header>
      <div className={LoginForm}>
        <Heading className={Header} level="3">
          FaceVK
        </Heading>
        {error ? <div className={ErrorMessage}>{error}</div> : ''}
        <Form onSubmit={(event: any) => login((event as { value: ILoginForm }).value)}>
          <FormField name="email" label="Email" required={true} />
          <FormField name="password" label="Password" type="password" required={true} />
          <Button className={LoginButton} type="submit" primary label="Login" />
        </Form>
      </div>
    </div>
  );
};
