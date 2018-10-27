import React from 'react';
import { Provider } from 'react-redux';
import {Root} from "native-base";
import { createStore } from 'redux';
import { currentUser } from './../reducers';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './loading'
import AuthStack from './authNavigation'
import DrawerNavigator from './DrawerNavigator'
import AppNavigator from './AppNavigator'
import SingleChatUser from "../screens/app/singleChat";
import talabDetails1 from "../screens/app/talabDetails1";
import Header2 from "../components/Header2";
import ComplainsDriver from "../screens/app/complainingsDriver"
import AddComplainDriver from "../screens/app/AddComplainDriver"

const RootStack= createStackNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth:{
          screen:AuthStack,
        } ,
        SingleChatUser,
        talabDetails1,
        ComplainsDriver,
        AddComplainDriver
    },
    {
      headerMode:'none',
        initialRouteName: 'AuthLoading',
    }
);

const store = createStore(currentUser);

export default class RootNavigation extends React.Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <RootStack/>
                </Provider>
            </Root>
        );
    }
}
