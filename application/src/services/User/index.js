import { Alert } from "react-native";

import disconnect from "./disconnect";
import connect from "./connect";
import register from "./register";
import userInfo from "./userInfo";
import updateUserInfo from "./updateUserInfo";
import forgotPassword from "./forgotPassword";

import { Updates } from "expo";

class User {
  constructor() {
    this.resetInfo();
  }

  isConnected() {
    return this.token != "";
  }

  resetInfo() {
    this.token = "";
    this.username = "";
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.birthday = "";
  }

  setInfo(res) {
    if (res.data.token) this.token = res.data.token;
    if (res.data.email) this.email = res.data.email;
    if (res.data.username) this.username = res.data.username;
    if (res.data.firstName) this.firstname = res.data.firstName;
    if (res.data.lastName) this.lastname = res.data.lastName;
    if (res.data.birthDay) this.birthday = res.data.birthDay;
  }

  disconnect() {
    if (this.isConnected()) {
      const JSONObj = JSON.stringify({
        email: this.email,
      });
      disconnect(JSONObj, callResetInfo).catch((err) => {
      });
    } else {
      Updates.reload();
    }
  }

  connect(JSONObj, navigate) {
      connect(
        JSONObj,
        navigate,
        callSetInfo
      ).catch((err) => {
        console.log(err);
        Alert.alert(
          err.name,
          //err.response.data.error,
          [{ text: "Fermer", onPress: () => null }],
          { cancelable: false }
        );
      });
  }

  userInfo() {
    if (this.isConnected()) {
      const JSONObj = JSON.stringify({
        userToken: this.token,
        email: this.email,
      });
      userInfo(JSONObj, callSetInfo).catch((err) => {
        //console.log(err.name, err.message, err.response.data.error);
      });
    } else {
      console.log("You are not connected");
    }
  }

  updateUserInfo(JSONObj) {
    if (this.isConnected()) {
      updateUserInfo(JSONObj, callUserInfo)
        .then((res) => {
          Alert.alert(
            "Success",
            "Your information are updated",
            [{ text: "Continue", onPress: () => null }],
            { cancelable: false }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("You are not connected");
    }
  }

  register(JSONObj, navigate) {
    register(JSONObj, navigate).catch((err) => {
      //console.log(err.name, err.message, err.response.data.error);
    });
  }

  forgotPassword(JSONObj, navigate) {
    forgotPassword(JSONObj, navigate).catch((err) => {
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
