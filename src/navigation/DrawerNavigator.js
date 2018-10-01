import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import AppTabNavigator from './appTabNavigator'
// import Invite from '../screens/App/Invite';
import Invite from "../screens/app/Invite";
import User from "../screens/Account/User";
import TalabDetails from "../screens/app/map";
import AddTalab from "../screens/app/addTalab";
import TalabDetails1 from "../screens/app/talabDetails1";
import Driver from "../screens/Account/Driver";
import ModalBox from "../screens/app/Modal";
import Offers from "../screens/app/offers";
import OffersLoading from "../screens/app/offersLoading";

const DrawerNavigator = createDrawerNavigator(
    {
      AppTabNavigator:{
        screen:AppTabNavigator
      },




        Invite:
        {
            screen: Invite,
        },


        TalabDetails:
        {
            screen: TalabDetails,
        },
        AddTalab:
        {
            screen: AddTalab,
        },
        TalabDetails1:
        {
            screen: TalabDetails1,
        },


        User:
        {
            screen: User,
        },
        Driver:
        {
            screen: Driver,
        },

        ModalBox:
        {
            screen: ModalBox,
        },
        Offers:
        {
            screen: Offers,
        },
        OffersLoading:
        {
            screen: OffersLoading,
        },



    },
    {
        // drawerPosition: currentLocale == 'ar' ? 'left' : 'right',
        initialRouteName: 'AppTabNavigator',
    }
);
export default DrawerNavigator;
