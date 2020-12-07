/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:19:32 pm
 * @copyright GearStocks
 */

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Button, Input, Icon, Text } from "react-native-elements";

import { strings, errors } from "../../../../config/strings";
import colors from "../../../../config/colors";
import styles from "./Login.component.style";
import { user } from "../../../services/User";

/* eslint-disable no-undef */
/* eslint-disable no-console */

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorEmail: "",
      errorPassword: "",
      hidePassword: true,
    };

    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.componentWillFocus();
      }
    );
    this.didBlurListener = this.props.navigation.addListener("didBlur", () => {
      this.componentDidBlur();
    });
  }

  componentWillFocus() {
    this.resetInfo();
  }

  componentDidBlur() {}

  resetInfo() {
    this.token = '';
    this.username = '';
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.birthday = '';
}

resetInfo2(navigate) {
  this.token = '';
    this.username = '';
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.birthday = '';
    navigate('AppMenu')
}

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  checkError = (navigate) => {
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = this.state;

    const JSONObj = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      rememberMe: true,
    });

    if (`${email}` === "" && `${password}` === "") {
      this.setState({ errorEmail: errors.ERR_ADDRESS });
      this.setState({ errorPassword: errors.ERR_PASSWORD });
    } else if (`${email}` === "") {
      this.setState({ errorEmail: errors.ERR_ADDRESS });
      this.setState({ errorPassword: "" });
    } else if (reg.test(`${email}`) === false) {
      this.setState({ errorEmail: errors.ERR_INVALID_EMAIL });
      this.setState({ errorPassword: "" });
    } else if (`${password}` === "") {
      this.setState({ errorEmail: "" });
      this.setState({ errorPassword: errors.ERR_PASSWORD });
    } else {
      this.setState({ errorEmail: "" });
      this.setState({ errorPassword: "" });
      user.connect(JSONObj, navigate);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>GearStocks</Text>
        <Input
          inputStyle={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          label="Email"
          labelStyle={{ bottom: 10 }}
          returnKeyType="next"
          errorStyle={{ fontSize: 18 }}
          inputContainerStyle={{
            borderColor: colors.PRIMARY_COLOR,
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
          }}
          containerStyle={{ top: 20 }}
          errorMessage={this.state.errorEmail}
          onSubmitEditing={() => this.password.focus()}
          blurOnSubmit={false}
          placeholder={strings.EMAIL}
          leftIcon={<Icon name="mail" size={24} color="black" />}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          ref={(input) => {
            this.password = input;
          }}
          inputStyle={styles.input}
          returnKeyType="go"
          autoCapitalize="none"
          errorStyle={{ fontSize: 18 }}
          containerStyle={{ top: 50 }}
          label="Password"
          labelStyle={{ bottom: 10, left: 10 }}
          inputContainerStyle={{
            borderColor: colors.PRIMARY_COLOR,
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
          }}
          errorMessage={this.state.errorPassword}
          placeholder={strings.PASSWORD}
          secureTextEntry={this.state.hidePassword}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          rightIcon={
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.visibilityBtn}
              onPress={this.managePasswordVisibility}
            >
              <Image
                source={
                  this.state.hidePassword
                    ? require("../../../../assets/hide.png")
                    : require("../../../../assets/view.png")
                }
                style={styles.btnImage}
              />
            </TouchableOpacity>
          }
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          title={strings.FORGOT_PASSWORD}
          buttonStyle={styles.forgetPassword}
          type="clear"
          onPress={() => navigate("ForgotPasswordComponent")}
        />
        <Button
          title={"Continue without Log In"}
          buttonStyle={styles.button}
          type="outline"
          onPress={() => this.resetInfo2(navigate)}
        />
        <Button
          title={strings.LOGIN}
          buttonStyle={styles.button}
          type="outline"
          onPress={() => this.checkError(navigate)}
        />
        <Button
          title={strings.REGISTER}
          buttonStyle={styles.button}
          type="outline"
          onPress={() => navigate("RegisterComponent")}
        />
      </View>
    );
  }
}