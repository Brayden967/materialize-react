// @flow strict

import React from 'react';
import EventListener from 'react-event-listener';
import getNotDeclaredProps from 'react-get-not-declared-props';

import {
  getCoords,
  clamp, mergeClassNames,
} from '../../utils/react';

import Sheet, { type Data } from './Sheet';

type Props = {
  value: number,
  onChange: (value: number) => void,
  disabled: boolean,
  className: string,
};
type State = {
  isDragging: boolean,
  translateX: number,
  isFocused: boolean,
};

export default class Slider extends React.PureComponent<Props, State> {
  static defaultProps = {
    disabled: false,
    className: '',
  };

  static keyCodes: Map<number, number> = new Map([
    [37, -2],
    [38, 2],
    [39, 2],
    [40, -2],
  ]);

  static clamp(value: number): number {
    return clamp({
      value,
      min: 0,
      max: 100,
    });
  }

  state = {
    isDragging: false,
    translateX: 0,
    isFocused: false,
  };

  componentDidMount() {
    if (this.root.current) {
      this.rootRect = this.root.current.getBoundingClientRect();

      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ translateX: this.computeTranslate() });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ translateX: this.computeTranslate() });
    }
  }

  root = React.createRef();

  rootRect: ClientRect;

  computeTranslate(): number {
    return this.rootRect.width * Slider.clamp(this.props.value) / 100;
  }

  computeNewValue(ev: SyntheticMouseEvent<HTMLElement> | SyntheticTouchEvent<HTMLElement>): number {
    const coords = getCoords(ev);

    return coords
      ? (coords.x - this.rootRect.left + 4) / this.rootRect.width * 100
      : this.props.value;
  }

  get thumbTransform(): string {
    return mergeClassNames(
      `translateX(${this.state.translateX}px)`,
      this.state.isDragging && 'scale(1.5)',
      this.props.disabled && 'scale(0.75)',
    );
  }

  handleThumbPress = () => {
    this.setState({ isDragging: true });
  };

  handleThumbRelease = () => {
    this.setState({ isDragging: false });
  };

  handleKeyDown = (ev: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (Slider.keyCodes.has(ev.keyCode)) {
      this.props.onChange(Slider.clamp(this.props.value + Slider.keyCodes.get(ev.keyCode)));
    }
  };

  handleMove = (ev: SyntheticMouseEvent<HTMLElement> | SyntheticTouchEvent<HTMLElement>) => {
    ev.preventDefault();

    if (this.state.isDragging) {
      this.props.onChange(this.computeNewValue(ev));
    }
  };

  handleClick = (ev: SyntheticMouseEvent<HTMLSpanElement>) => {
    this.props.onChange(this.computeNewValue(ev));
  };

  handleResize = () => {
    if (this.root.current) {
      this.rootRect = this.root.current.getBoundingClientRect();

      this.setState({ translateX: this.computeTranslate() });
    }
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const value = Slider.clamp(this.props.value);
    const data: Data = {
      thumbTransform: this.thumbTransform,
      isActive: this.props.value > 0,
      disabled: this.props.disabled,
      value,
      isFocused: this.state.isFocused,
    };

    return (
      <EventListener
        target="window"
        onMouseMove={this.handleMove}
        onMouseUp={this.handleThumbRelease}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleThumbRelease}
        onResize={this.handleResize}
      >
        <Sheet data={data}>
          {({ classes }) => (
            <div
              {...getNotDeclaredProps(this.props, Slider)}
              className={`${classes.slider} ${this.props.className}`}
              ref={this.root}
              role="slider"
              tabIndex={this.props.disabled ? -1 : 0}
              aria-disabled={this.props.disabled}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            >
              <span
                className={classes.track}
                onClick={this.handleClick}
              />

              <span
                className={classes.thumb}
                onMouseDown={this.handleThumbPress}
                onTouchStart={this.handleThumbPress}
              />
            </div>
          )}
        </Sheet>
      </EventListener>
    );
  }
}