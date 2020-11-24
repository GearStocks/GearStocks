import { Alert } from 'react-native';

import disconnect from "./disconnect";
import connect from "./connect";
import register from "./register";
import userInfo from "./userInfo";
import updateUserInfo from "./updateUserInfo";
import forgotPassword from "./forgotPassword";

class User {

    constructor() {
        this.resetInfo();
    }

    isConnected() {
        return (this.token != '');
    }

    resetInfo() {
        this.token = '';
        this.username = '';
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.birthday = '';
    }

    setInfo(res) {
        if (res.data.token) this.token = res.data.token;
        if (res.data.data[0].email) this.email = res.data.data[0].mail;
        if (res.data.data[0].userName) this.username = res.data.data[0].userName;
        if (res.data.data[0].firstName) this.firstname = res.data.data[0].firstName;
        if (res.data.data[0].lastName) this.lastname = res.data.data[0].lastName;
        if (res.data.data[0].birthDay) this.birthday = res.data.data[0].birthDay;
    }
    
    disconnect() {
        if (this.isConnected()) {
            const JSONObj = JSON.stringify({
                email: this.email
            });
            disconnect(JSONObj, callResetInfo)
            .catch((err) => {
                //console.log(err.name, err.message, err.response.data.error);
            });
        } else {
            console.log("You are not connected");
        }
    }

    connect(JSONObj, navigate) {
        if (!this.isConnected()) {
            connect(JSONObj, navigate, callSetInfo)
            .catch((err) => {
                console.log(err);
                Alert.alert(
                    err.name,
                    //err.response.data.error,
                    [ { text: "Fermer", onPress: () => null} ],
                    { cancelable: false }
                )
            });
        } else {
            console.log("You are already connected");
        }
    }

    userInfo() {
        if (this.isConnected()) {
            const JSONObj = JSON.stringify({
                userToken: this.token,
                mail: this.email
            });
            userInfo(JSONObj, callSetInfo)
            .catch((err) => {
                //console.log(err.name, err.message, err.response.data.error);
            });
        } else {
            console.log("You are not connected");
        }
    }

    updateUserInfo(JSONObj) {
        if (this.isConnected()) {
            updateUserInfo(JSONObj, callUserInfo)
            .catch((err) => {
                console.log(err);
            });
        } else {
            console.log("You are not connected");
        }
    }

    register(JSONObj, navigate) {
        register(JSONObj, navigate)
        .catch((err) => {
            //console.log(err.name, err.message, err.response.data.error);
        });
    }

    forgotPassword(JSONObj, navigate) {
        forgotPassword(JSONObj, navigate)
        .catch((err) => {
            //console.log(err.name, err.message, err.response.data.error);
        });
    }
}


var user;

function callUserInfo() {
    user.userInfo();
}

function callSetInfo(res) {
    user.setInfo(res);
}

function callResetInfo() {
    user.resetInfo();
}

function instanciateUser() {
    user = new User();
}

export { user, instanciateUser };