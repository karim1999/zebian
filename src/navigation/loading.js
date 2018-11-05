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
import firebase, {Notification, NotificationOpen} from 'react-native-firebase'
import {Toast} from "native-base";

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
	}
    askForNotificationPermission(){
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (!enabled) {
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // this.notificationListener2();
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
                }
                // else{
                //     this.notificationListener2();
                // }
            });
        return true;
    }

    // Fetch the token from storage then navigate to our appropriate place
	async componentDidMount() {
        await this.askForNotificationPermission();
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
            alert("notification displayed")
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            if(notification._data.toast){
                let toast_type= notification._data.toast ? notification._data.toast : "success";
                Toast.show({
                    text: notification._data.toast_text,
                    buttonText: "موافق",
                    type: toast_type
                })
            }
        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            if(notification._data.navigation){
                let navigation_data= notification._data.navigation_data ? notification._data.navigation_data : {};
                this.props.navigation.navigate(notification._data.navigation_name, navigation_data);
            }
        });
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				firebase.database().ref('/users/'+user.uid).on('value', data => {
                    this.props.setUser(data.val());
                    // this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                    //     firebase.database().ref('/users/'+user.uid).update({
                    //         token: fcmToken,
                    //     });
                    // });
					if(this.props.user && this.props.user.uid){
                        firebase.messaging().getToken().then(fcmToken => {
                            if (fcmToken) {
                                firebase.database().ref('/users/'+user.uid).update({
                                    token: fcmToken,
                                });
                            }
                        });
                        this.props.navigation.navigate('App')
                    }
				});
			}else{
				this.props.navigation.navigate('Auth')
			}
		})
	};
    componentWillUnmount() {
        // this.onTokenRefreshListener();
        this.notificationDisplayedListener();
        this.notificationOpenedListener();
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
