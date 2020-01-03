import React, { Component, useState } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";
import { AppLoading } from 'expo';
import SignIn from '../SignIn';
import Register from '../Register';
import FriendsList from './FriendsList'
import { Ionicons } from "@expo/vector-icons";
import Welcome from './Welcome'
import {createAppContainer} from 'react-navigation';
import Pusher from 'pusher-js/react-native';
import Toast, {DURATION} from 'react-native-easy-toast';


export default class ChatScreen extends Component {

  static navigationOptions =
  {
     title: 'ChatScreen',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.getParam('data', "name").name,
			imageURL: this.props.navigation.getParam('data', "imageURL").imageurl,
			friendslist: this.props.navigation.getParam('friends', "friendlist").reverse(),
			email: this.props.navigation.getParam('data', "email").email,
			friend: {
				name: '',
				email: '',
				imageURL: '',
				status: '',
				msgDatabase: ''
			},
			msgingChat: [],
			msg:'',
			searchfield:'',
			searchfriends:'',
			generallist: [],
			branch: 'welcome',
			test:'',
			rqstlist: [],
			inMsgField: ''
    };
  }


  componentWillMount() {
      console.disableYellowBox = true;
	    Pusher.logToConsole = true;

	    var pusher = new Pusher('7c4198eef984dd85a08e', {
	      cluster: 'ap2',
	      forceTLS: true
	    });

	    var channel = pusher.subscribe(`${this.props.navigation.getParam('data', "email").email}-channel`);

	    channel.bind('my-event', datafrompusher => {
	      fetch('https://agile-headland-13060.herokuapp.com/newmsges',{
  			method: 'post',
  			headers: {'Content-Type':'application/json'},
  			body:JSON.stringify({
  				database:  datafrompusher.database,
  				name: this.state.name,
  				msg: "@nomsg@",
  				toperson: ""
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){

					fetch('https://agile-headland-13060.herokuapp.com/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body:JSON.stringify({
							name: this.state.name
						})
					})
						.then(result => result.json())
						.then(friends => {
							if(friends.length !== 0){
                if(this.state.friend.name === datafrompusher.fromPerson){
								this.setState({
									msgingChat: data,
									friendslist: friends.reverse()
									})
                }
                else{
                  this.setState({
  									friendslist: friends.reverse()
  									})
                }
								}
						})
						.catch(err => {
							this.refs.toast.show(err);
						})
					}
				})
	    });
	}


  Refresh = () => {
    fetch('https://agile-headland-13060.herokuapp.com/contacts',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        name: this.state.name
      })
    })
      .then(result => result.json())
      .then(friends => {
        if(friends.length !== 0){
          this.setState({
            friendslist: friends.reverse()
            })
          }
      })
      .catch(err => {
        this.refs.toast.show(err);
      })
  }


loadChattingUser = (loadingData) => {
	this.setState({ 'msgingChat': [] });

	this.setState({friend: {
	        'name': loadingData.name,
	        'imageURL': loadingData.imageurl,
	        'email':loadingData.email,
	        'msgDatabase': loadingData.msgdata
	    }})

	var database=loadingData.msgdata;

	fetch('https://agile-headland-13060.herokuapp.com/msges',{
		method: 'post',
		headers: {'Content-Type':'application/json'},
		body:JSON.stringify({
			database:  database
		})
	})
		.then(response => response.json())
		.then(data => {
			if(data.length !== 0){
				this.setState({
					msgingChat: data,
					branch: 'chat'
				});
			}
		})
	this.setState({ 'branch': 'chat' });
}

onClickListener = (viewId) => {
  if(viewId === 'send'){
    fetch('https://agile-headland-13060.herokuapp.com/newmsges',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				database:  this.state.friend.msgDatabase,
				name: this.state.name,
				msg: this.state.msg,
				email: this.state.friend.email,
				toperson: this.state.friend.name
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){

					fetch('https://agile-headland-13060.herokuapp.com/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body:JSON.stringify({
							name: this.state.name
						})
					})
						.then(result => result.json())
						.then(friends => {
							if(friends.length !== 0){
								this.setState({
									msgingChat: data,
									friendslist: friends.reverse(),
                  msg: ''
									})
                  this.textInput.clear()
								}
						})
						.catch(err => {
							this.refs.toast.show(err);
						})

					}
				})
  }
}

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 25, backgroundColor: '#bac4bc'}}>
      <FlatList
        horizontal
        data={this.state.friendslist}
        style={{height: '15%', width: '100%'}}
        renderItem={({ item: rowData }) => {
          return (
            <TouchableHighlight
            style={{width: 80, height: 85, padding: 10, borderTopLeftRadius:40, borderTopRightRadius:40, borderBottomLeftRadius:10, borderBottomRightRadius:10, flex: 1, alignItems: 'center', marginHorizontal: 2, borderWidth: this.state.friend.name === rowData.name ? 0 : 2, borderColor: '#000000', backgroundColor: this.state.friend.name === rowData.name ? '#bac4bc' : '#8c8f8a'}}
            onPress={() => this.loadChattingUser(rowData)}>
            <View style={{flex: 1, alignItems: 'center', marginHorizontal: 2,}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 30,  borderWidth: 1, borderColor: '#000000',}}
                source={{uri: rowData.imageurl === ""?'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACqHZnYq7HfFp_OshaZ-Hgc_1mjYqJrWJpc71xNWcxdts2O0j6g':rowData.imageurl}}
              />
              <Text style={{color: '#000000', fontWeight: 'bold',}}>
                {rowData.name.split(" ")[0]}
              </Text>
            </View>
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item, index) => index}
      />
      {this.state.branch === 'welcome'?
        <View style={{flex: 125, alignItems: 'center', paddingHorizontal: 50, paddingTop: 30 , borderWidth: 1, borderColor: '#686C68'}}>
          <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold'}}>Welcome to Chatter, {this.state.name}</Text>
          <TouchableHighlight style={[styles.buttonContainer2, styles.signupButton]} onPress={() => this.Refresh()}>
              <Text style={styles.signupText}>Refresh</Text>
          </TouchableHighlight>
        </View>:
      <View style={{height : '85%', width: '100%'}}>

      <View style={{height : '87%', width: '100%', marginVertical: 5, paddingVertical: 5, borderWidth: 1, borderColor: '#686C68'}}>

          <FlatList
          data={this.state.msgingChat}
          ref = "flatList"
          onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
          renderItem={({ item: myData }) => {
            return (
                <Text style = {myData.name === this.state.name ? styles.owner : styles.friend}>
                  {myData.msg}
                </Text>
            );
          }}
          keyExtractor={(item, index) => index}
        />

      </View>

      <View style={{flex: 1, height: '13%', width: '100%',  marginBottom: 10, marginHorizontal:5, flexDirection: 'row', bottom: 0, alignSelf: 'stretch',  height: 30}}>
        <TextInput
           style={{ borderColor: '#686C68', width: '85%', borderWidth: 1, borderRadius: 30, color: '#686C68', fontSize: 20,padding: 10 }}
           placeholder = 'write a message here'
           ref={input => { this.textInput = input }}
           onChangeText={(text) => { this.setState({msg: text})}}
           placeholderTextColor = "#686C68"
         />
         <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.onClickListener('send')}>
             <Image style={{width: 50, height: 50}} source={require('./send.png')}/>
         </TouchableHighlight>
       </View>

       </View>
     }
      <Toast ref="toast"/>
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
  },
  buttonContainer2: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    width:200,
  },
  signupButton: {
    backgroundColor: "#000000",
    marginTop:30,
    borderRadius: 30
  },
  signupText: {
    color: 'white',
    fontSize:20,
    fontWeight: 'bold',
  },
});
