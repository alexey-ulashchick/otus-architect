import { style } from 'typestyle';
import { color } from 'csx';

export const accentColor = color('#6FFFB0');
export const errorColor = color('#FF4040');

const FORM_BACKGROUND = color('#2c2c2c');

const TILE = {
  backgroundColor: FORM_BACKGROUND.toString(),
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
      margin: 0
    }
  }
});

export const Loader = style({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  zIndex: 1,
  $nest: {
    '&::before': {
      content: `''`,
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      opacity: 0.5,
      backgroundColor: FORM_BACKGROUND.lighten('10%').toString(),
      zIndex: 1
    },
    '&::after': {
      ...TILE,
      content: `''`,
      position: 'absolute',
      width: '10em',
      height: '10em',
      top: 'calc(50% - 5em)',
      left: 'calc(50% - 5em)',
      backgroundColor: FORM_BACKGROUND.darken('10%').toString()
    }
  }
});


export const ErrorMessage = style({
  color: errorColor.toString(),
  fontSize: '1.286em', //18px
  textAlign: 'center',
  margin: '1em auto 2em',
});