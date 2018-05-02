// @flow strict

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  error: Node,
  children: Node,
};

const Sheet = createSheet('HelperText', {
  helperText: {
    fontSize: 12,
    lineHeight: 1,
    height: 12,
    flex: 1,
    paddingRight: 5,
  },
});

function HelperText(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <Typography
          color={props.error === null ? 'secondary' : 'error'}
          typography="body"
          className={classes.helperText}
        >
          {props.error === null ? props.children : props.error}
        </Typography>
      )}
    </Sheet>
  );
}

export default HelperText;