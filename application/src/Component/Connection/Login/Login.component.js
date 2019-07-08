import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import strings from '../../../../config/strings';
import styles from './Login.component.style';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the login screen!</Text>
        <Button title={strings.LOGIN} type="outline" />
      </View>
    )
  }
}

export default Login;