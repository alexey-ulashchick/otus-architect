import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { accentColor, FORM_BACKGROUND, TILE } from '../pages/login/LoginPageStyles';
import { style } from 'typestyle';

const LoaderStyle = style({
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

export const Loader: React.FC = () => {
  return (
    <div className={LoaderStyle}>
      <ClimbingBoxLoader css={'z-index: 1;'} color={accentColor.toString()} />
    </div>
  );
};
