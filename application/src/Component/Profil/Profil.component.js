/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:23:11 am
 * @copyright GearStocks
 */

import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, Button, Icon, Input } from "react-native-elements";

import styles from "./Profil.component.style";
import { strings, errors } from "../../../config/strings";
import colors from "../../../config/colors";
import LoginComponent from "../Connection/Login/Login.component";
import { user } from "../../services/User";

export default class ProfilComponent extends React.Component {
  componentDidMount() {
    const JSONObj = {
      email: user.email,
      userToken: user.token,
    };
    user.userInfo(JSONObj);
  }

  constructor(props) {
    super(props);
    this.updateState();
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  updateState = () => {
    this.state = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: "",
      newPassword: "",
      confirmPassword: "",
      birthday: user.birthday,
      errorUsername: "",
      errorFirstname: "",
      errorLastname: "",
      errorEmail: "",
      errorPassword: "",
      errorNewPassword: "",
      errorConfirmPassword: "",
      hidePassword: true,
    };
  };

  checkError = () => {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      newPassword,
      confirmPassword,
      birthday,
    } = this.state;
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (`${username}` === "")
      this.setState({ errorUsername: errors.ERR_USERNAME });
    if (`${firstname}` === "")
      this.setState({ errorFirstname: errors.ERR_FIRSTNAME });
    if (`${lastname}` === "")
      this.setState({ errorLastname: errors.ERR_LASTNAME });
    if (`${email}` === "") this.setState({ errorEmail: errors.ERR_EMAIL });
    if (reg.test(`${email}`) === false)
      this.setState({ errorEmail: errors.ERR_INVALID_EMAIL });
    if (`${password}` || `${confirmPassword}` || `${password}`) {
      if (`${password}` === "") {
        this.setState({ errorPassword: errors.ERR_PASSWORD });
      } else if (`${newPassword}` !== `${confirmPassword}`) {
        this.setState({ errorNewPassword: errors.ERR_MATCH_PASSWORD });
      } else {
        this.updateInfoUser();
      }
    } else {
      this.updateInfoUser();
    }
  };

  updateInfoUser = () => {
    const JSONObj = JSON.stringify({
      userToken: user.token,
      email: this.state.email != user.email ? this.state.email : "",
      username: this.state.username != user.username ? this.state.username : "",
      password:
        this.state.newPassword != this.state.password
          ? this.state.newPassword
          : "",
      firstName:
        this.state.firstname != user.firstname ? this.state.firstname : "",
      lastName: this.state.lastname != user.lastname ? this.state.lastname : "",
    });
    user.updateUserInfo(JSONObj);
    this.updateState();
  };

  render() {
    if (user.isConnected()) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, top: "15%" }}>
            <Text style={{ fontSize: 24 }}>GearStocks</Text>
            <View style={{ position: "absolute", right: "50%" }}>
              <Icon
                name="format-align-justify"
                size={30}
                color="black"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            </View>
          </View>
          <View style={{ width: "100%", flex: 1, bottom: "30%" }}>
            <Input
              defaultValue={user.username}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              errorMessage={this.state.errorUsername}
              errorStyle={{ fontSize: 13 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.firstname.focus()}
              ref={(input) => {
                this.username = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              placeholder={strings.USERNAME}
              onChangeText={(username = this.state.username) =>
                this.setState({ username })
              }
            />
            <Input
              defaultValue={user.email}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              errorMessage={this.state.errorEmail}
              containerStyle={{ top: 5 }}
              errorStyle={{ fontSize: 13 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.firstname.focus()}
              ref={(input) => {
                this.email = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              placeholder={strings.EMAIL}
              onChangeText={(email = this.state.email) =>
                this.setState({ email })
              }
            />
            <Input
              defaultValue={user.firstname}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              containerStyle={{ top: 10 }}
              errorMessage={this.state.errorFirstname}
              errorStyle={{ fontSize: 13 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.firstname.focus()}
              ref={(input) => {
                this.firstname = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              placeholder={strings.FIRSTNAME}
              onChangeText={(firstname = this.state.firstname) =>
                this.setState({ firstname })
              }
            />
            <Input
              defaultValue={user.lastname}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              errorMessage={this.state.errorLastname}
              containerStyle={{ top: 15 }}
              errorStyle={{ fontSize: 13 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.lastname.focus()}
              ref={(input) => {
                this.lastname = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              placeholder={strings.LASTNAME}
              onChangeText={(lastname = this.state.lastname) =>
                this.setState({ lastname })
              }
            />

            <Input
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              errorMessage={this.state.errorPassword}
              errorStyle={{ fontSize: 13 }}
              containerStyle={{ top: 20 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.password.focus()}
              ref={(input) => {
                this.password = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              secureTextEntry={this.state.hidePassword}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={this.managePasswordVisibility}
                >
                  <Image
                    source={
                      this.state.hidePassword
                        ? require("../../../assets/hide.png")
                        : require("../../../assets/view.png")
                    }
                    style={{
                      width: 24,
                      height: 24,
                      right: 10,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              }
              placeholder={strings.PASSWORD}
              onChangeText={(password = this.state.password) =>
                this.setState({ password })
              }
            />
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              containerStyle={{ top: 25 }}
              errorMessage={this.state.errorNewPassword}
              secureTextEntry={this.state.hidePassword}
              errorStyle={{ fontSize: 13 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.newPassword.focus()}
              ref={(input) => {
                this.newPassword = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              placeholder="New Password"
              secureTextEntry={this.state.hidePassword}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={this.managePasswordVisibility}
                >
                  <Image
                    source={
                      this.state.hidePassword
                        ? require("../../../assets/hide.png")
                        : require("../../../assets/view.png")
                    }
                    style={{
                      width: 24,
                      height: 24,
                      right: 10,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              }
              onChangeText={(newPassword = this.state.newPassword) =>
                this.setState({ newPassword })
              }
            />
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              containerStyle={{ top: 30 }}
              errorMessage={this.state.errorConfirmPassword}
              errorStyle={{ fontSize: 13 }}
              inputContainerStyle={{
                borderColor: colors.PRIMARY_COLOR,
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}
              onSubmitEditing={() => this.confirmPassword.focus()}
              ref={(input) => {
                this.confirmPassword = input;
              }}
              leftIcon={<Icon name="person" size={24} color="black" />}
              placeholder="Confirm Password"
              secureTextEntry={this.state.hidePassword}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={this.managePasswordVisibility}
                >
                  <Image
                    source={
                      this.state.hidePassword
                        ? require("../../../assets/hide.png")
                        : require("../../../assets/view.png")
                    }
                    style={{
                      width: 24,
                      height: 24,
                      right: 10,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              }
              onChangeText={(confirmPassword = this.state.confirmPassword) =>
                this.setState({ confirmPassword })
              }
            />

            <Button
              title="Update informations"
              buttonStyle={{ width: "100%", top: "10%" }}
              type="outline"
              onPress={() => this.checkError()}
            />
            <Button
              title={strings.DISCONNECT}
              buttonStyle={{ width: "100%", top: "12%" }}
              type="outline"
              onPress={() => user.disconnect()}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              top: "5%",
              position: "absolute",
              left: 20,
              flexDirection: "row",
            }}
          >
            <Icon
              name="format-align-justify"
              size={30}
              color="black"
              containerStyle={{ right: "40%" }}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
            <Text style={{ fontSize: 24 }}>GearStocks</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center", padding: "10%", fontSize: 20 }}>
              It will be possible to access in your profil if you are connected
              on our platfrom
            </Text>
            <Button
              title={"Sign up"}
              buttonStyle={{ width: "100%" }}
              type="outline"
              onPress={() => user.disconnect()}
            />
          </View>
        </View>
      );
    }
  }
}
