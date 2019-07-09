import React from 'react';
import Login from './Login/Login.component';
import { RegisterComponent } from './RegisterComponent';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';

export default class ConnectionComponent extends React.Component {
    render() {
        return (
            <Login />
        )
    }
}