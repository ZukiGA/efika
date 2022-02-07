import React from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../../actions/user';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import icons from '../../data/settings-icons';
import fb from '../../database/connection';
import Setting from './settings-components/Setting';
// import * as StoreReview from 'expo-store-review';
import * as Linking from 'expo-linking';
import styles from './settings-styles/styles';

import { Translation } from 'react-i18next';

class SettingsPage extends React.Component {
  logOut = () => {
    const { props } = this;
    //TODO
    fb.auth().signOut().then(props.logOut());
  };

  key = (item, index) => {
    return item.text + index;
  };


  rateApp = () => {
    const androidPackageName = 'com.efika';
    // Open the Android Play Store in the browser -> redirects to Play Store on Android
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
    );
    // Open the Android Play Store directly
    // Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);

  }
  render() {
    return (
      <Translation>
      {(t, { i18 }) => (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar />
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("Settings")}</Text>
          </View>
        </View>
        <View style={styles.headerLine}/>
        <FlatList
          renderItem={({ item }) => (
            <Setting item={item} logOut={this.logOut} rateApp={this.rateApp} />
          )}
          data={icons}
          keyExtractor={(item, index) => this.key(item, index)}
        />
      </SafeAreaView>
            )}
            </Translation>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logOut }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
