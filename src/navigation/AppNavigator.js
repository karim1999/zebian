import React from 'react';
import { Provider } from 'react-redux';
import {Root} from "native-base";
import { createStore } from 'redux';
import { currentUser } from './../reducers';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './loading'
import AuthStack from './authNavigation'
import DrawerNavigator from './DrawerNavigator'
import Header2 from "../components/Header2";
import RecievePlace from "../screens/app/RecievePlace";
import GivePlace from "../screens/app/GivePlace";
import Time from "../screens/app/Time";
import CarType from "../screens/app/CarType";
import Complains from "../screens/app/complainings";
import Policy from "../screens/app/Policy";
import AddComplain from "../screens/app/AddComplain";

const AppNavigator= createStackNavigator(
    {
        Drawer:{
          screen:DrawerNavigator,
        } ,
        RecievePlace:
        {
          screen: RecievePlace,
        },
        GivePlace:
        {
          screen: GivePlace,
        },
        Time:
        {
          screen:Time
        },
        CarType:{
          screen:CarType
        },
        Complains:
        {
          screen: Complains,
        },
         Policy:
        {
          screen: Policy,
        },
      AddComplain:
        {
          screen: AddComplain,
        },


    },
    {
      headerMode:'none',
        initialRouteName: 'Drawer',
    }
);
export default AppNavigator;
