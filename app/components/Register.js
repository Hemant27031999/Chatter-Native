import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button,TouchableHighlight, Image, Keyboard, ImageBackground, Animated, Dimensions, UIManager} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import * as Font from 'expo-font';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class Register extends Component {

  static navigationOptions =
  {
     title: 'Register',
  };

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      name: '',
      email   : '',
      password: '',
      imageurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACqHZnYq7HfFp_OshaZ-Hgc_1mjYqJrWJpc71xNWcxdts2O0j6g'
    }
  }

  onClickListener = (viewId) => {
    if(viewId === 'login'){
      this.props.navigation.navigate('Home', {name: 'Jane'});
    } else if (viewId === 'register') {
    		fetch('https://agile-headland-13060.herokuapp.com/register',{
    			method: 'post',
    			headers: {'Content-Type':'application/json'},
    			body:JSON.stringify({
    				name: this.state.name,
    				email: this.state.email,
    				password: this.state.password,
    				imageurl: this.state.imageurl
    			})
    		})
    			.then(response => response.json())
    			.then(data => {
    				if(data.id){
    					const friends = [];
    					this.props.navigation.navigate('DrawerNavigatorExample', {data: data, friends: friends})
    				}
            else{
              this.refs.toast.show("Unable to register.");
            }
    			})
          .catch(err => {
            this.refs.toast.show(err);
          })
    }
  }

  render() {
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

        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Image style={styles.imageContainer} source={{uri : this.state.imageurl}} />
        </View>


          <Fumi
            label={'name'}
            labelStyle={{ color: '#645D51' }}
            inputStyle={{ color: '#000000' }}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'#000000'}
            onChangeText={(text) => { this.setState({name: text})}}
            iconSize={15}
            fontWeight={'bold'}
          />

          <Fumi
            style={styles.input}
            label={'email'}
            labelStyle={{ color: '#645D51' }}
            inputStyle={{ color: '#000000' }}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            onChangeText={(text) => { this.setState({email: text})}}
            iconColor={'#000000'}
            iconSize={15}
            width={270}
            fontWeight={'bold'}
          />

          <Fumi
            style={styles.input}
            label={'password'}
            labelStyle={{ color: '#645D51' }}
            inputStyle={{ color: '#000000' }}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            onChangeText={(text) => { this.setState({password: text})}}
            iconColor={'#000000'}
            secureTextEntry={true}
            iconSize={15}
            fontWeight={'bold'}
          />

          <Fumi
            style={styles.input}
            label={'image url'}
            labelStyle={{ color: '#645D51' }}
            inputStyle={{ color: '#000000' }}
            iconClass={FontAwesomeIcon}
            iconName={'camera'}
            onChangeText={(text) => { this.setState({imageurl: text})}}
            iconColor={'#000000'}
            iconSize={15}
            fontWeight={'bold'}
          />

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} underlayColor="grey" onPress={() => this.onClickListener('register')}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('login')}>
              <Text style={styles.signupText}>Login</Text>
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
  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: 'steelblue'
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:16,
    marginBottom:5,
    backgroundColor: "#000000",
    width: 330,
    height: 60,
    opacity: 0.8,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
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
    opacity: 0.8,
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
    textAlign: 'center',
    marginLeft:20,
    color: '#FFFFFF',
    fontSize: 40,
    height: 50,
    fontWeight: 'bold',
  },
});
