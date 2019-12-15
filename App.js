import React from 'react';
import { View} from 'react-native';
import SignIn from './app/components/SignIn';
import Register from './app/components/Register';
import ChatScreen from './app/components/MainScreen/ChatScreen';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

const initialState = {
      route: 'signin',
      user: {
        'name':'',
        'email':'',
        'imageurl':''
      },
      friendslist: []
    }


  const MainNavigator = createStackNavigator({
    Home: {
      screen: SignIn,
      navigationOptions: {
          header: null,
        }
      },
    Profile: {
      screen: Register,
      navigationOptions: {
          header: null,
        }},
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
          header: null,
        }},
  });


const App = createAppContainer(MainNavigator);

export default App;
