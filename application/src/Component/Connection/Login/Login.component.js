import React from 'react';
import { View, Alert } from 'react-native';
import RegisterComponent from '../RegisterComponent';
import { Button, Input, Icon, Text } from 'react-native-elements';
import { strings, errors } from '../../../../config/strings';
import styles from './Login.component.style';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      login: false
    };
  }

  handleClick() {
    const { email, password } = this.state;

    if (`${email}` === '' && `${password}` === '')
      Alert.alert(errors.ERR, errors.ERR_EMAIL_PASSWORD);
    else if (`${email}` === '')
      Alert.alert(errors.ERR, errors.ERR_EMAIL);
    else if (`${password}` === '')
      Alert.alert(errors.ERR, errors.ERR_PASSWORD);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h2>Login</Text>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => this.password.focus() }
          blurOnSubmit={false}
          placeholder={styles.email}
          leftIcon={<Icon name='person' size={24} color='black' />}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          ref={(input) => { this.password = input; }}
          returnKeyType="go"
          placeholder={styles.password}
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title={strings.CONNECTION} type="outline" onPress={() => this.handleClick()} />
        <Button title={strings.REGISTER} type="outline" onPress={() => this.props.navigation.navigate('RegisterComponent')} />
      </View>
    );
  }
}
