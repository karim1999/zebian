import React, { Component } from 'react';
import { View, Button, Text, Toast ,Input} from 'native-base';
import { Dimensions, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import SignBox from '../../../components/common/signBox'
import SignTemplate from '../signTemplate';
import AutoHeightImage from 'react-native-auto-height-image';

import Zeban from '../../../assets/images/png/zeban.png';
import Zeban1 from '../../../assets/images/png/Zeban1.png';
import Sparkels from '../../../assets/images/png/sparkels.png';
import City from '../../../assets/images/png/city.png';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import { setUser } from '../../../reducers';
var moment = require('moment')
let { width, height } = Dimensions.get('window');

class Charge extends Component {
  constructor(props){
    super(props);
    this.state = {
      code:''
    }
  }
  send = ()=>{
    code = this.state.code;
    user_id = this.props.user.uid;
    if(code == ''){
      Toast.show({
          text: "الرجاء ادخال رقم التحويل",
          buttonText: "OK",
          type: "danger",
          duration: 5000
      });
    }
    else {
      var now = moment().format('MMMM Do YYYY, h:mm:ss a');
      charge = {
        user_name: this.props.user.displayName,
        user_id: this.props.user.uid,
        code: this.state.code,
        date:now,
      }
      var addCharge=   firebase.database().ref('charges/').push(
          charge
        )
        Toast.show({
         text: "تم ارسال طلب الشحن بنجاح",
         buttonText: "OK",
         type: "success",
         duration: 5000
       });
       this.props.navigation.navigate('App');
    }
  }
	render() {
		const nav = this.props.navigation
		return (
			<SignTemplate navigation={nav}>
				<View style={{justifyContent: 'center', flex: 1}}>
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 40 }}>
						<AutoHeightImage
							width={width / 2}
							source={Zeban}
							style={{ alignSelf: 'center' }}
						/>
						<AutoHeightImage
							width={width / 4}
							source={Zeban1}
							style={{ alignSelf: 'center'}}
						/>
					</View>
					<View style={{ flex: .5, flexDirection: 'column', width: '80%', alignSelf: 'center' }}>
          <Text style={{ color: '#22688D', textAlign:'center',fontFamily:'Droid Arabic Kufi',fontSize:19 }}>الرجاء تحويل المبلغ الي هذا الحساب ( 123456789)</Text>
          <Input style={{fontSize: 16,fontFamily:'Droid Arabic Kufi',textAlign:'center' }} value={this.state.code} onChangeText={(code)=>this.setState({code})} placeholder="رقم التحويل" />
          <Button onPress={()=> 	this.send()} block rounded style={{ backgroundColor: 'gray', alignSelf: 'center',padding:10 }}>
              <Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>ارسال</Text>
              {this.state.isLoading && (
                  <ActivityIndicator style={{}} size="small" color="#000000" />
              )}
          </Button>

					</View>
					<View style={{flex: .5}}>

						<TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}>
							<Text style={{ color: '#22688D', textAlign:'center',fontFamily:'Droid Arabic Kufi',fontSize:13 }}>استخدامك لهذا التطبيق يعني موافقتك علي</Text>
							<Text style={{ color: '#22688D', fontWeight:'bold', textAlign:'center',fontFamily:'Droid Arabic Kufi',fontSize:13}}>الشروط والاحكام</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SignTemplate>
		);
	}
}
const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = {
	setUser
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Charge);
