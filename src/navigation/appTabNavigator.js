import React from 'react';
import { createTabNavigator ,createStackNavigator} from 'react-navigation';
import HomeScreen from "../screens/app/orderNow";
import Orders from "../screens/app/talbaty";
import AccountSetting from "../screens/app/AccountSetting";

import { strings } from '../i18n';
import Text2 from "../components/Text2";
import Header2 from "../components/Header2";
import ChatUser from "../screens/app/chatList";

import { Icon } from 'native-base'

const AppTabNavigator = createTabNavigator(
  {
    Home: HomeScreen,
    Orders: Orders,
     ChatUser,
    AccountSetting: AccountSetting,

  },

  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let type = 'Ionicons'
        if (routeName === 'Home') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        } else if (routeName === 'Orders') {
          iconName = `ios-briefcase${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'AccountSetting') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'ChatUser') {
          iconName = `chat-bubble${focused ? '' : '-outline'}`;
          type= "MaterialIcons";
        }
        else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} type={type} size={23} style={{color:'#175a8f'}}  />;
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi' }} text="navigator.order" />;
            break;
          case 'Orders':
            return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi' }} text="navigator.orders" />;
            break;
          case 'ChatUser':
              return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi' }} text="navigator.chat" />;
              break;
          case 'AccountSetting':
            return <Text2 style={{ fontSize: 15,fontFamily:'Droid Arabic Kufi'}} text="navigator.settings" />;
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
      activeTintColor: '#175a8f',
      inactiveTintColor: '#175a8f',
      labelStyle: {
        fontSize: 20,
        fontFamily:'Droid Arabic Kufi',

      },
      tabStyle: {
        color:'red'
      },
      style: {
        backgroundColor: '#ffffff',
      },
    },

    initialRouteName: 'Home',
  }
);
export default AppTabNavigator;
