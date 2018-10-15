import React from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StyleSheet,
	View,
} from 'react-native';
import axios from 'axios';
import { SERVER_URL } from "../constants/config";
import {connect} from "react-redux";
import {setUser} from "../reducers";
import firebase from 'react-native-firebase'
import AccountSetting from "../screens/app/AccountSetting";
import OffersLoading from "../screens/app/offersLoading";

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	// Fetch the token from storage then navigate to our appropriate place
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				firebase.database().ref('/users/'+user.uid).once('value').then ((data) => {
					this.props.setUser(data.val());
					// this.props.setUser(user);
					this.props.navigation.navigate('App')
				});
				// firebase.database().ref('/users/'+user.uid).off("value");
			}else{
				this.props.navigation.navigate('Auth')
			}
		})
	};
	// Render any loading content that you like here
	render() {
		return (
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);

	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
});
const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = {
	setUser
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthLoadingScreen);
