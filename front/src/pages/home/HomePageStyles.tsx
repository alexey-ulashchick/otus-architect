import { style } from 'typestyle';
import { MAX_WIDTH, TILE } from '../login/LoginPageStyles';

export const ListOfPages = style({
  ...TILE,
  margin: '2em auto 0',
  maxWidth: MAX_WIDTH,
  padding: '1em',
});