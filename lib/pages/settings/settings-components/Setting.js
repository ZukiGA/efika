/* eslint-disable react-native/no-raw-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon2 from '@expo/vector-icons/Entypo';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Button, Dialog, List, Paragraph, Switch } from 'react-native-paper';
import { styles } from '../settings-styles/SettingsStyles';

let pressSetting = false;

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      chevron: 'chevron-thin-right',
      colorFontSetting: 'black',
      colorFontIcon: 'black',
      pressing: false,
      showPicker: false,
      mode: 'time',
      date: new Date(1598051730000),
      expanded: false,
      themeSwitch: false,
      visibleAlert: false,
    };
  }

  onToggleThemeSwitch = () => {
    this.setState({ themeSwitch: !this.state.themeSwitch });
  };

  handlePress = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  overlay = () => {
    this.setState({ active: true });
  };

  isRateVisible = () => {
    this.setState({ active: false });
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({ showPicker: false });
    this.setState({ date: currentDate });
  };

  pressingSetting = () => {
    pressSetting = !this.state.pressing;
    if (pressSetting) {
      this.setState({
        chevron: 'chevron-thin-up',
        colorFontSetting: '#6775C3',
        colorFontIcon: '#3F51B5',
      });
    } else {
      this.setState({
        chevron: 'chevron-thin-right',
        colorFontSetting: 'black',
      });
    }
    this.setState((prevState) => ({ pressing: prevState.pressing }));
  };

  hideDialog = () => this.setState({ visibleAlert: !this.state.visibleAlert });

  render() {
    return (
      <View>
        <List.Item
          title={this.props.item.text}
          left={(_props) => (
            <Icon
              name={this.props.item.icon}
              color={this.state.colorFontSetting}
              size={30}
            />
          )}
          right={(_props) => (
            <Icon2
              name={this.state.chevron}
              color="black"
              size={15}
              style={{ textAlignVertical: 'center' }}
            />
          )}
          onPress={this.pressingSetting}
          titleStyle={{
            color: this.state.colorFontSetting,
            fontWeight: 'bold',
          }}
          style={{ paddingVertical: 20 }}
        />
        {this.state.pressing && this.props.item.text === 'Account' ? (
          <List.Item
            title="Log out"
            right={(props) => (
              <Icon2
                name="chevron-thin-right"
                color="gray"
                size={10}
                style={{ textAlignVertical: 'center' }}
              />
            )}
            titleStyle={{ color: 'gray' }}
            onPress={() => this.setState({ visibleAlert: true })}
          />
        ) : null}
        <Overlay
          isVisible={this.state.visibleAlert}
          onBackdropPress={this.hideDialog}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to log out from your account?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this.hideDialog}>NO</Button>
            <Button onPress={this.props.logOut}>YES</Button>
          </Dialog.Actions>
        </Overlay>

        {this.state.pressing && this.props.item.text === 'Deadline' ? (
          <TouchableOpacity
            onPress={() =>
              this.setState({ showPicker: !this.state.show, mode: 'time' })
            }
          >
            <Text style={styles.date}>
              {' '}
              {this.state.date.getHours()}:{this.state.date.getMinutes()}{' '}
            </Text>
          </TouchableOpacity>
        ) : null}
        {this.state.showPicker ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour
            display="spinner"
            onChange={this.onChange}
          />
        ) : null}
        {this.state.pressing && this.props.item.text === 'Theme' ? (
          <List.Item
            title="Dark theme"
            right={(props) => (
              <Switch
                value={this.state.themeSwitch}
                onValueChange={this.onToggleThemeSwitch}
              />
            )}
            titleStyle={{ color: 'gray' }}
          />
        ) : null}
        {this.state.pressing && this.props.item.text === 'Notifications' ? (
          <List.Item title="First item" />
        ) : null}
        {this.state.pressing && this.props.item.text === 'More' ? (
          <List.Item title="Second item" />
        ) : null}
        {this.state.pressing && this.props.item.text === 'Rate us' ? (
          <Text> Cinco estrellas papi </Text>
        ) : null}
      </View>
    );
  }
}
