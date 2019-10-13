import React, { useState, Dispatch, SetStateAction } from 'react';
import { Heading, Form, FormField, Button } from 'grommet';
import { AuthService } from '../../services/AuthService';
import { ErrorMessage, Header, FormStyle } from '../login/LoginPageStyles';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import { Loader } from '../../components/Loader';

interface ISignUpForm {
  email: string;
  password: string;
}

const authService = AuthService.getInstance();

export const SignUpPage: React.FC = () => {
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(false);
  const [isRegistered, setRegistration]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(false);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');
  const signUp = (value: ISignUpForm) => {
    setLoading(true);
    authService.signUp(value.email, value.password).subscribe(
      () => {
        setLoading(false);
        setRegistration(true);
      },
      (err: Error) => {
        setLoading(false);
        setError(err.message);
      }
    );
  };

  return (
    <div className={FormStyle}>
      {isLoading ? <Loader /> : ''}
      <Heading className={Header} level="3">
        Registration
      </Heading>
      {error ? <div className={ErrorMessage}>{error}</div> : ''}
      {isRegistered ? (
        <div className={style({textAlign: 'center'})}>
          <Heading level="4">Registration success!</Heading>
          <Link to="/login">
            <Button primary type="button" label="Go to LogIn" />
          </Link>
        </div>
      ) : (
        <Form onChange={() => setError('')} onSubmit={(event: any) => signUp((event as { value: ISignUpForm }).value)}>
          <FormField name="email" label="Email" required={true} />
          <FormField name="password" label="Password" type="password" required={true} />
          <div className={style({ marginTop: '2em', display: 'flex', justifyContent: 'space-around' })}>
            <Button type="submit" primary label="SignUp" />
            <Link to="/login">
              <Button type="button" label="Cancel" />
            </Link>
          </div>
        </Form>
      )}
    </div>
  );
};
