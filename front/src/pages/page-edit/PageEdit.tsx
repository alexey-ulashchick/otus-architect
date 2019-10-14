import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { PageService } from '../../services/PageService';
import { AuthService } from '../../services/AuthService';
import { Page, Gender } from '../../models/Page';
import { Loader } from '../../components/Loader';
import { Form, FormField, RadioButtonGroup, Heading, CheckBox, Box, Button, TextInput } from 'grommet';
import { Header, FormStyle, ErrorMessage, CenteredButton } from '../login/LoginPageStyles';
import { catchError, zip } from 'rxjs/operators';
import { of } from 'rxjs';
import { InterestsGenderGroup } from './PageEditStyle';
import { Link, withRouter } from 'react-router-dom';
import { CloseButtonStyle } from '../page-view/PageView';
import { Close } from 'grommet-icons';

const pageService = new PageService();

export const PageEdit = withRouter(({ history }) => {
  const [isLoading, setLoading]: [boolean, (Dispatch<SetStateAction<boolean>>)] = useState<boolean>(true);
  const [error, setError]: [string, (Dispatch<SetStateAction<string>>)] = useState<string>('');
  const [page, setPage]: [Page, (Dispatch<SetStateAction<Page>>)] = useState<Page>(new Page('', '', '', '', Gender.MALE, 18, []));
  const [areasOfInterest, setAreasOfInterest]: [string[], (Dispatch<SetStateAction<string[]>>)] = useState<string[]>([]);

  const createPage = () => {
    setLoading(true);
    setError('');
    pageService.updatePage$(page).subscribe(
      res => {
        history.push('/');
      },
      (err: Error) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    pageService
      .getPage$(AuthService.getInstance().getEmail()!)
      .pipe(
        catchError(() => of(null)),
        zip(pageService.getAreasOfInterest$())
      )
      .subscribe(
        ([page, areasOfInterest]: [Page | null, string[]]) => {
          if (page !== null) {
            setPage({ ...page });
          }
          setAreasOfInterest(areasOfInterest);
          setLoading(false);
        },
        (err: Error) => {
          setError(err.message);
          setLoading(false);
        }
      );
  }, []);

  return (
    <div className={FormStyle}>
      {isLoading ? <Loader /> : ''}
      <Link to="/" className={CloseButtonStyle}>
        <Button icon={<Close />} />
      </Link>
      <Heading className={Header} level="3">
        Create/Edit Page
      </Heading>
      {error ? <div className={ErrorMessage}>{error}</div> : ''}
      <Form onChange={() => setError('')} onSubmit={() => createPage()}>
        <FormField name="firstNAme" label="First Name">
          <TextInput
            value={page.firstName}
            onChange={event => {
              page.firstName = event.target.value;
              setPage({ ...page });
            }}
            required={true}
          />
        </FormField>
        <FormField name="lastName" label="Last Name">
          <TextInput
            value={page.lastName}
            required={true}
            onChange={event => {
              page.lastName = event.target.value;
              setPage({ ...page });
            }}
          />
        </FormField>
        <FormField name="city" label="City">
          <TextInput
            value={page.city}
            required={true}
            onChange={event => {
              page.city = event.target.value;
              setPage({ ...page });
            }}
          />
        </FormField>
        <FormField name="age" label="Age">
          <TextInput
            value={page.age}
            required={true}
            onChange={event => {
              page.age = Number(event.target.value);
              setPage({ ...page });
            }}
          />
        </FormField>
        <Box direction="row" className={InterestsGenderGroup}>
          <Box basis="1/2">
            <div className="label">Gender:</div>
            <RadioButtonGroup
              name="gender"
              options={[Gender.MALE, Gender.FEMALE]}
              value={page.gender}
              onChange={event => {
                page.gender = event.target.value;
                setPage({ ...page });
              }}
            />
          </Box>
          <Box>
            <div className="label">Interests:</div>
            <div className="checkboxes">
              {areasOfInterest.map(areaOfInterest => (
                <CheckBox
                  key={areaOfInterest}
                  checked={page.areasOfInterest.indexOf(areaOfInterest) !== -1}
                  label={areaOfInterest}
                  onChange={(event: any) => {
                    if (event.target.checked) {
                      page.areasOfInterest = [...page.areasOfInterest, areaOfInterest];
                    } else {
                      page.areasOfInterest = page.areasOfInterest.filter(item => item !== areaOfInterest);
                    }

                    setPage({ ...page });
                  }}
                />
              ))}
            </div>
          </Box>
        </Box>
        <Button className={CenteredButton} type="submit" primary label="Save Page" />
      </Form>
    </div>
  );
});
