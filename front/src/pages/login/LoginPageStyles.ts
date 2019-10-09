import { style } from 'typestyle';

const FORM_BACKGROUND = '#2c2c2c';

const TILE = {
  backgroundColor: FORM_BACKGROUND,
  boxShadow: '1px 1px 10px black',
  borderRadius: '1em'
};

const WIDTH = '30em';

export const LoginPageStyle = style({
  height: '100%'
});

export const Header = style({
  margin: '0 auto',
  textAlign: 'center',
  marginBottom: '2em'
});

export const LoginForm = style(TILE, {
  width: WIDTH,
  margin: '25vh auto 0',
  display: 'flex',
  flexDirection: 'column',
  padding: '2em',
  boxSizing: 'border-box'
});

export const LoginButton = style({
  margin: '2em auto 0',
  display: 'block'
});

export const PageHeader = style(TILE, {
  padding: '1em',
  textAlign: 'right',
  maxWidth: '80em',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  display: 'flex',
  margin: '0 auto',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  $nest: {
    '*': {
      margin: 0,
    }
  }
});
