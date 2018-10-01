import React, { Component } from 'react';
import { View, Form, Item, Label, Input, Icon, Button, Text, Card, CardItem, Body } from 'native-base';
import { Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import SignBox from '../../../components/common/signBox'
import SignTemplate from '../signTemplate';
import AutoHeightImage from 'react-native-auto-height-image';

import Zeban from '../../../assets/images/png/zeban.png';
import Zeban1 from '../../../assets/images/png/Zeban1.png';
import Sparkels from '../../../assets/images/png/sparkels.png';
import City from '../../../assets/images/png/city.png';

let { width, height } = Dimensions.get('window');

export default class SignUp extends Component {
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
					<View style={{ flex: 1, flexDirection: 'column', width: '80%', alignSelf: 'center' }}>
						<SignBox onPress={()=>{
							nav.navigate('AccountType')
						}} color="#15588e" icon="facebook" text="تسجيل الدخول بواسطه فيسبوك"/>
						<SignBox color="#d24040" icon="google" text="تسجيل الدخول بواسطه جوجل"/>
						<SignBox color="#2ca3bd" icon="mobile" text="تسجيل الدخول بواسطه الجوال"/>
					</View>
					<View style={{flex: 1}}>
						<Button bordered style={{borderColor:'#2AA2B9', backgroundColor:'transparent', borderRadius:12,alignSelf:'center',}}>
							<Text style={{color:'#276A8E', fontSize:15,fontFamily:'Droid Arabic Kufi'}} >ليس الان</Text>
						</Button>
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