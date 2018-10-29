import React from 'react';
import { Provider } from 'react-redux';
import {Icon, Root} from "native-base";
import { createStore } from 'redux';
import { currentUser } from './../reducers';
import {createSwitchNavigator, createStackNavigator, createTabNavigator} from 'react-navigation';
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
import DriverSettings from "../screens/app/driver/driverSettings";
import DriverOffers from "../screens/app/driver/myOffers";
import ChatList from "../screens/app/driver/chatList";
import SingleChat from "../screens/app/driver/singleChat";
import AddTalab from "../screens/app/addTalab";
import Complains from "../screens/app/complainings";
import Policy from "../screens/app/Policy";
import AddComplain from "../screens/app/AddComplain";
import Offers from "../screens/app/offers";
import Text2 from "../components/Text2";
import AppTabNavigator from './appTabNavigator'

const Orders = createStackNavigator({
	DriverHome,
	AddTalab,
	RecievePlace,
	GivePlace,
},{
	headerMode: 'none',
});
const MyOffers = createStackNavigator({
	DriverOffers,
	AddTalab
},{
	headerMode: 'none',
});
const ChatStack = createStackNavigator({
	ChatList,
	SingleChat,
},{
	headerMode: 'none',
});
const Settings = createStackNavigator({
	DriverSettings,
	Policy,
	AddComplain,
},{
	headerMode: 'none',
});

const DriverTabNavigator= createTabNavigator(
	{
		Orders,
		ChatStack,
		MyOffers,
		Settings
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				let type= "Ionicons";
				if (routeName === 'Orders') {
					iconName = `ios-list-box${focused ? '' : '-outline'}`;
				} else if (routeName === 'Orders') {
					iconName = `ios-briefcase${focused ? '' : '-outline'}`;
				}
				else if (routeName === 'Settings') {
					iconName = `ios-settings${focused ? '' : '-outline'}`;
				}
				else if (routeName === 'ChatStack') {
					iconName = `chat-bubble${focused ? '' : '-outline'}`;
					type= "MaterialIcons";
				}
				else if (routeName === 'MyOffers') {
					iconName = `ios-search${focused ? '' : '-outline'}`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Icon name={iconName} type={type} size={23} color={tintColor} />;
			},
		}),
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: true,

		tabBarOptions: {
			showIcon: true,
			showLabel: false,
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
			labelStyle: {
				fontSize: 12,
			},
			tabStyle: {
			},
			style: {
				backgroundColor: '#ededed',
			},
		},

		initialRouteName: 'Orders',
	}

);
const DriverNavigator= createStackNavigator(
	{
		DriverForm,
		DriverTabNavigator
	},
	{
		headerMode:'none',
		initialRouteName: 'DriverForm',
	}
);
const ClientNavigator= createStackNavigator(
	{
		AppTabNavigator:{
			screen:AppTabNavigator,
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
		initialRouteName: 'AppTabNavigator',
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
