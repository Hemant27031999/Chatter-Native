import React, { Component   } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import SignIn from './app/components/SignIn';
import Register from './app/components/Register';
import ChatScreen from './app/components/MainScreen/ChatScreen';
import AllUsers from './app/components/MainScreen/AllUsers';
import { Ionicons } from "@expo/vector-icons";
import FriendRequest from './app/components/MainScreen/FriendRequest';
import drawerContentComponents from './app/components/drawerContentComponents';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

const initialState = {
      route: 'signin',
      user: {
        'name':'',
        'email':'',
        'imageurl':''
      },
      friendslist: []
    }


const DrawerNavigatorExample = createDrawerNavigator({
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      drawerLabel: 'ChatScreen',
    },
  },
  AllUsers: {
    screen: AllUsers,
    navigationOptions: {
      drawerLabel: 'All Users',
    },
  },
  FriendRequest: {
    screen: FriendRequest,
    navigationOptions: {
      drawerLabel: 'Friend Request',
    },
  }
},
{
   contentComponent: drawerContentComponents
}
);


const MainNavigator = createStackNavigator({
  Home: {
    screen: SignIn,
    navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
  Profile: {
    screen: Register,
    navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
  DrawerNavigatorExample: {
    screen: DrawerNavigatorExample,
    navigationOptions: {
        header: null,
        gesturesEnabled: false
      }},
});

const App = createAppContainer(MainNavigator);

export default App;
