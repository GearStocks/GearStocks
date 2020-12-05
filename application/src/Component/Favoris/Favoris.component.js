import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon, ListItem, Button } from "react-native-elements";
import { user } from "../../services/User";
import { routes } from "../../../config/routes";

const axios = require("axios");

export default class FavorisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateState();

    this.state = {
      res: "",
      favoris: "",
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
    if (user.isConnected()) {
      this.infoUser();
    }
  }

  componentDidBlur() {}

  infoUser = () => {
    const JSONObj = JSON.stringify({
      userToken: user.token,
      email: user.email,
    });
    axios
      .post(routes.INFO_USER, JSONObj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        this.setState({ res: res.data.bookmarks });
      })
      .catch((err) => {
        console.log(err.name, err.message);
        return err;
      });
  };

  updateState = () => {
    this.state = {};
  };

  render() {
    const { navigation } = this.props;

    if (this.state.res) {
      this.state.res.map((item, i) => console.log(item));
    }

    if (user.isConnected()) {
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
          <View style={{ top: "5%", position: "absolute" }}>
            <View style={{ alignSelf: "center", top: "10%" }}>
              <View
                style={{
                  flexDirection: "row",
                  top: 0,
                  position: "absolute",
                  alignSelf: "center",
                }}
              >
                <View style={{ right: 70 }}>
                  <Icon
                    name="format-align-justify"
                    size={30}
                    color="black"
                    onPress={() => {
                      this.props.navigation.openDrawer();
                    }}
                  />
                </View>
                <Text style={{ fontSize: 30, alignSelf: "center" }}>
                  Bookmark
                </Text>
              </View>
            </View>

            <View>
              {this.state.res
                ? this.state.res.map((item, i) => (
                    <View
                      style={{
                        alignSelf: "center",
                        top: "20%",
                        width: "90%",
                      }}
                    >
                      <Text></Text>
                      <TouchableOpacity onPress={() => console.log("test")}>
                        <Text
                          key={i}
                          style={{ textAlign: "center", fontSize: 15 }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                : null}
            </View>
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
              <Text
                style={{ textAlign: "center", padding: "10%", fontSize: 20 }}
              >
                If will be possible to find your favorites items if you are
                connected on our platfrom
              </Text>
              <Button
                title={"Sign up"}
                buttonStyle={{ width: "100%" }}
                type="outline"
                onPress={() => user.disconnect()}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}
