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
import {Toast} from "native-base";
import type { Notification } from 'react-native-firebase';

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			notificationEnabled: false
		}
	}
	async askForNotificationPermission(){
        await firebase.messaging().hasPermission()
            .then(enabled => {
                if (!enabled) {
                    firebase.messaging().requestPermission()
                        .then(() => {
                            this.notificationListener();
                            Toast.show({
                                text: "تم تفعيل خاصية الاشعارات",
                                buttonText: "موافق",
                                type: "success"
                            })
                        })
                        .catch(error => {
                            Toast.show({
                                text: "تم الغاء خاصية الاشعارات",
                                buttonText: "موافق",
                                type: "danger"
                            })
                        });
                }else{
                    this.notificationListener();
                }
            });
	}
	notificationListener(){
        this.setState({
            notificationEnabled: true
        })
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
        });
	}
	// Fetch the token from storage then navigate to our appropriate place
	async componentDidMount() {
		// this.askForNotificationPermission();
		await firebase.auth().onAuthStateChanged(user => {
			if(user){
				// if(this.state.notificationEnabled){
                 //    firebase.messaging().getToken()
                 //        .then(fcmToken => {
                 //            if (fcmToken) {
                 //                firebase.database().ref('/users/'+user.uid).update({
                 //                    token: fcmToken,
                 //                });
                 //            } else {
                 //                // user doesn't have a device token yet
                 //            }
                 //        });
                 //    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                 //        firebase.database().ref('/users/'+user.uid).update({
                 //            token: fcmToken,
                 //        });
                 //    });
				// }
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
    componentWillUnmount() {
        this.onTokenRefreshListener();
        this.notificationDisplayedListener();
        this.notificationListener();
    }
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
