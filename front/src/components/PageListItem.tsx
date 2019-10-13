import { Page } from '../models/Page';
import React from 'react';
import { style } from 'typestyle';
import { FORM_BACKGROUND } from '../pages/login/LoginPageStyles';
import { Link } from 'react-router-dom';

const PageItemStyle = style({
  display: 'flex',
  height: '4em',
  alignItems: 'center',
  padding: '0 2em',
  position: 'relative',
  transition: '0.2s ease all',
  cursor: 'pointer',
  $nest: {
    '&:not(:last-of-type):after': {
      content: `''`,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '1px',
      backgroundColor: FORM_BACKGROUND.lighten('10%').toString()
    },
    '&:hover': {
      backgroundColor: FORM_BACKGROUND.lighten('3%').toString()
    }
  }
});

const NameColumn = style({
  flex: 1
});

export const PageListItem: React.FC<{ page: Page }> = ({ page }: { page: Page }) => (
  <Link to={`/page-view/${page.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className={PageItemStyle}>
      <div className={NameColumn}>{page.firstName}</div>
      <div className={NameColumn}>{page.lastName}</div>
      <div className={NameColumn}>{page.city}</div>
    </div>
  </Link>
);
