import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import Phone from '../screens/auth/phone';
import Forget from '../screens/auth/Forget';
import AccountType from '../screens/auth/accountType';
import DriverForm from '../screens/auth/DriverForm';

const AuthStack = createStackNavigator(
    {
        SignIn: SignIn,
        SignUp: SignUp,
        Forget:Forget,
        AccountType,
        DriverForm,
        Phone

    },
    {
        headerMode: 'none',
        initialRouteName: 'SignIn',
    }
);
export default AuthStack;
