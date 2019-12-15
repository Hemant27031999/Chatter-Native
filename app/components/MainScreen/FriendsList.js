import React, { Component } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Ishan"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Hemil"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Patil"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Ashish"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Piyush"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Bhavya"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Alfez"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Shrey"
  },
  {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ&s",
    title: "Aradhna"
  }
];

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
        style={{marginHorizontal: 10, marginTop: 28}}
        renderItem={({ item: rowData }) => {
          return (
            <View
              title={null}
              image={{ uri: rowData.imageUrl }}
              style={{width: 60, height: 60, flex: 1, alignItems: 'center'}}
              >
              <Image
                style={{width: 50, height: 50, borderRadius: 30}}
                source={{uri: rowData.imageUrl}}
              />
              <Text style={{}}>
                {rowData.title}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}
