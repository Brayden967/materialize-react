// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';
import Typography from '../Typography';

type Props = {
  children: Node,
  className: string,
  avatar: Node,
  subtitle: Node,
};
type Data = { withAvatar: boolean };

const Sheet = createSheet('Card-Header', {
  header: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    padding: '0 16px',
    margin: (data: Data) => (data.withAvatar ? '16px 0' : '24px 0 16px'),

    '&:last-child': { marginBottom: (data: Data) => (data.withAvatar ? null : 24) },
  },

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: { lineHeight: (data: Data) => (data.withAvatar ? '20px' : 1) },

  subtitle: {
    lineHeight: (data: Data) => (data.withAvatar ? '20px' : 1),
    paddingTop: (data: Data) => (data.withAvatar ? 0 : 12),
  },

  avatar: {
    height: 40,
    width: 40,
    marginRight: 16,
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
  },
});

function Header(props: Props) {
  const withAvatar = Boolean(props.avatar);
  const data: Data = { withAvatar };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <header
          className={`${classes.header} ${props.className}`}
          {...getNotDeclaredProps(props, Header)}
        >
          {withAvatar && (
            <span className={classes.avatar}>
              {props.avatar}
            </span>
          )}

          <div className={classes.container}>
            <Typography
              truncate
              typography={withAvatar ? 'headline6' : 'headline5'}
              className={classes.title}
            >
              {props.children}
            </Typography>

            {props.subtitle && (
              <Typography
                truncate
                color="secondary"
                typography="body2"
                className={classes.subtitle}
              >
                {props.subtitle}
              </Typography>
            )}
          </div>
        </header>
      )}
    </Sheet>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  avatar: PropTypes.node,
  subtitle: PropTypes.node,
};

Header.defaultProps = {
  subtitle: null,
  avatar: null,
  className: '',
};

export default Header;
