import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { PageService } from '../../services/PageService';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { Page } from '../../models/Page';
import { Loader } from '../../components/Loader';
import { ErrorMessage, FormStyle, Header } from '../login/LoginPageStyles';
import { Heading, Table, TableBody, TableRow, TableCell, Button } from 'grommet';
import { Close } from 'grommet-icons';
import { style } from 'typestyle';
import { delay } from 'rxjs/operators';

interface PageViewRouteParams {
  email: string;
}

type PageViewProps = RouteComponentProps<PageViewRouteParams>;

export const CloseButtonStyle = style({
  position: 'absolute',
  top: '1em',
  right: '1em',
});

export const PageView = withRouter((props: PageViewProps) => {
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(true);
  const [page, setPage]: [Page | null, (Dispatch<SetStateAction<Page | null>>)] = useState<Page | null>(null);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');

  useEffect(() => {
    new PageService().getPage$(props.match.params.email).pipe(delay(500)).subscribe(
      (page: Page) => {
        setPage(page);
        setLoading(false);
      },
      (err: Error) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, [props.match.params.email]);

  return (
    <div>
      {isLoading ? <Loader /> : ''}
      {error ? <div className={ErrorMessage}>{error}</div> : ''}
      {page ? (
        <div className={FormStyle}>
          <Heading className={Header} level="3">
            Page
          </Heading>
          <Link to="/" className={CloseButtonStyle}>
            <Button icon={<Close />}/>
          </Link>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell scope="row">
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  {page.firstName} {page.lastName}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell scope="row">
                  <strong>Email</strong>
                </TableCell>
                <TableCell>{page.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell scope="row">
                  <strong>City</strong>
                </TableCell>
                <TableCell>{page.city}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell scope="row">
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>{page.gender}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell scope="row">
                  <strong>Age</strong>
                </TableCell>
                <TableCell>{page.age}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell scope="row">
                  <strong>Interests</strong>
                </TableCell>
                <TableCell>{page.areasOfInterest.join(', ') || 'Not specified'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        ''
      )}
    </div>
  );
});
