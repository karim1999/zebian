import React, { Component } from 'react';
import {View,I18nManager} from "react-native";
import { strings,currentLocale } from '../i18n';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Content} from 'native-base';

export default class Header2 extends Component {
    render() {
        return (
          <Header>
               <Left>
               <Button transparent>
                   <Icon onPress={()=>{
                     this.props.navigation.openDrawer();
                   }} name='menu' />
               </Button>

               </Left>
               <Body>
               <Title>App Template</Title>
               </Body>
               <Right>
               <Button transparent>
                   <Icon name='arrow-back' />
               </Button>
               </Right>
           </Header>
        );
    }
}
