import React, { Component } from 'react';
import { Button, Text, View } from 'native-base';
import AppTemplate from '../appTemplate';
import {TouchableOpacity} from 'react-native'
import Square from '../../../components/common/square';
import DriverSelected from '../../../assets/images/png/DriverSelected.png';
import DriverUnSelected from '../../../assets/images/png/DriverUnSelected.png';

import UserSelected from '../../../assets/images/png/UserSelected.png';
import UserUnSelected from '../../../assets/images/png/UserUnSelected.png';


export default class AccountType extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:true,
      driver:false,
      selected:'user'
    }
  }
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate navigation={nav} name="نوع الحساب">
        <View style={{ flexDirection: 'column', flex: 1, marginTop: 30 }}>
          <View style={{ flexDirection: 'row', width: '99%', alignSelf: 'center', flex: 1 }}>
          <TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
              ()=>{
                this.setState({user:false,driver:true,selected:'driver'})
              }
            }
            >
            <Square ImgS={DriverSelected} ImgU={DriverUnSelected}  status={this.state.driver} HeaderText='سائق' width={100} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
              ()=>{
                this.setState({user:true,driver:false,selected:'user'})
              }
            }
            >
            <Square  ImgS={UserSelected} ImgU={UserUnSelected} status={this.state.user} HeaderText='مستخدم' width={100} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignSelf: 'center', height: 250, width: '50%', justifyContent: 'flex-end' }}>
          <Button onPress={
            ()=>{
              if(this.state.selected == 'user'){
                nav.navigate('App')
              }
              else{
                nav.navigate('DriverForm')
              }
            }
          } activeOpacity={.9} rounded block style={{ backgroundColor: '#15588D', }}>
            <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>موافق</Text>
          </Button>
        </View>
      </AppTemplate>
    );
  }
}

const styles = {
  box: {
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 20,
    width: '80%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    color: '#1B5686'
  },
  text: {
    marginTop: '9%',
    color: '#266A8F',
    fontSize: 18
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#15588D',
    bot: 0,
    position: 'absolute'
  }
}
