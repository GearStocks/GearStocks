import React from 'react';
import Login from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';

export default class ConnectionComponent extends React.Component {
    render() {
        return (
            <Login navigation={this.props.navigation} />
        );
    }
}