import React, { Component } from 'react';
import { Input, Item, View, Text } from 'native-base'


export default class FormInput extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }} >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#266A8F', fontSize: 18, marginTop: 5, marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>{this.props.label}</Text>
        </View>
        <Item>
          <View style={{ flexDirection: 'row' }}>
            <Input placeholder='' style={{ borderWidth: 0.5, borderRadius: 7,height:35,textAlign:'center', borderColor: '#266A8F' }} />
          </View>
        </Item>
      </View>
    );
  }
}

const styles = {
  item: {
    borderBottomWidth: 0,
  }
}
