import { style } from 'typestyle';
import { color } from 'csx';

export const accentColor = color('#6FFFB0');
export const errorColor = color('#FF4040');
export const FORM_BACKGROUND = color('#2c2c2c');
export const TILE = {
  backgroundColor: FORM_BACKGROUND.toString(),
  boxShadow: '1px 1px 10px black',
  borderRadius: '1em'
};

const WIDTH = '30em';
export const MAX_WIDTH = '80em';

export const LoginPageStyle = style({
  height: '100%'
});

export const Header = style({
  margin: '0 auto',
  textAlign: 'center',
  marginBottom: '2em'
});

export const FormStyle = style(TILE, {
  width: WIDTH,
  margin: '25vh auto 0',
  display: 'flex',
  flexDirection: 'column',
  padding: '2em',
  boxSizing: 'border-box'
});

export const CenteredButton = style({
  margin: '2em auto 0',
  display: 'block'
});

export const PageHeader = style(TILE, {
  padding: '1em',
  textAlign: 'right',
  maxWidth: MAX_WIDTH,
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

export const ErrorMessage = style({
  color: errorColor.toString(),
  fontSize: '1.286em', //18px
  textAlign: 'center',
  margin: '1em auto 2em',
  width: '100%',
  overflow: 'hidden'
});
