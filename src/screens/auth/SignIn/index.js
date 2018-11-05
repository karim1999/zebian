import React, { Component } from 'react';
import { View, Button, Text, Toast } from 'native-base';
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

let { width, height } = Dimensions.get('window');

class SignUp extends Component {
	async signInWithFacebook(){
		try {
			const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

			if (result.isCancelled) {
				return false;
			}

			// get the access token
			const data = await AccessToken.getCurrentAccessToken();

			if (!data) {
				alert('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
				return false;
			}

			// create a new firebase credential with the token
			const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

			// login with credential
			const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            let user= firebase.database().ref('users/'+currentUser.user.uid);
            user.once("value").then(snapshot => {
                if(!snapshot.exists()){
                    user.set(currentUser.user);
                }
            });

            Toast.show({
				text: "You have signed in successfully",
				buttonText: "OK",
				type: "success",
				duration: 5000
			});
		} catch (e) {
			Toast.show({
				text: "Please, try again later",
				buttonText: "OK",
				type: "danger",
				duration: 5000
			});
		}
	}
	async signInWithPhone(){

	}
	async signInWithGoogle(){
		try {
			// Add any configuration settings here:
			await GoogleSignin.configure();

			const data = await GoogleSignin.signIn();

			// create a new firebase credential with the token
			const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
			// login with credential
			const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
			let user= firebase.database().ref('users/'+currentUser.user.uid);
			user.once("value").then(snapshot => {
				if(!snapshot.exists()){
					user.set(currentUser.user);
				}
			});
			Toast.show({
				text: "You have signed in successfully",
				buttonText: "OK",
				type: "success",
				duration: 5000
			});
		} catch (e) {
			Toast.show({
				text: "Please, try again later",
				buttonText: "OK",
				type: "danger",
				duration: 5000
			});
		}
	}
	signInWithPhone(){

	}
	async storeItem(key, item) {
		try {
			let jsonOfItem = await AsyncStorage.setItem(key, item);
			return jsonOfItem;
		} catch (error) {
			console.log(error.message);
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
						<SignBox onPress={()=> this.signInWithGoogle()} color="#d24040" icon="google" text="تسجيل الدخول بواسطه جوجل"/>
						<SignBox onPress={()=> this.props.navigation.navigate("Phone")} color="#22688D" icon="phone" text="تسجيل الدخول بواسطه الهاتف"/>
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
)(SignUp);
