import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { AuthService } from '../../services/AuthService';
import { Page } from '../../models/Page';
import { PageService } from '../../services/PageService';
import { Loader } from '../../components/Loader';
import { ErrorMessage, PageHeader } from '../login/LoginPageStyles';
import { Button } from 'grommet';
import { LogoutButton } from '../../components/LogoutButton';
import { PageListItem } from '../../components/PageListItem';
import { ListOfPages } from './HomePageStyles';

const authService = AuthService.getInstance();
const email = authService.getEmail();

export const HomePage: React.FC = () => {
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
          <Button primary type="button" label="Create Page" />
          <LogoutButton />
        </header>
      ) : (
        <header className={PageHeader}>
          <div>
            {self!.firstName} {self!.lastName}
          </div>
          <Button primary type="button" label="Edit Page" />
          <LogoutButton />
        </header>
      )}
      <main className={ListOfPages}>
        {pages.map((page,index) => <PageListItem key={index} page={page}/>)}
      </main>
    </div>
  );
};
