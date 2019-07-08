import React from 'react';
import { Text, View } from 'react-native';
import styles from './Login.component.style';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the login screen!</Text>
      </View>
    )
  }
}

export default Login;