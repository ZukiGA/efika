import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../actions/user';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import icons from '../../data/settings-icons';
import fb from '../../database/connection';
import Setting from './settings-components/Setting';
import styles from './settings-styles/styles';

class SettingsPage extends React.Component {
  logOut = () => {
    const { props } = this;
    //TODO
    fb.auth().signOut().then(props.getUser('null'));
  };

  key = (item, index) => {
    return item.text + index;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar />
        <FlatList
          renderItem={({ item }) => (
            <Setting item={item} logOut={this.logOut} />
          )}
          data={icons}
          keyExtractor={(item, index) => this.key(item, index)}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
