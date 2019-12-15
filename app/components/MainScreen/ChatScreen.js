import React, { Component } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";
import { Card } from "react-native-elements";
import FriendsList from "./FriendsList"

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

const messages = [
  {
    message: "Hello How are you ?",
    name: "Piyush"
  },
  {
    message: "I'm fine, what about you ?",
    name: "Ashish"
  },
  {
    message: "Oh I am also fine, where are you now a days ....",
    name: "Piyush"
  },
  {
    message: "Bro I am pursuing B.Tech from IIt Roorkee.",
    name: "Ashish"
  },
  {
    message: "That's nice ...... when are you coming home ?",
    name: "Piyush"
  },
  {
    message: "Hello How are you ?",
    name: "Piyush"
  },
  {
    message: "I'm fine, what about you ?",
    name: "Ashish"
  },
  {
    message: "Oh I am also fine, where are you now a days ....",
    name: "Piyush"
  },
  {
    message: "Bro I am pursuing B.Tech from IIt Roorkee.",
    name: "Ashish"
  },
  {
    message: "That's nice ...... when are you coming home ?",
    name: "Piyush"
  },
  {
    message: "Hello How are you ?",
    name: "Piyush"
  },
  {
    message: "I'm fine, what about you ?",
    name: "Ashish"
  },
  {
    message: "Oh I am also fine, where are you now a days ....",
    name: "Piyush"
  },
  {
    message: "Bro I am pursuing B.Tech from IIt Roorkee.",
    name: "Ashish"
  },
  {
    message: "That's nice ...... when are you coming home ?",
    name: "Piyush"
  },
  {
    message: "Hello How are you ?",
    name: "Piyush"
  },
  {
    message: "I'm fine, what about you ?",
    name: "Ashish"
  },
  {
    message: "Oh I am also fine, where are you now a days ....",
    name: "Piyush"
  },
  {
    message: "Bro I am pursuing B.Tech from IIt Roorkee.",
    name: "Ashish"
  },
  {
    message: "That's nice ...... when are you coming home ?",
    name: "Piyush"
  }
];

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Piyush',
      data: data,
      messages: messages
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 28, backgroundColor: '#bac4bc'}}>
      <FlatList
        horizontal
        data={this.state.data}
        style={{height: '7%'}}
        renderItem={({ item: rowData }) => {
          return (
            <View
              title={null}
              image={{ uri: rowData.imageUrl }}
              style={{width: 80, height: 85, padding: 10, borderTopLeftRadius:40, borderTopRightRadius:40, flex: 1, alignItems: 'center', marginHorizontal: 2, borderWidth: this.state.name === rowData.title ? 0 : 2, borderColor: '#000000', backgroundColor: this.state.name === rowData.title ? '#bac4bc' : '#75989C'}}
              >
              <Image
                style={{width: 50, height: 50, borderRadius: 30}}
                source={{uri: rowData.imageUrl}}
              />
              <Text style={{color: '#D2D8CF', fontWeight: 'bold',}}>
                {rowData.title}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />

      <View style={{height : '75%', width: '100%',margin: 5,  borderWidth: 1, borderColor: '#686C68'}}>
      <FlatList
      data={this.state.messages}
      ref = "flatList"
      onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
      renderItem={({ item: myData }) => {
        return (
            <Text style = {myData.name === this.state.name ? styles.owner : styles.friend}>
              {myData.message}
            </Text>
        );
      }}
      keyExtractor={(item, index) => index}
    />
      </View>

      <View style={{flex: 1, height: '22%', width: '100%',  marginBottom: 10, marginHorizontal:5, flexDirection: 'row', bottom: 0, alignSelf: 'stretch',  height: 30}}>
        <TextInput
           style={{ borderColor: '#686C68', width: '85%', borderWidth: 1, borderRadius: 30, color: '#686C68', fontSize: 20,padding: 10 }}
           placeholder = "write a message"
           placeholderTextColor = "#686C68"
         />
         <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.onClickListener('register')}>
             <Image style={{width: 50, height: 50}} source={require('./send.png')}/>
         </TouchableHighlight>
       </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  owner: {
    color: '#D2D8CF',
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#292A29',
    alignSelf: 'flex-end',
    marginRight: 5,
    padding: 5,
    width: '70%',
    borderRadius: 5
  },
  friend: {
    color: '#D2D8CF',
    fontWeight: 'bold',
    backgroundColor : '#62755A',
    marginBottom: 10,
    marginLeft: 5,
    padding: 5,
    width: '70%',
    borderRadius: 5
  }
});
