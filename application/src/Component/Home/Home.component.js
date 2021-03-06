/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:15:57 am
 * @copyright GearStocks
 */

import React from "react";
import {
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import { routes } from "../../../config/routes";

import { listParts } from "../../services/Search";
import { user } from "../../services/User";

const axios = require("axios");

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      response: [],
      namePart: "",
      randomPart: [
        "Condensateur (pour allumeur en acier ou alu)  pour 356 pré-a - 1950 - 1100 (369) - Cabrio pré a - Boite manuelle 4 vitesses",
        "Support transv. pont AR  pour 356 pré-a - 1950 - 1100 (369) - Cabrio pré a - Boite manuelle 4 vitesses",
        "testststs",
        "eldfpvloedkfvokeod",
        "qwjsdicjwiedbfci",
      ],
      randomOne: null,
      randomTwo: null,
      randomThree: null,
    };
  }

  updateSearch = (search) => {
    //    this.setState({ search });
    this.launchSearch(search);
  };

  launchSearch = (search) => {
    const JSONObj = JSON.stringify({
      keyWord: search,
      filters: {
        maxPrice: "",
        minPrice: "",
        category: "",
        model: "",
      },
    });
    listParts(this, JSONObj);
  };

  getInfoPart(item, navigate) {
    const JSONObj = JSON.stringify({
      partName: item.name,
      // filters: {
      //   maxPrice: "",
      //   minPrice: "",
      //   category: "",
      //   model: "",
      // },
    });
    axios
      .post(routes.GET_FULL_CAR_PART, JSONObj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        navigate("ItemComponent", {
          itemDatas: res.data,
          resDatas: res.data,
        });
      })
      .catch((err) => {
        console.log("ici", err.name, err.message);
      });
  }

  onPress = (item) => {
    const { navigate } = this.props.navigation;
    this.getInfoPart(item, navigate);
  };

  render() {
    // console.log(randomOne)

    const { search, response } = this.state;
    var images = [];
    for (const item of response) {
      images.push(
        <TouchableOpacity
          onPress={() => this.onPress(item)}
          key={item}
          activeOpacity={0.75}
          style={{
            width: "100%",
            borderWidth: 2,
            borderColor: "#5dade2",
            borderRadius: 6,
          }}
        >
          <View style={{ width: "99%", aspectRatio: 1 }}>
            <Text style={{ fontSize: 20, textAlign: "left", top: "5%" }}>
              Name : {item.name.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 20, textAlign: "left", top: "10%" }}>
              Price : {item.price.toUpperCase()} euros
            </Text>
            <Image
              style={{ resizeMode: "contain", aspectRatio: 1, width: '70%', top: '10%', alignSelf: 'center' }}
              source={{ uri: item.image }}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30, top: 35 }}>GearStocks</Text>
        <Icon
          name="format-align-justify"
          size={30}
          color="black"
          containerStyle={{ right: 170, top: 2 }}
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <SearchBar
          containerStyle={{
            borderColor: "#5dade2",
            borderWidth: 2,
          }}
          lightTheme
          returnKeyType="none"
          platform={Platform.OS === "android" ? "android" : "ios"}
          autoCapitalize="none"
          placeholder="What do you want ?"
          onChangeText={(search) => this.updateSearch(search)}
          value={search}
        />
        {response.length === 0 ? (
          <View style={{ top: "5%", width: "80%" }}>
            {user.isConnected() ? (
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                Welcome {user.username}
              </Text>
            ) : (
              <View>
                <Text style={{ textAlign: "center", fontSize: 25 }}>
                  Welcome
                </Text>
                <Text
                  style={{ textAlign: "center", fontSize: 25, color: "red" }}
                >
                  You are not connected
                </Text>
              </View>
            )}
            <Text style={{ textAlign: "center", fontSize: 20, top: "30%" }}>
              You can search for your piece by entering it directly into the
              search bar. You can also navigate through the application by using
              the icon in the top left corner.
            </Text>
            <Text style={{ textAlign: "center", fontSize: 20, top: "60%" }}>
              If you have a problem, please contact the support:
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                top: "65%",
                color: "blue",
              }}
              onPress={() => Linking.openURL("mailto:GearStocks@gmail.com")}
            >
              GearStocks@gmail.com
            </Text>
          </View>
        ) : null}
        <ScrollView style={{ flex: 1 }}>
          <View>{images}</View>
        </ScrollView>
      </View>
    );
  }
}
