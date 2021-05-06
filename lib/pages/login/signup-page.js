/* eslint-disable object-curly-newline */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FocusStatusBar from '../../components/focus-status-bar';
import {
  getUser,
  signup,
  updateEmail,
  updateLoading,
  updatePassword,
  updateUsername,
} from '../../actions/user';
import Alert from '../../components/alert';
import styles from './login-styles/signup-styles';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDialog: false,
      dialogMessage: 'Please fill all fields',
    };
  }

  componentDidMount() {
    const { setPassword, setEmail, setUsername, setLoading } = this.props;
    setPassword('');
    setEmail('');
    setUsername('');
    setLoading(false);
  }

  handleSubmitButton = () => {
    const { user, signUp } = this.props;
    if (!user.username) {
      this.setState({ activeDialog: true, dialogMessage: 'Please fill Name' });
      return;
    }
    if (!user.email) {
      this.setState({ activeDialog: true, dialogMessage: 'Please fill Email' });
      return;
    }
    if (!user.password) {
      this.setState({
        activeDialog: true,
        dialogMessage: 'Please fill Password',
      });
      return;
    }
    // Show Loader
    signUp();
  };

  hideDialog = () => {
    this.setState({ activeDialog: false });
  };

  render() {
    const { setUsername, setPassword, setEmail } = this.props;
    const { activeDialog, dialogMessage } = this.state;
    return (
      <View style={styles.signUpContainer}>
        <FocusStatusBar />
        <Text style={styles.signUpTitle}> Sign up </Text>
        <View>
          <View style={styles.SectionStyle}>
            <Entypo name="user" size={30} color="#3ec1d3" />

            <TextInput
              style={styles.inputStyle}
              onChangeText={(username) => setUsername(username)}
              placeholder="Username"
              placeholderTextColor="#3ec1d3"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <MaterialCommunityIcons name="email" size={30} color="#3ec1d3" />

            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => setEmail(email)}
              placeholder="Email"
              placeholderTextColor="#3ec1d3"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <MaterialCommunityIcons name="lock" size={30} color="#3ec1d3" />

            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) => setPassword(password)}
              placeholder="Password"
              placeholderTextColor="#3ec1d3"
              returnKeyType="next"
              secureTextEntry
              blurOnSubmit={false}
            />
          </View>
        </View>
        <Alert
          visibleAlert={activeDialog}
          hideDialog={this.hideDialog}
          message={dialogMessage}
          accept={this.hideDialog}
          noActive={false}
          noMessage="NO"
          yesMessage="OK"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={this.handleSubmitButton}
        >
          <Text style={styles.buttonTextStyle}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.signUpWith}> YOU CAN ALSO SIGN UP WITH </Text>

        <View style={styles.spaceEvenlyRow}>
          <TouchableOpacity activeOpacity={0.8} underlayColor="#ffffff">
            <View style={styles.buttonText2}>
              <MaterialCommunityIcons name="google" size={40} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} underlayColor="#ffffff">
            <View style={styles.buttonText2}>
              <MaterialCommunityIcons
                name="facebook"
                size={40}
                color="#3b5998"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setEmail: updateEmail,
      setPassword: updatePassword,
      setUsername: updateUsername,
      setLoading: updateLoading,
      signUp: signup,
      userToken: getUser,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
