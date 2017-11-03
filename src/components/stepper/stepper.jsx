import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

import Section from './section';
import Headers from './headers';

/**
 * A component which renders a material design stepper.
 *
 * @class
 */
export class Stepper extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      stepper: PropTypes.string.isRequired,
      sectionContainer: PropTypes.string.isRequired,
      sectionWrapper: PropTypes.string.isRequired,
      headerAtBottom: PropTypes.string.isRequired,
    }).isRequired,
    children({ children }) { // eslint-disable-line react/require-default-props
      const childrenArray = Children.toArray(children);
      const hasNotSectionChild = childrenArray.some(child => child.type !== Section);

      if (hasNotSectionChild) {
        return new Error('The Stepper component only accepts StepperSection as children!');
      }

      if (childrenArray.length < 2) {
        return new Error('The Stepper is required to have at least 2 children');
      }

      return null;
    },
    header: PropTypes.func.isRequired,
    section: PropTypes.number.isRequired,
    headerProps: PropTypes.shape({}),
    className: PropTypes.string,
    headerAtBottom: PropTypes.bool,
  };

  static defaultProps = {
    headerProps: {},
    className: '',
    headerAtBottom: false,
  };

  static Section = Section;

  static Headers = Headers;

  static styles = {
    stepper: {
      composes: 'stepper',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },

    headerAtBottom: {
      composes: 'stepper--header-at-bottom',
      flexDirection: 'column-reverse',
    },

    sectionContainer: {
      composes: 'stepper--section-container',
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
      display: 'flex',
    },

    sectionWrapper: {
      composes: 'stepper--section-wrapper',
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      transition: 'transform 200ms',
    },
  };

  /**
   * Clamp the current section value.
   *
   * @returns {Number} - Returns the actual section.
   */
  clamp() {
    const max = Children.toArray(this.props.children).length - 1;

    return Math.max(0, Math.min(this.props.section, max));
  }

  /**
   * Render the passed header with some additional attributes.
   *
   * @returns {JSX} - Returns the header.
   */
  renderHeader() {
    const {
      header: Header,
      headerProps,
    } = this.props;

    return (
      <Header
        totalSections={Children.count(this.props.children)}
        currentSection={this.clamp()}
        {...headerProps}
      />
    );
  }

  render() {
    const {
      className,
      children,
      headerAtBottom,
      ...props
    } = this.props;

    return (
      <div
        className={classnames(
          this.props.classes.stepper,
          { [this.props.classes.headerAtBottom]: headerAtBottom },
          className,
        )}
        {...getNotDeclaredProps(props, Stepper)}
      >
        {this.renderHeader()}

        <div className={this.props.classes.sectionContainer}>
          <div
            className={this.props.classes.sectionWrapper}
            style={{ transform: `translateX(${this.clamp() * -100}%)` }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(Stepper.styles)(Stepper);
