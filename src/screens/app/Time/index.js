import React, { Component } from 'react';
import { Picker } from 'react-native';
import { View ,Button} from 'native-base';
import AppTemplate from '../appTemplate';
import TimePicker from 'react-native-modal-datetime-picker';
import {TouchableOpacity,Text} from 'react-native'
export default class Time extends Component {
  constructor(props){
    super(props);
    this.state = {
      language:1,
      isDateTimePickerVisible: true,

    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate back={true} navigation={nav} name="تحديد وقت التسليم">
        <View style={{ flex: 1 }}>
          <Button rounded onPress={this._showDateTimePicker} style={{ backgroundColor: '#15588D', alignSelf: 'center', alignItems: 'center', marginVertical: 30, paddingRight: 20, paddingLeft: 20 }}>
            <Text style={{ fontSize: 18,color:'white', textAlign: 'center',fontFamily:'Droid Arabic Kufi' }}>تعديل الوقت</Text>
          </Button>

          <TimePicker
            mode='time'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>

      </AppTemplate>
    );
  }
}


