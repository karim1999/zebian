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

import Header2 from "../components/Header2";

const RootStack= createStackNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth:{
          screen:AuthStack,
        } ,
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
