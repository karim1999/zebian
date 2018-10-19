import React, { Component } from 'react';
import { Picker } from 'react-native';
import { View ,Button} from 'native-base';
import AppTemplate from '../appTemplate';
import TimePicker from 'react-native-modal-datetime-picker';
import {TouchableOpacity,Text} from 'react-native'
import {connect} from "react-redux";
import {setOrderTime} from "../../../reducers";

class Time extends Component {
  constructor(props){
    super(props);
    this.state = {
      language:1,
      isDateTimePickerVisible: true,
      date:''
    }
  }

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
    alert(this.state.date)
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({date})
    // AsyncStorage.setItem('date',''+date)

    this._hideDateTimePicker();
  };

  accept = ()=>{
    this.props.setOrderTime(''+this.state.date);
    this.props.navigation.navigate('Home')
  }
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate back={true} navigation={nav} name="تحديد وقت التسليم">
        <View style={{ flex: 1 }}>
          <Button rounded onPress={this._showDateTimePicker} style={{ backgroundColor: '#15588D', alignSelf: 'center', alignItems: 'center', marginVertical: 30, paddingRight: 20, paddingLeft: 20 }}>
            <Text style={{ fontSize: 18,color:'white', textAlign: 'center',fontFamily:'Droid Arabic Kufi' }}>تعديل الوقت</Text>
          </Button>

          <TimePicker
            mode='datetime'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <View style={{ flexDirection: 'column', alignSelf: 'center', height: 250, width: '50%',justifyContent:'flex-end' }}>

          <Button onPress={()=>this.accept()} rounded block style={{ backgroundColor: '#15588D',color:'white' }}>
            <Text style={{fontSize:18,fontFamily:'Droid Arabic Kufi',color:'white'}}>موافق</Text>
          </Button>
          </View>
        </View>

      </AppTemplate>
    );
  }
}
const mapStateToProps = ({ order }) => ({
    order,
});

const mapDispatchToProps = {
    setOrderTime,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Time);
