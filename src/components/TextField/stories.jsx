// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
  select,
} from '@storybook/addon-knobs';
import PhoneIcon from 'mdi-react/PhoneIcon';

import Icon from '../Icon';

import TextField from '.';

type Props = { error: string };
type State = { value: string };

class Story extends React.PureComponent<Props, State> {
  static defaultProps = { error: '' };

  state = { value: '' };

  handleChange = (ev) => {
    this.setState({ value: ev.target.value });
  };

  render() {
    const hasError = this.state.value.length > 20;

    return (
      <TextField
        {...this.props}
        value={this.state.value}
        counter={`${this.state.value.length} / 20`}
        prefixIcon={(
          <Icon>
            <PhoneIcon />
          </Icon>
        )}
        error={hasError ? 'Maximal 20 Characters' : this.props.error}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('Text Fields', module)
  .add('TextField', () => (
    <Story
      label={text('Label', 'Label')}
      floatingLabel={boolean('Floating', true)}
      error={text('Error')}
      helperText={text('Helper Text')}
      placeholder={text('Placeholder', 'Placeholder')}
      disabled={boolean('Disabled', false)}
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
      prefix={text('Prefix', '')}
      suffix={text('Suffix', '')}
    />
  ));
