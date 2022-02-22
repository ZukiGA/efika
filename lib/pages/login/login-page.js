/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getUser,
  login,
  loginAnon,
  updateEmail,
  updatePassword,
} from '../../actions/user';
import FocusAwareStatusBar from '../../components/focus-status-bar';
import fb from '../../database/connection';
import styles from './login-styles/login-styles';

const image = { uri: 'https://wallpaperset.com/w/full/4/6/3/105103.jpg' };

class LoginPage extends React.Component {
  componentDidMount() {
    const { props } = this;
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        props.getUser(user.uid);
      }
    });
  }

  logInMail = () => {
    const { props } = this;
    props.login();
  };

  logInAnon = () => {
    const { props } = this;
    props.loginAnon();
  };

  resetPassword = () => {
    try {
        fb.auth().sendPasswordResetEmail(this.props.user.email)
        alert("Se te ha enviado un correo.")
    } catch(e) {
        var errorCode = e.code;
  var errorMessage = e.message;
  
        if (errorCode === 'auth/wrong-password') {
            alert('Contraseña incorrecta.');
        } else if (errorCode === 'auth/user-not-found'){
            alert('Usuario no registrado');
        } else if (errorCode === 'auth/user-disabled') {
            alert('Tu cuenta ha sido deshabilitada')
        } else if (errorCode === 'auth/invalid-email' || errorCode === 'auth/argument-error'  ){
            alert('Ingresa un correo electrónico con el siguiente formato:\nalguien@ejemplo.com')
        } else {
            alert("Algo salió mal. Intenta de nuevo. :(")
  }
    }
}

  render() {
    const { props } = this;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={image}
          blurRadius={10}
        >
          <View style={styles.welcome}>
            <Text style={styles.title}> Welcome! </Text>

            <View style={styles.iconField}>
              <Icon name="email" size={30} color="black" />

              <TextInput
                onChangeText={(email) => props.updateEmail(email)}
                autoCompleteType="email"
                clearButtonMode="while-editing"
                returnKeyLabel="next"
                returnKeyType="next"
                placeholder="Email"
                placeholderTextColor="#58595c"
                style={styles.textInput}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.iconField}>
              <Icon name="lock" size={30} color="black" />

              <TextInput
                onChangeText={(password) => props.updatePassword(password)}
                autoCompleteType="password"
                clearButtonMode="while-editing"
                returnKeyLabel="done"
                returnKeyType="done"
                placeholder="Password"
                placeholderTextColor="#58595c"
                secureTextEntry
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity style={styles.alignItemsCenter} onPress={this.resetPassword}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.marginLogIn}>
              <TouchableOpacity
                activeOpacity={0.8}
                underlayColor="#ffffff"
                onPress={this.logInMail}
              >
                <View style={styles.buttonText}>
                  <Text style={styles.logInText}>LOG IN</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.horizontalLine} />
              <View style={styles.containerTextLogInWith}>
                <Text style={styles.textLogInWith}>OR LOG IN</Text>
              </View>
            </View>


            <TouchableOpacity
              style={styles.alignItemsCenter}
              onPress={this.logInAnon}
            >
              <Text style={styles.italicFont}>Anonymously</Text>
            </TouchableOpacity>

            <FocusAwareStatusBar />
          </View>
          <Text style={[styles.forgotPassword, styles.marginTopLittle]}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={styles.alignItemsCenter}
            onPress={() => props.navigation.navigate('SignUpScreen')}
          >
            <Text style={styles.signUpFree}>SIGN UP FOR FREE</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, loginAnon },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
