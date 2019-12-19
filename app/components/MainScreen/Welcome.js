import React, { Component } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";

export default class AllUsers extends Component {

  static navigationOptions =
  {
     title: 'AllUsers',
  };

  render() {
    return (
      <View style={{flex: 125, alignItems: 'center', paddingHorizontal: 50, paddingTop: 30 }}>
        <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold'}}>Welcome to Chatter, User</Text>
      </View>
    );
  }
}
