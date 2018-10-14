import React from 'react';
import { Provider } from 'react-redux';
import {Root} from "native-base";
import { createStore } from 'redux';
import { currentUser } from './../reducers';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';
import Check from './Check'
import DrawerNavigator from './DrawerNavigator'
import Header2 from "../components/Header2";
import AccountType from '../screens/auth/accountType';
import DriverForm from '../screens/auth/DriverForm';
import RecievePlace from "../screens/app/RecievePlace";
import GivePlace from "../screens/app/GivePlace";
import Time from "../screens/app/Time";
import CarType from "../screens/app/CarType";
import DriverHome from "../screens/app/driver/driverHome";
import Complains from "../screens/app/complainings";
import Policy from "../screens/app/Policy";
import AddComplain from "../screens/app/AddComplain";
import Offers from "../screens/app/offers";

const DriverNavigator= createStackNavigator(
	{
		DriverForm,
		DriverHome
	},
	{
		headerMode:'none',
		initialRouteName: 'DriverForm',
	}
);
const ClientNavigator= createStackNavigator(
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
		offers:{
			screen:Offers
		}

	},
	{
		headerMode:'none',
		initialRouteName: 'Drawer',
	}
);
const AppNavigator= createSwitchNavigator(
	{
		Check,
		AccountType,
		ClientNavigator,
		DriverNavigator,
	},
	{
		initialRouteName: 'Check',
	}
);
export default AppNavigator;
