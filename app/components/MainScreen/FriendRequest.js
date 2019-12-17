import React, { Component } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";

export default class FriendRequest extends Component {

  static navigationOptions =
  {
     title: 'FriendRequest',
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 28, backgroundColor: '#bac4bc'}}>
        <Text>Hello, FriendRequest</Text>
      </View>
    );
  }
}
