import { style } from 'typestyle';
import { MAX_WIDTH, TILE, FORM_BACKGROUND } from '../login/LoginPageStyles';

export const HomePageBody = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  $nest: {
    '& > *': {
      width: '100%',
    }
  }
});

export const SearchForm = style(TILE, {
  maxWidth: MAX_WIDTH,
  margin: '2em auto',
  padding: '1em',
  boxSizing: 'border-box',
  backgroundColor: FORM_BACKGROUND.lighten('10%').toString(),
  position: 'relative',
});

export const SearchTextInput = style({
  paddingLeft: '2.5em'
});

export const SearchIcon = style({
  position: 'absolute',
  top: '1.6em',
  left: '1.6em',
});

export const ListOfPages = style({
  ...TILE,
  margin: '2em auto 0',
  maxWidth: MAX_WIDTH,
  padding: '1em',
  flex: '1',
  overflow: 'auto',
  marginBottom: '2em',
  boxSizing: 'border-box',
  position: 'relative',
});

export const InfinityScrollContainer = style({
  height: '100%',
  overflow: 'auto'
})

export const Buttons = style({
  textAlign: 'right',
  $nest: {
    '& > *': {
      marginLeft: '1em'
    }
  }
})