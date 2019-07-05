import { LoginComponent } from './LoginComponent'
import React from 'react';
import { Text, View } from 'react-native'
import { RegisterComponent } from './RegisterComponent'
import { ForgotPasswordComponent } from './ForgotPasswordComponent'


export class ConnectionComponent extends React.Component {
    constructor(props) {
        super(props);
      }
      render() {
          return (
              <LoginComponent />,
              <RegisterComponent />,
              <ForgotPasswordComponent />
          )
      };
};