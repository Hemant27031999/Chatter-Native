import React, { Component   } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import SignIn from './app/components/SignIn';
import Register from './app/components/Register';
import ChatScreen from './app/components/MainScreen/ChatScreen';
import AllUsers from './app/components/MainScreen/AllUsers';
import FriendRequest from './app/components/MainScreen/FriendRequest';
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


    class NavigationDrawerStructure extends Component {
      //Structure for the navigatin Drawer
      toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
      };
      render() {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
              {/*Donute Button Image */}
              <Image
                source={require('./app/components/MainScreen/send.png')}
                style={{ width: 25, height: 25, marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }

    const InternalNavigator = createStackNavigator({
      ChatScreen: {
        screen: ChatScreen,
        navigationOptions: {
          header: null,
        },
      },
      AllUsers: {
        screen: AllUsers,
        navigationOptions: {
          header: null,
        },
      },
      FriendRequest: {
        screen: FriendRequest,
        navigationOptions: {
          header: null,
        },
      }
    });


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
          drawerLabel: 'AllUsers',
        },
      },
      FriendRequest: {
        screen: FriendRequest,
        navigationOptions: {
          drawerLabel: 'FriendRequest',
        },
      }
    });

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
          }},
      DrawerNavigatorExample: {
        screen: DrawerNavigatorExample,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
          }},
    });

const App = createAppContainer(MainNavigator);

export default App;
