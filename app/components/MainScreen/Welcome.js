import React, { Component } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";

export default class AllUsers extends Component {

  static navigationOptions =
  {
     title: 'AllUsers',
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 90, paddingHorizontal: 50}}>
        <Text style={{fontSize: 50, textAlign: 'center'}}>Welcome to Chatter, User</Text>
      </View>
    );
  }
}
