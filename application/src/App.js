import React from 'react';
import { View } from 'react-native';
import { ConnectionComponent } from './Component/Connection/ConnectionComponent'

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <View>
        <ConnectionComponent />
    </View>
    )
};
};