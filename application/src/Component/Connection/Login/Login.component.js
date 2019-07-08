import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import strings from '../../../../config/strings';
import styles from './Login.component.style';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(event) {
    if (this.state.password == '') {
      console.log('mdr');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the login screen!</Text>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => this.password.focus() }
          blurOnSubmit={false}
          placeholder='Email'
          leftIcon={<Icon name='person' size={24} color='black' />}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          ref={(input) => { this.password = input; }}
          returnKeyType="go"
          placeholder='Password'
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title={strings.LOGIN} type="outline" onPress={() => this.handleClick('login')} />
      </View>
    )
  }
}

export default Login;