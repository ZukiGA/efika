import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../actions/user';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { icons } from '../../data/iconsData';
import fb from '../../database/connection';
import Setting from './settings-components/Setting';
import { styles } from './settings-styles/SettingsStyles';

class SettingsPage extends React.Component {
  logOut = () => {
    // eslint-disable-next-line no-shadow
    const { props } = this;
    fb.auth().signOut().then(props.getUser('null'));
  };

  key = (item, index) => {
    return item.text + index;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
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
