import React, { Component } from 'react';
import { Button, Text, View } from 'native-base';
import AppTemplate from '../appTemplate';
import Square from '../../../components/common/square';



export default class UserAccount extends Component {
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate navigation={nav} name="حدد نوع السياره">
        <View style={{ flexDirection: 'column', flex: 1, marginTop:30 }}>
          <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', flex: 1 }}>
            <Square Img={Pickup} InnerText='بيك أب' width={100} />
            <Square Img={Car} InnerText='سيدان' width={100} />
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignSelf: 'center', height: 250, width: '50%',justifyContent:'flex-end' }}>
          <Button rounded block style={{ backgroundColor: '#15588D', }}>
            <Text style={{fontSize:20}}>موافق</Text>
          </Button>
        </View>
      </AppTemplate>
    );
  }
}
