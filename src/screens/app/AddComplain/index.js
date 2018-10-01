import React, { Component } from 'react';
import { Form, View, Text, Textarea, Button, Icon } from 'native-base';
import AppTemplate from '../appTemplate'


export default class AddComplain extends Component {
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate back={true} navigation={nav} name="ارسال شكوي">
        <View style={{ flexdirection: 'row' }}>
          <Form style={{ marginHorizontal: 14 }}>
            <View  >
              <Text style={{ color: '#2A6C91', marginTop: 10, alignSelf: 'flex-end', fontSize: 20, marginRight: 5, fontWeight: 'bold' }} >عنوان الشكوي</Text>
            </View>
            <Textarea style={{ borderRadius: 6, backgroundColor: 'white' }} rowSpan={2} bordered placeholder="" />
            <View style={{}} >
              <Text style={{ color: '#2A6C91', marginTop: 10, alignSelf: 'flex-end', fontSize: 20, marginRight: 5, fontWeight: 'bold' }} >نص الشكوي</Text>
            </View>
            <Textarea style={{ borderRadius: 6, backgroundColor: 'white' }} rowSpan={6} bordered placeholder="" />
          </Form>
        </View>
        <View style={{ flexdirection: 'row', justifyContent:'center',alignItems:'center', marginTop:20}}>
          <Button iconLeft style={{ alignSelf: 'center', borderRadius:15, backgroundColor:'#15588D' }} >
            <Icon type="FontAwesome" name="check-circle" />
            <Text style={{fontSize:20, fontWeight:'bold'}}>ارسال</Text>
          </Button>
        </View>
      </AppTemplate>
    );
  }
}
