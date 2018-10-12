import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import {View,I18nManager,ImageBackground} from "react-native";
import { strings,currentLocale } from '../i18n';
import {Icon} from 'native-base'

export default class UserBox extends Component {
    render() {
        return (
          <ImageBackground source={{uri:'https://image.ibb.co/mRPfMK/10m.png'}} style={{flex: 1, height: 130,borderRadius: 10, marginHorizontal: 3, backgroundColor: 'white' }}>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'white',textAlign:'left',alignSelf:'flex-start',flex:.5,fontSize:20}}>1 KM</Text>
              <Text style={{color:'white',textAlign:'right',alignSelf:'flex-end',flex:.5}}><Icon style={{color:'green'}} size={30} type="Entypo" name="dot-single"/></Text>
            </View>
            <Text style={{color:'white',textAlign:'right',alignSelf:'flex-end',fontWeight:'bold',fontSize:12,padding:8,flex:.5,bottom:0,position:'absolute'}}>Amr Mohmed , 25 years old</Text>
          </ImageBackground>

        );
    }
}
