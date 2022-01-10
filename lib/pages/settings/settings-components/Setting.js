/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-native/no-raw-text */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// eslint-disable-next-line object-curly-newline
import { List, Switch } from 'react-native-paper';
import { Translation } from 'react-i18next';
import i18n from '../../../translations/translation'

import Alert from '../../../components/alert';

import styles from '../settings-styles/styles';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chevron: 'chevron-thin-right',
      colorFontSetting: 'black',
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
    this.setState((prevState) => ({ themeSwitch: !prevState.themeSwitch }));
  };

  handlePress = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  onChange = (event, selectedDate) => {
    const { date } = this.state;
    const currentDate = selectedDate || date;
    this.setState({ showPicker: false });
    this.setState({ date: currentDate });
  };

  pressingSetting = () => {
    const { pressing } = this.state;
    if (!pressing) {
      this.setState({
        chevron: 'chevron-thin-up',
        colorFontSetting: '#6775C3',
      });
    } else {
      this.setState({
        chevron: 'chevron-thin-right',
        colorFontSetting: 'black',
      });
    }
    this.setState((prevState) => ({ pressing: !prevState.pressing }));
  };

  hideDialog = () => {
    this.setState((prevState) => ({ visibleAlert: !prevState.visibleAlert }));
  };

  render() {
    const { item, logOut } = this.props;
    const {
      colorFontSetting,
      chevron,
      pressing,
      visibleAlert,
      show,
      date,
      showPicker,
      mode,
      themeSwitch,
    } = this.state;
    return (
      <Translation>
        {(t) => (
        <View>
          <List.Item
            title={t(item.text)}
            left={() => (
              <MaterialCommunityIcons
                name={item.icon}
                color={colorFontSetting}
                size={30}
              />
            )}
            right={() => (
              <Entypo
                name={chevron}
                color="black"
                size={15}
                style={styles.EntypoIcon}
              />
            )}
            onPress={this.pressingSetting}
            titleStyle={[
              styles.boldFont,
              {
                color: colorFontSetting,
              },
            ]}
            style={styles.littlePaddingVertical}
          />
          {pressing && item.text === 'Account' ? (
            <List.Item
              title={t("Log out")}
              right={() => (
                <Entypo
                  name="chevron-thin-right"
                  color="gray"
                  size={10}
                  style={styles.textAlignVerticalCenter}
                />
              )}
              titleStyle={styles.fontGray}
              onPress={() => this.setState({ visibleAlert: true })}
            />
          ) : null}
          <Alert
            visibleAlert={visibleAlert}
            hideDialog={this.hideDialog}
            message={t("Log out alert")}
            accept={logOut}
            noActive
            noMessage="NO"
            yesMessage={t("YES")}
          />

          {pressing && item.text === 'Deadline' ? (
            <TouchableOpacity
              onPress={() => this.setState({ showPicker: !show, mode: 'time' })}
            >
              <Text style={styles.date}>
                {' '}
                {date.getHours()}:{date.getMinutes()}{' '}
              </Text>
            </TouchableOpacity>
          ) : null}
          {showPicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour
              display="spinner"
              onChange={this.onChange}
            />
          ) : null}
          {pressing && item.text == 'Languages' ? (
            <View>
              <List.Item 
                title="English"
                onPress={() => i18n.changeLanguage('en')} />
              <List.Item 
                title="Español"
                onPress={() => i18n.changeLanguage('es')} />
            </View>
          ) : null}
          {pressing && item.text === 'Theme' ? (
            <List.Item
              title={t("Dark theme")}
              right={() => (
                <Switch
                  value={themeSwitch}
                  onValueChange={this.onToggleThemeSwitch}
                />
              )}
              titleStyle={styles.fontGray}
            />
          ) : null}
          {pressing && item.text === 'Notifications' ? (
            <List.Item title="First item" />
          ) : null}
          {pressing && item.text === 'More' ? (
            <List.Item title="Second item" />
          ) : null}
          {pressing && item.text === 'Rate us' ? (
            <Text> Cinco estrellas papi </Text>
          ) : null}
        </View>
        )}
      </Translation>
    );
  }
}
