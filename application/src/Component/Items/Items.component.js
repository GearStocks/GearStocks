/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-05 4:04:46 pm
 * @copyright GearStocks
 */

import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { user } from "../../services/User";
import { Alert } from "react-native";
import { routes } from "../../../config/routes";

const axios = require("axios");

export default class ItemsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  addBookmark = (partName) => {
    const JSONObj = JSON.stringify({
      userToken: user.token,
      partName: partName,
    });
    Alert.alert(
      "Cette piece est desormais dans vos favoris",
      "Pour la consulter, rendez-vous dans l'onglet favoris",
      [{ text: "OK", onPress: () => null }],
      { cancelable: false }
    );

    axios
      .post(routes.ADD_BOOKMARK, JSONObj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        const json = JSON.parse(JSONObj);
        console.log("RESPONSE RECEIVED: ", res.data);
        //navigate('AppMenu', { token: res.data.token, email: json['mail'] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const monthData = [];
    const priceData = [];
    const params = this.props.navigation.state;

    for (const month of params.params.resDatas.prices) {
      monthData.push(month.month);
      priceData.push(month.price);
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ top: "5%", flex: 1 }}>
          <Text style={{ fontSize: 30 }}>GearStocks</Text>
          <Icon
            name="format-align-justify"
            size={30}
            color="black"
            containerStyle={{ right: 170, bottom: 35 }}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          {user.isConnected() ? (
            <Icon
              name="star"
              size={30}
              color="black"
              containerStyle={{ left: "60%", top: 0, position: "absolute" }}
              onPress={() => {
                this.addBookmark(params.params.itemDatas.name);
              }}
            />
          ) : null}
        </View>
        <View style={{ flex: 1, top: '10%' }}>
          <Text style={{ fontSize: 20 }}>
            Name : {params.params.itemDatas.name.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {params.params.resDatas.description}
          </Text>
        </View>
        <View style={{ width: "90%", aspectRatio: 1 }}>
          <Image
            style={{ resizeMode: "contain", aspectRatio: 1, bottom: "20%" }}
            source={{ uri: params.params.itemDatas.photo }}
          />
        </View>
        <View style={{ bottom: "10%" }}>
          <Text>Stocks</Text>
          <LineChart
            data={{
              labels: monthData,
              datasets: [
                {
                  data: priceData,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix="€"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    );
  }
}
