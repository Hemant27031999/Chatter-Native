import React, { Component } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";
import Toast, {DURATION} from 'react-native-easy-toast';


export default class AllUsers extends Component {

  static navigationOptions =
  {
     title: 'AllUsers',
  };

  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      searchedField: '',
      filteredList: [],
      yourFriends: [],
      mainList: []
    };
  }

  componentDidMount(){
		fetch('https://agile-headland-13060.herokuapp.com/allusers',{
			method: 'post',
			headers: {'Content-Type':'application/json'}
		})
			.then(response => response.json())
			.then(data => {
					this.setState({
						usersList: data,
            filteredList: data
          }, () => {
            fetch('https://agile-headland-13060.herokuapp.com/contacts',{
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body:JSON.stringify({
                name: this.props.navigation.getParam('data', "name").name,
              })
            })
              .then(result => result.json())
              .then(friends => {
                if(friends.length !== 0){
                  this.setState({
                    yourFriends: friends
                  },() => {
                    var friendname = []
                    friends.forEach((item) => {
                      friendname.push(item.name)
                    })
                    this.setState({
                      yourFriends: friendname
                    })
                  })
                  }
              })
              .catch(err => {
                this.refs.toast.show(err);
              })

          })
				})

  }


follow = (toPerson) => {
	fetch('https://agile-headland-13060.herokuapp.com/frndrqst',{
		method: 'post',
		headers: {'Content-Type':'application/json'},
		body:JSON.stringify({
			fromperson: this.props.navigation.getParam('data', "name").name,
			toperson: toPerson
		})
	})
		.then(response => response.json())
		.then(data => {
			if(data){
					this.refs.toast.show("friend rqst sent ! The user will appear in your contact list once he accept your friend request!!!");
				}
			})
		.catch(err => {this.refs.toast.show(err);})
}


onClickListener(viewId) {
  if(viewId === 'accept'){
    this.refs.toast.show(this.props.navigation.getParam('data', "name").name);
  }
}


searchFriends = (e) => {
    let text = e.toLowerCase()
    let completeList = this.state.usersList
    let filteredName = completeList.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if(filteredName.length === 0){
      this.refs.toast.show("No user found !!!")
    }
      this.setState({
        filteredList: filteredName
      })
  }


  render() {
    return (
      <View style={{flex: 1, width: '100%', backgroundColor: '#261a0d'}}>
      <Text style={{fontSize: 60, fontWeight: 'bold', marginTop:20, color: '#261a0d', textAlign: 'center', backgroundColor:'#b59d96', borderRadius: 20, width: '98%'}}>All Users</Text>
      {this.state.usersList.length === 0?

      <View style={{paddingHorizontal: 50, paddingTop: 100}}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: '#ecd9c6', textAlign: 'center'}}>No user found</Text>
      </View>:

      <View style={{width:'100%', paddingBottom: 60}}>
      <TextInput
         style={{ borderColor: '#686C68', width: '98%', paddingHorizontal: 20, marginHorizontal: 3, marginVertical: 5, height: 50, borderWidth: 1, borderRadius: 30, color: '#d6d6c2', fontSize: 20}}
         placeholder = 'search a friend'
         ref={input => { this.textInput = input }}
         onChangeText={(text) => this.searchFriends(text)}
         placeholderTextColor = "#686C68"
       />

      <FlatList
        data={this.state.filteredList}
        style={{height: '100%', width: '100%'}}
        renderItem={({ item: rowData }) => {
          return (
            <View style={{width: '100%',flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 5, borderRadius: 10, backgroundColor: '#c68c53', padding: 10, flexDirection: 'row'}}>

              <Image
                style={{width: '20%', height: 65, borderRadius: 40, borderWidth: 1, borderColor: '#000000'}}
                source={{uri: rowData.imageurl === ""?'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACqHZnYq7HfFp_OshaZ-Hgc_1mjYqJrWJpc71xNWcxdts2O0j6g':rowData.imageurl}}
              />

              <View style={{flex: 1, alignItems: 'flex-start', width: '60%', height: '100%', paddingVertical: 10, paddingLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {rowData.name}
                </Text>
                <Text>
                  {rowData.email}
                </Text>
              </View>
              {this.state.yourFriends.includes(rowData.name) || rowData.name === this.props.navigation.getParam('data', "name").name?<View/>:
                <TouchableHighlight style={{ backgroundColor: '#e0ebeb', marginVertical: 8, padding: 10, borderRadius: 15, marginRight: 5, borderWidth: 1, borderColor: '#000000'}} onPress={() => this.follow(rowData.name)}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}} ref="status">
                    Request
                  </Text>
                </TouchableHighlight>
              }
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
      </View>
    }
    <Toast ref="toast"/>
    </View>
    );
  }
}
