import { style } from 'typestyle';

export const InterestsGenderGroup = style({
  marginTop: '2em',
  '$nest': {
    '.label': {
      fontSize: '1.125em',
      marginBottom:'0.5em',
    },
    '.checkboxes': {
      marginLeft: '1em',
      '$nest': {
        '& > *': {
          margin: '0.25em 0'
        }
      }
    }
  }
});