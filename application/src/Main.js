import React from 'react';
import { registerRootComponent } from 'expo';
import { default as App } from './App';

class Main extends React.Component {
  render() {
    return <App />;
  }
}

registerRootComponent(Main);
