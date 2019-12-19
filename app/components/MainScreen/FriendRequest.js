import React, { Component } from "react";
import { FlatList, Text, View, Image, TextInput, StyleSheet,TouchableHighlight,  } from "react-native";
import Toast, {DURATION} from 'react-native-easy-toast';


export default class FriendRequest extends Component {

  static navigationOptions =
  {
     title: 'FriendRequest',
  };

  constructor(props) {
    super(props);
    this.state = {
			rqstlist: []
    };
  }


  componentDidMount(){
    fetch('https://agile-headland-13060.herokuapp.com/showfrndrqst',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				toperson:  this.props.navigation.getParam('data', "name").name
			})
		})
			.then(response => response.json())
			.then(data => {
					this.setState({
						rqstlist: data,
						})
				})
        .catch(err => {
          this.refs.toast.show(err);
        })
  }


  Confirm = (fromPerson) => {
    fetch('https://agile-headland-13060.herokuapp.com/confirmfrndrqst',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        fromperson: fromPerson,
        toperson: this.props.navigation.getParam('data', "name").name
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data){

          fetch('https://agile-headland-13060.herokuapp.com/showfrndrqst',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
              toperson: this.props.navigation.getParam('data', "name").name
            })
          })
            .then(response => response.json())
            .then(data => {
                this.setState({
                  rqstlist: data,
                  })
              })
              .catch(err => {
                this.refs.toast.show(err);
              })

          }
        })
  }


onClickListener(viewId) {
  if(viewId === 'accept'){
    this.refs.toast.show("You are now friends");
  }
}


  render() {
    return (
      <View style={{flex: 1, width: '100%', backgroundColor: '#261a0d'}}>
      {this.state.rqstlist.length === 0?

      <View style={{paddingHorizontal: 50, paddingTop: 100}}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: '#ecd9c6', textAlign: 'center'}}>No friend request pending</Text>
      </View>:

      <View style={{paddingTop: 28, width:'100%', paddingBottom: 60}}>
      <FlatList
        data={this.state.rqstlist}
        style={{height: '100%', width: '100%'}}
        renderItem={({ item: rowData }) => {
          return (
            <View  style={{width: '100%',flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 5, borderRadius: 10, backgroundColor: '#c68c53', padding: 10, flexDirection: 'row'}}>

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

              <TouchableHighlight style={{ backgroundColor: '#e0ebeb', marginVertical: 8, padding: 10, borderRadius: 15, marginRight: 5, borderWidth: 1, borderColor: '#000000'}} onPress={() => this.Confirm(rowData.name)}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Accept
                </Text>
              </TouchableHighlight>

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
