import Login from './Login/Login.component'
import React from 'react';
import { RegisterComponent } from './RegisterComponent'
import { ForgotPasswordComponent } from './ForgotPasswordComponent'

export default class ConnectionComponent extends React.Component {
    constructor(props) {
        super(props);
      }
      render() {
          return (
              <Login />
              /*<RegisterComponent />,
              <ForgotPasswordComponent />*/
          )
      }
}