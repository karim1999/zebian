import React, { Component } from 'react';
import { Text, View } from "react-native";
import { Button, Container, Icon, List, ListItem } from "native-base";
import _ from "lodash";
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {connect} from "react-redux";
import {setUser} from "../../../../reducers";
import firebase from "react-native-firebase";
import AppTemplate from '../../appTemplate';
import {SERVER_KEY} from "../../../../constants/config";
import axios from "axios/index";

class SingleChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.navigation.state.params,
			message: "",
			logs: [],
			menu: false
		};
	}
	renderBubble (props) {
		return (
			<Bubble
				{...props}
			/>
		)
	}
	// toggleMenu() {
	// 	this.setState({
	// 		menu: !this.state.menu
	// 	})
	// }
	addNewMessage(data){
		let newPostKey = firebase.database().ref('/chat/').child(this.state.key).push(data[0]);
        axios.post("https://fcm.googleapis.com/fcm/send", {
            data: {
                type: "msg",
                toast: false,
				toast_type: "success",
				toast_text: "New message from " + this.props.user.displayName,
                navigation: true,
				navigation_data: {...this.props.navigation.state.params, title: this.props.user.displayName, token: this.props.user.token},
				navigation_name: "SingleChat"
            },
            notification: {
                title: this.props.user.displayName,
                text: _.truncate(data[0].text)
            },
            to: this.state.token ? this.state.token : ""
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + SERVER_KEY
            }
        }).then(response => {
            // alert("done")
        }).catch(error => {
            // alert("error1")
        });
    }
	componentDidMount(){
        firebase.database().ref('/offers/'+this.state.key).update({
            chat: true
        });
		firebase.database().ref('/chat/').child(this.state.key).on('value', data => {
			this.setState({
				logs: _.values(data.val())
			})
		});
	}
    toggleMenu() {
        this.setState({
            menu: !this.state.menu
        })
    }

    // componentDidUnMount() {
	//     this.state.ref.off('value');
	// }
	render() {
		return (
			<AppTemplate right={true} toggleMenu={() => this.toggleMenu()} isChat back navigation={this.props.navigation} name={this.state.title}>
                {this.state.menu && (
                    <List style={{backgroundColor: "#FFFFFF", right: 0}}>
                        <ListItem onPress={alert("working")} style={{justifyContent: "flex-end"}}>
                            <Text style={{textAlign: "right"}}>اختار</Text>
                        </ListItem>
                    </List>
                )}
								{
									(this.state.fetch == 1)?(
									(this.state.order.val().status == 0 )?
									(<View style={{backgroundColor:'gray',height:40}}>
										<Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>ب انتظار قبول عرض</Text>
									</View>)
									:
									(this.state.order.val().status == 1)?
									(<View style={{backgroundColor:'orange',height:40}}>
										<Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>جاري التوصيل</Text>
									</View>)
									:
									(<View style={{backgroundColor:'green',height:40}}>
										<Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>تم التوصيل </Text>
									</View>)):null

								}
				<GiftedChat
					messages={this.state.logs}
					onSend={data => this.addNewMessage(data)}
					alwaysShowSend={true}
					placeholder="Send a message..."
					isAnimated={true}
                    inverted={true}
					showUserAvatar={true}
					renderBubble={(props) => this.renderBubble(props)}
					user={{
						_id: this.props.user.uid,
						name: this.props.user.displayName,
						avatar: this.props.user.photoURL
					}}
				/>
			</AppTemplate>
		);
	}
}
const mapStateToProps = ({ user }) => ({
	user
});

const mapDispatchToProps = {
	setUser
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleChat);
