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
					iconName = `ios-contact${focused ? '' : '-outline'}`;
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
				return <Icon name={iconName} type={type} size={23} color={tintColor} style={{color:'#005e95',fontSize:23}} />;
			},
			tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'MyOffers':
            return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f' }} text="navigator.offers" />;
            break;
          case 'Orders':
            return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f' }} text="navigator.orders" />;
            break;
          case 'ChatStack':
              return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f' }} text="navigator.chat" />;
              break;
          case 'Settings':
            return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f'}} text="navigator.settings" />;
            break;


        }
			}
		}),
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: true,

		tabBarOptions: {
			showIcon: true,
			showLabel: true,
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
			labelStyle: {
				fontSize: 20,
        fontFamily:'Droid Arabic Kufi',
			},
			indicatorStyle: {
						backgroundColor: '#175a8f',
				},

			tabStyle: {
			},
			style: {
				backgroundColor: '#ffffff',
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
