import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button,TouchableHighlight, ImageBackground} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import * as Font from 'expo-font';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class SignIn extends Component {

  static navigationOptions =
  {
     title: 'SignIn',
  };

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {

    if(viewId === 'register'){
      this.refs.toast.show("Inside registerclick if statement.");
      this.props.navigation.navigate('Profile', {name: 'Jane'})
    }
    else if (viewId === 'signin') {
      fetch('https://agile-headland-13060.herokuapp.com/signin',{
  			method: 'post',
  			headers: {'Content-Type':'application/json'},
  			body:JSON.stringify({
  				email: this.state.email,
  				password: this.state.password
  			})
  		})
  			.then(response => response.json())
  			.then(data => {
          if(data.id){

            this.refs.toast.show(data.name);
  					fetch('https://agile-headland-13060.herokuapp.com/contacts',{
  						method: 'post',
  						headers: {'Content-Type':'application/json'},
  						body:JSON.stringify({
  							name: data.name
  						})
  					})
  						.then(result => result.json())
  						.then(friends => {
                  this.props.navigation.navigate('DrawerNavigatorExample', {data: data, friends: friends, hello: 'hello Mr.'})
  						})
  						.catch(err => {
  							console.log(err);
  						})
        }
        else{
          this.refs.toast.show(data);
        }
  			})
  			.catch(err => {
  				this.refs.toast.show(err+" error");
  			})
    }
  }

  changeActivity = () => {
     this.props.navigation.navigate('signin');
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.content}>

        <ImageBackground
              style={{
                flex: 1,
                resizeMode: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                    }}
              source={require("../resources/back.jpg")}
            >

        <View style={[styles.card2]}>

          <Text style={styles.title}>Sign In</Text>

          <Fumi
            label={'email'}
            onChangeText={(text) => { this.setState({email: text})}}
            labelStyle={{ color: '#645D51' }}
            inputStyle={{ color: '#000000' }}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'#000000'}
            iconSize={15}
            width={270}
            fontWeight={'bold'}
          />

          <Fumi
            style={styles.input}
            label={'password'}
            onChangeText={(text) => { this.setState({password: text})}}
            labelStyle={{ color: '#645D51' }}
            inputStyle={{ color: '#000000' }}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            secureTextEntry={true}
            iconColor={'#000000'}
            iconSize={15}
            fontWeight={'bold'}
          />

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} underlayColor="grey" onPress={() => this.onClickListener('signin')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('register')}>
              <Text style={styles.signupText}>Register</Text>
          </TouchableHighlight>

        </View>
          <Toast ref="toast"/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    paddingBottom: 300,
  },
  card2: {
    padding: 16,
    flex: 1,
    opacity: 0.8,
    marginTop:60
  },
  input: {
    marginTop: 4,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:330,
  },
  loginButton: {
    backgroundColor: "#000000",
    marginTop:5,
    color: '#FFFFFF',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  loginText: {
    color: 'white',
    fontSize:20,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: "#bac4bc",
    marginTop:90,
    borderRadius: 30
  },
  signupText: {
    color: 'black',
    fontSize:20,
    fontWeight: 'bold',
  },
  title: {
    padding:16,
    marginBottom:5,
    textAlign: 'center',
    backgroundColor: "#000000",
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    opacity: 0.8,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
});
