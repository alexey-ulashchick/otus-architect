import React, { useState, SetStateAction, Dispatch } from 'react';
import { Box, Button, Form, FormField, Heading } from 'grommet';
import { LoginForm, LoginButton, Header, PageHeader } from './LoginPageStyles';

export const LoginPage: React.FC = () => {
  const [counter, setNumber]: [number, (Dispatch<SetStateAction<number>>)] = useState<number>(0);
  const func = () => {
    alert('Hi');
  };

  return (
    <div>
      <header className={PageHeader}>
        <Heading level="5">
          Registration
        </Heading>
        <Button type="button" primary label="Sign Up" />
      </header>
      <div className={LoginForm}>
        <Heading className={Header} level="3">
          FaceVK
        </Heading>
        <Form>
          <FormField name="email" label="Email" required={true} />
          <FormField name="password" label="Password" type="password" required={true} />
          <Button className={LoginButton} type="submit" primary label="Login" />
        </Form>
      </div>
    </div>
  );
};
