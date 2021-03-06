// @flow strict-local

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = { children: Node };

const Sheet = createSheet('TextField-Counter', {
  counter: {
    lineHeight: 1,
    height: 12,
  },
});

function Counter(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <Typography
          color="secondary"
          typography="caption"
          className={classes.counter}
        >
          {props.children}
        </Typography>
      )}
    </Sheet>
  );
}

export default Counter;
