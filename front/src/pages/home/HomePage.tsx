import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { AuthService } from '../../services/AuthService';
import { Page } from '../../models/Page';
import { PageService } from '../../services/PageService';
import { Loader } from '../../components/Loader';
import { ErrorMessage, PageHeader } from '../login/LoginPageStyles';
import { Button, Box } from 'grommet';
import { LogoutButton } from '../../components/LogoutButton';
import { PageListItem } from '../../components/PageListItem';
import { ListOfPages, Buttons } from './HomePageStyles';
import { Link } from 'react-router-dom';

const authService = AuthService.getInstance();
const email = authService.getEmail();

export const HomePage: React.FC = () => {
  const email = authService.getEmail();
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(true);
  const [pages, setPage]: [Page[], (Dispatch<SetStateAction<Page[]>>)] = useState<Page[]>([]);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');
  const [self, setSelf]: [Page | null, (Dispatch<SetStateAction<Page | null>>)] = useState<Page | null>(null);

  useEffect(() => {
    new PageService().getPages$().subscribe(
      pages => {
        setPage(pages.filter(page => page.email !== email));
        setSelf(pages.find(page => page.email === email) || null);
        setLoading(false);
      },
      (err: Error) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : ''}
      {error ? <div className={ErrorMessage}>{error}</div> : ''}
      {self === null ? (
        <header className={PageHeader}>
          <Link to="/page-edit">
            <Button primary type="button" label="Create Page" />
          </Link>
          <LogoutButton />
        </header>
      ) : (
        <header className={PageHeader}>
          <Box basis="full" direction="row">
            <Box basis="1/2" justify="center">
              {self!.firstName} {self!.lastName}
            </Box>
            <Box basis="1/2" direction="row" className={Buttons} justify="end">
              <Link to="/page-edit">
                <Button primary type="button" label="Edit Page" />
              </Link>
              <LogoutButton />
            </Box>
          </Box>
        </header>
      )}
      <main className={ListOfPages}>
        {pages.map((page, index) => (
          <PageListItem key={index} page={page} />
        ))}
      </main>
    </div>
  );
};
