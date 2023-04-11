import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '../redux/actions';

const Auth = () => {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    console.log('UserInfo: ', userInfo);
  }, [userInfo]);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setCurrentUser(userInfo));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Error 1: ', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error 2: ', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Error 3: ', error);
      } else {
        // some other error happened
        console.log('Error 4: ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnStyle} onPress={googleLogin}>
        <Text>Google Login</Text>
      </TouchableOpacity>
      <GoogleSigninButton onPress={googleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    height: 48,
    paddingHorizontal: 8,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default Auth;
