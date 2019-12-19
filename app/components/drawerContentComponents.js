import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, TouchableHighlight, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                    <Image style={{width: 170, height: 170, justifyContent: 'center', borderWidth: 1, borderColor: '#000000', borderRadius: 80}} source={require('./MainScreen/profile.jpeg')} />
                    <Text style={styles.headerText}>Prathamesh Katkar</Text>
            </View>
            <View style={styles.screenContainer}>
                <TouchableHighlight style={[styles.screenStyle, (this.props.activeItemKey=='ChatScreen') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('ChatScreen')}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                      <Ionicons name="md-send"/>
                      <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ChatScreen') ? styles.selectedTextStyle : null]}>ChatScreen</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.screenStyle, (this.props.activeItemKey=='AllUsers') ? styles.activeBackgroundColor : null]}  onPress={this.navigateToScreen('AllUsers')}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                      <Ionicons name="md-contacts"/>
                      <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='AllUsers') ? styles.selectedTextStyle : null]}>AllUsers</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.screenStyle, (this.props.activeItemKey=='FriendRequest') ? styles.activeBackgroundColor : null]}  onPress={this.navigateToScreen('FriendRequest')}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                      <Ionicons name="md-person-add"/>
                      <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='FriendRequest') ? styles.selectedTextStyle : null]}>FriendRequest</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        paddingTop: 30,
        width: '100%',
        paddingBottom: 10,
        backgroundColor: '#456565',
    },
    headerText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 23,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    screenContainer: {
        paddingTop: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#8d9595'
    },
    screenStyle: {
        height: 50,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#000000'
    },
    activeBackgroundColor: {
        borderRadius: 10,
        backgroundColor: '#c2c2a3'
    }
});
