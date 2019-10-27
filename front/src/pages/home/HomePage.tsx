import React, { useState, Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { AuthService } from '../../services/AuthService';
import { Page } from '../../models/Page';
import { PageService } from '../../services/PageService';
import { Loader } from '../../components/Loader';
import { ErrorMessage, PageHeader } from '../login/LoginPageStyles';
import { Button, Box, TextInput } from 'grommet';
import { LogoutButton } from '../../components/LogoutButton';
import { PageListItem } from '../../components/PageListItem';
import { ListOfPages, Buttons, HomePageBody, SearchForm, InfinityScrollContainer, SearchTextInput, SearchIcon } from './HomePageStyles';
import { Link } from 'react-router-dom';
import { Search } from 'grommet-icons';
import { BehaviorSubject } from 'rxjs';
import { throttleTime, debounceTime, switchMap } from 'rxjs/operators';

const authService = AuthService.getInstance();
const pageService = new PageService();

const filter$ = new BehaviorSubject('');

export const HomePage: React.FC = () => {
  const email = authService.getEmail();
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(true);
  const [pages, setPage]: [Page[], (Dispatch<SetStateAction<Page[]>>)] = useState<Page[]>([]);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');
  const [self, setSelf]: [Page | null, (Dispatch<SetStateAction<Page | null>>)] = useState<Page | null>(null);
  const [filter, setFilter]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');

  useMemo(() => {
    filter$.pipe(throttleTime(500)).subscribe(() => setLoading(true));

    filter$
      .pipe(
        debounceTime(500),
        switchMap(value => pageService.getPages$(value))
      )
      .subscribe(pages => {
        setLoading(false);
        setPage(pages);
      });
  }, []);

  useEffect(() => {
    pageService.getPage$(email!)
      .subscribe(page => setSelf(page), err => setError(err));

    pageService.getPages$('').subscribe(
      newPages => {
        setPage(newPages.filter(page => page.email !== email));
        setLoading(false);
      },
      (err: Error) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, [email]);

  return (
    <div className={HomePageBody}>
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
      <div className={SearchForm}>
        <TextInput
          className={SearchTextInput}
          prefix={'sd'}
          value={filter}
          onChange={event => {
            setFilter(event.target.value);
            filter$.next(event.target.value);
          }}
        />
        <Search className={SearchIcon} />
      </div>
      <main className={ListOfPages}>
        {isLoading ? <Loader /> : ''}
        <div className={InfinityScrollContainer}>
          {pages.map((page, index) => <PageListItem key={index} page={page} />)}
        </div>
      </main>
    </div>
  );
};
