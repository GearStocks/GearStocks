import React from "react";
import { View, ScrollView, SafeAreaView, YellowBox } from "react-native";
import { Text, Button, Icon, Input } from "react-native-elements";
import { user } from "../../services/User";

export default class FavorisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateState();
  }

  updateState = () => {
    this.state = {};
  };

  render() {
    const { navigation } = this.props;

    if (user.isConnected()) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 10,
          }}
        >
          <ScrollView>
            <Text style={{ fontSize: 30, top: 35, textAlign: "center" }}>
              GearStocks
            </Text>
            <View style={{ alignItems: "flex-start", flex: 1 }}>
              <Icon
                name="format-align-justify"
                size={30}
                color="black"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            </View>
            <View style={{ top: 30, padding: 30 }}>
              <Text style={{ fontSize: 30, padding: 10, textAlign: "center" }}>
                Vos favoris
              </Text>
              <Text style={{ padding: 10, textAlign: "center" }}>
                Aucun favoris
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
          <View>
            <Text style={{ textAlign: "center", padding: "10%", fontSize: 20 }}>
              If will be possible to find your favorites items if you are
              connected on our platfrom
            </Text>
          </View>
        </View>
      );
    }
  }
}
