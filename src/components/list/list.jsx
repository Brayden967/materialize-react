import React, { Children } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

import ListSubheader from './list-subheader';
import ListDivider from './list-divider';
import ListItem from './list-item';

/**
 * The main list component.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes for the component provided by Jss.
 * @param {JSX} props.children - The children for the list.
 * @param {Boolean} props.inset - Whether or not the list items should be inset.
 * @param {String} props.className - An additional class name for the list.
 * @returns {JSX} - Returns the JSX.
 */
export function List({
  classes,
  children,
  inset,
  className,
  ...props
}) {
  const clonedChildren = Children.map(children, (child) => {
    if (child.type === ListSubheader) {
      return child;
    }

    return React.cloneElement(child, { inset });
  });

  return (
    <ul
      className={`${classes.list} ${className}`}
      {...getNotDeclaredProps(props, List)}
    >
      {clonedChildren}
    </ul>
  );
}

const validListChildren = [
  ListSubheader,
  ListDivider,
  ListItem,
];

List.propTypes = {
  classes: PropTypes.shape({ list: PropTypes.string.isRequired }).isRequired,
  children({ children }) { // eslint-disable-line react/require-default-props
    const childrenArray = Children.toArray(children);

    if (childrenArray.length === 0) {
      return new Error('Children are required for the List component!');
    }

    const hasNonListChild = childrenArray.some(child => !validListChildren.includes(child.type));

    if (hasNonListChild) {
      return new Error('Found non valid children inside List!');
    }

    return null;
  },
  inset: PropTypes.bool,
  className: PropTypes.string,
};

List.defaultProps = {
  inset: false,
  className: '',
};

List.styles = ({ list: theme }) => {
  return {
    list: {
      composes: 'list',
      margin: 0,
      padding: `${theme.verticalPadding}px 0`,
      listStyleType: 'none',
    },
  };
};

List.Subheader = ListSubheader;
List.Divider = ListDivider;
List.Item = ListItem;

export default injectSheet(List.styles)(List);