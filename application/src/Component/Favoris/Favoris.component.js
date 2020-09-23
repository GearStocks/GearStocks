import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text, Button, Icon, Input } from 'react-native-elements';

export default class FavorisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateState();
  }

  updateState = () => {
    this.state = {
    };
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10 }}>
        <ScrollView>
          <Text style={{ fontSize: 30, top: 35, textAlign: 'center' }}>GearStocks</Text>
          <View style={{ alignItems: 'flex-start', flex: 1 }}>
            <Icon name='format-align-justify' size={30} color='black'
              onPress={() => { this.props.navigation.openDrawer(); }} />
          </View>
          <View style={{ top: 30, padding: 30 }}>
            <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>Vos favoris</Text>
            <Text style={{ padding: 10, textAlign: 'center' }}>Aucun favoris</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}