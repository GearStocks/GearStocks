import React from 'react';
import { View, Platform } from 'react-native';
import { Text, SearchBar } from 'react-native-elements';
import styles from './UserInformations.component.style';

export default class UserInformations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      username: '',
      search: ''
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <Text h3>Welcome 'USER'</Text>
        <SearchBar
          lightTheme
          platform={Platform.OS === 'android' ? 'android' : 'ios'}
          placeholder="Type Here"
          onChangeText={this.updateSearch}
          value={search}
        />
        <Text h5>
          Your mail is : email@email.com
          Your username is : username
          Your firstname is : firstname
          Your lastname is : lastname
        </Text>
      </View>
    );
  }
}