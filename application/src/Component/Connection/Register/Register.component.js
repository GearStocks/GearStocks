import React from 'react';
import { View, Alert } from 'react-native';
import { Input, Text, Icon } from 'react-native-elements';
import { strings, errors } from '../../../../config/strings';
import styles from './Register.component.style';

export default class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      login: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h2>Register</Text>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          onSubmitEditing={() => this.firstname.focus()}
          ref={(input) => { this.username = input; }}
          placeholder={strings.USERNAME}
          onChangeText={(username) => this.setState({ username })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          ref={(input) => { this.firstname = input; }}
          onSubmitEditing={() => this.lastname.focus()}
          placeholder={strings.FIRSTNAME}
          onChangeText={(firstname) => this.setState({ firstname })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          onSubmitEditing={() => this.email.focus()}
          ref={(input) => { this.lastname = input; }}
          placeholder={strings.LASTNAME}
          onChangeText={(lastname) => this.setState({ lastname })}
        />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          ref={(input) => { this.email = input; }}
          onSubmitEditing={() => this.password.focus()}
          blurOnSubmit={false}
          placeholder={strings.EMAIL}
          leftIcon={<Icon name='person' size={24} color='black' />}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          ref={(input) => { this.password = input; }}
          returnKeyType="go"
          placeholder={strings.PASSWORD}
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color='black' />}
          onChangeText={(password) => this.setState({ password })}
        />
      </View>
    );
  }
}