import React, { Component } from 'react';

import { View, Text, Button, Card, CardItem, Body, } from 'native-base';
import AppTemplate from '../appTemplate';
import Alarm from '../../../assets/images/png/alarm.png'
import Warning from '../../../assets/images/png/warning.png'
import AutoHeightImage from 'react-native-auto-height-image';

export default class OffersLoading extends Component {
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate navigation={nav} name="العروض">
        <View style={{ justifyContent: 'center' }}>
          <Card style={{ width: '90%', alignSelf: 'center' }}>
            <CardItem header style={{ justifyContent: 'center' }}>
              <AutoHeightImage
                width={40}
                source={Warning}
                style={{ alignSelf: 'center' }}
              />
              <Text style={{ color: '#266A8F', fontSize: 20, marginHorizontal: 5 }}>لا يوجد اي مندوبين حاليا</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'center' }}>
              <Body style={{ justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <AutoHeightImage
                    width={100}
                    source={Alarm}
                    style={{ alignSelf: 'center', marginBottom: 10 }}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{ color: '#266A8F', fontSize: 25, fontWeight: 'bold' }}>
                    جرب معنا خدمه ذيبان فذعه
                  </Text>
                </View>
              </Body>
            </CardItem>
            <CardItem footer style={{ alignSelf: 'center', width: '60%' }}>
              <Button rounded block style={{ flex: 1, backgroundColor: '#266A8F' }}>
                <Text style={{ fontSize: 20 }}>جرب ذلك</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      </AppTemplate>
    );
  }
}

