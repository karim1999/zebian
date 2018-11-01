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
          iconName = `ios-cart${focused ? '' : '-outline'}`;
          type="Ionicons"
        }
        else if (routeName === 'AccountSetting') {
          iconName = `user-circle${focused ? '-o' : ''}`;
          type = "FontAwesome"
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
        return <Icon name={iconName} type={type}  style={{color:'#005e95',fontSize:25}}  />;
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            return <Text2 style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f' }} text="navigator.order" />;
            break;
          case 'Orders':
            return <Text2 style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f' }} text="navigator.orders" />;
            break;
          case 'ChatUser':
              return <Text2 style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f' }} text="navigator.chat" />;
              break;
          case 'AccountSetting':
            return <Text2 style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi',color:'#5c5f5f'}} text="navigator.settings" />;
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
      indicatorStyle: {
            backgroundColor: '#175a8f',
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
