// @flow strict-local

import React from 'react';
import noop from 'lodash.noop';
import { storiesOf } from '@storybook/react';
import WifiIcon from 'mdi-react/WifiIcon';
import BluetoothIcon from 'mdi-react/BluetoothIcon';
import AccountIcon from 'mdi-react/AccountIcon';

import Icon from '../Icon';
import Avatar from '../Avatar';
import Switch from '../Switch';
import { getColor } from '../../styles/colors';

import List from '.';

const styles = { minWidth: 300 };
const avatar = (
  <Avatar
    type="name"
    size={40}
    bgColor={getColor('indigo')}
    style={{ margin: '8px 0' }}
  >
    HB
  </Avatar>
);

storiesOf('List', module)
  .add('Default List', () => (
    <List style={styles}>
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
      <List.Item>List item 3</List.Item>
      <List.Item>List item 4</List.Item>
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('List with subheader', () => (
    <List style={styles}>
      <List.Subheader>Subheader</List.Subheader>
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
      <List.Item>List item 3</List.Item>
      <List.Item>List item 4</List.Item>
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('List with dividers', () => (
    <List style={styles}>
      <List.Item>List item 1</List.Item>
      <List.Divider />
      <List.Item>List item 2</List.Item>
      <List.Divider />
      <List.Item>List item 3</List.Item>
      <List.Divider />
      <List.Item>List item 4</List.Item>
      <List.Divider />
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('Inset List with dividers', () => (
    <List style={styles}>
      <List.Item inset>List item 1</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 2</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 3</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 4</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 5</List.Item>
    </List>
  ))
  .add('Inset List with dividers and subheader', () => (
    <List style={styles}>
      <List.Subheader>SubHeader</List.Subheader>
      <List.Divider inset />
      <List.Item inset>List item 1</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 2</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 3</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 4</List.Item>
      <List.Divider inset />
      <List.Item inset>List item 5</List.Item>
    </List>
  ))
  .add('Inset List with icon', () => (
    <List style={styles}>
      <List.Item leftItem={<Icon><AccountIcon /></Icon>}>List item 1</List.Item>
      <List.Item leftItem={<Icon><AccountIcon /></Icon>}>List item 2</List.Item>
      <List.Item leftItem={<Icon><AccountIcon /></Icon>}>List item 3</List.Item>
      <List.Item leftItem={<Icon><AccountIcon /></Icon>}>List item 4</List.Item>
      <List.Item leftItem={<Icon><AccountIcon /></Icon>}>List item 5</List.Item>
    </List>
  ))
  .add('Inset List with Avatar', () => (
    <List style={styles}>
      <List.Item leftItem={avatar}>List item 1</List.Item>
      <List.Item leftItem={avatar}>List item 2</List.Item>
      <List.Item leftItem={avatar}>List item 3</List.Item>
      <List.Item leftItem={avatar}>List item 4</List.Item>
      <List.Item leftItem={avatar}>List item 5</List.Item>
    </List>
  ))
  .add('List with secondary text', () => (
    <List style={styles}>
      <List.Item secondaryContent="Secondary Text 2">List item 1</List.Item>
      <List.Item secondaryContent="Secondary Text 2">List item 2</List.Item>
      <List.Item secondaryContent="Secondary Text 2">List item 3</List.Item>
      <List.Item secondaryContent="Secondary Text 2">List item 4</List.Item>
      <List.Item secondaryContent="Secondary Text 2">List item 5</List.Item>
    </List>
  ))
  .add('List with secondary Action', () => (
    <List style={styles}>
      <List.Subheader>Settings</List.Subheader>
      <List.Item
        leftItem={(
          <Icon>
            <WifiIcon />
          </Icon>
        )}
        rightItem={(
          <Switch
            toggled
            onChange={noop}
          />
        )}
      >
        Wi-Fi
      </List.Item>
      <List.Item
        leftItem={(
          <Icon>
            <BluetoothIcon />
          </Icon>
        )}
        rightItem={(
          <Switch
            toggled={false}
            onChange={noop}
          />
        )}
      >
        Bluetooth
      </List.Item>
    </List>
  ));
