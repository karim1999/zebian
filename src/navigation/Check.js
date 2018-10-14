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

class Check extends React.Component {
	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}
	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		if(this.props.user.driver === true){
			this.props.navigation.navigate('DriverNavigator');
		}else if(this.props.user.driver === false){
			this.props.navigation.navigate('ClientNavigator');
		}else{
			this.props.navigation.navigate('AccountType');
		}
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
)(Check);
