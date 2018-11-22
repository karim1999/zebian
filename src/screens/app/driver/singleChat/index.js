import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import { Button, Container, Icon, List, ListItem } from "native-base";
import _ from "lodash";
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {connect} from "react-redux";
import {setUser} from "../../../../reducers";
import firebase from "react-native-firebase";
import AppTemplate from '../../appTemplate';
import {SERVER_KEY} from "../../../../constants/config";
import axios from "axios/index";
import Stars from 'react-native-stars';
import Modal from "react-native-modal";
var moment = require('moment')
class SingleChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.navigation.state.params,
			message: "",
			fetch:0,
			logs: [],
			menu: false,
      stars:5,
      isModalVisible: false,
			isModalVisible2:false
        };
	}
	renderBubble (props) {
		return (
			<Bubble
				{...props}
			/>
		)
	}
	toggleMenu() {
		this.setState({
			menu: !this.state.menu
		})
	}
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
		firebase.database().ref('/chat/'+this.state.key).on('value', data => {

			this.setState({
				logs: _.sortBy(_.values(data.val()),['createdAt'])
			})
			 // alert(JSON.stringify())

		});
		firebase.database().ref('/orders/'+this.state.order_id).on('value', data => {
				this.setState({
						order: data,
						fetch:1
				})

		});
	}
    toggleMenu() {
        this.setState({
            menu: !this.state.menu
        })
    }
		cancel = (order)=>{
      firebase.database().ref('/orders/').child(order.key).once('value', data => {
        order2 = data.val();
      time = Math.round(moment().diff(moment(order2.accepted_time), 'minutes', true))

      if(time <= 5){
        order = this.state.order;
        orderData= {
            status : 3
        }
        firebase.database().ref('/orders/' + order.key).update(orderData);
      }
      else {
        orderData= {
            status : 4,
        }
        firebase.database().ref('/orders/' + order.key).update(orderData);

        // balance = this.props.user.balance ?this.props.user.balance :0 ;
        // minPrice = Math.round(order2.minPrice);
				//
        // newBalance = balance - minPrice;
				//
        // userData = {
        //     balance : newBalance
        // }
        // firebase.database().ref('/users/' + this.props.user.uid).update(userData);
      }
      _toggleModal2();

    });
    }
    review(){
		let stars= (this.state.user.stars)? this.state.user.stars : 0;
		let num_reviews= (this.state.user.num_reviews)? this.state.user.num_reviews : 0;
        let new_stars = (stars + this.state.stars)/(num_reviews+1);
		let new_num_reviews= num_reviews+1;
        let driverData = {
            stars:new_stars,
			num_reviews: new_num_reviews
        };
        firebase.database().ref('/users/' + this.state.user.uid).update(driverData);
        firebase.database().ref('/offers/' + this.state.key + '/reviewed').set(true);
        this._toggleModal();
    }
    // componentDidUnMount() {
	//     this.state.ref.off('value');
	// }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
		_toggleModal2 = () => this.setState({ isModalVisible2: !this.state.isModalVisible2 });

    render() {
		return (
			<AppTemplate  right={true} toggleMenu={() => this.toggleMenu()} isChat back navigation={this.props.navigation} name={this.state.title}>
                {this.state.menu && (
                    <List style={{backgroundColor: "#ffffff", right: 0}}>
                        {
                            (this.state.end_date && !this.state.reviewed) &&
                            (
                                <ListItem
                                    onPress={()=>{
                                        this._toggleModal();
                                    }}
                                    style={{justifyContent: "flex-end"}}
								>
                                    <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:18,fontWeight:'bold',textAlign:'center'}}>قيم هذا السائق</Text>
                                </ListItem>
                            )
                        }
												<ListItem
														onPress={()=>{
																this._toggleModal2();
														}}
														style={{justifyContent: "flex-end"}}
				>
														<Text style={{fontFamily:'Droid Arabic Kufi',fontSize:18,fontWeight:'bold',textAlign:'center'}}>الغاء الرحله </Text>
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
																(this.state.order.val().status == 2)?
																(<View style={{backgroundColor:'green',height:40}}>
																		<Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>تم التوصيل </Text>
																</View>):(<View style={{backgroundColor:'red',height:40}}>
																		<Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>تم الغاء الطلب</Text>
																</View>)):null

								}
				<GiftedChat
					messages={this.state.logs}
					onSend={data => this.addNewMessage(data)}
					alwaysShowSend={true}
					placeholder="Send a message..."
					isAnimated={true}
                    inverted={false}
					showUserAvatar={true}
					renderBubble={(props) => this.renderBubble(props)}
					user={{
						_id: this.props.user.uid,
						name: this.props.user.displayName,
						avatar: this.props.user.photoURL
					}}
				/>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={{ height: '30%', width: '90%', backgroundColor: 'white', alignSelf: 'center',alignItems:'center', justifyContent: 'center', flexDirection: 'column',borderRadius:10 }}>
                        <Text style={{fontWeight: 'bold',  color: '#266A8F',fontSize: 13,fontFamily:'Droid Arabic Kufi'}}>قيم العميل </Text>
                        <Stars
                            default={this.state.stars}
                            count={5}
                            half={true}
                            starSize={50}
                            update={(stars)=>{this.setState({stars})}}

                            fullStar={<Icon type='MaterialCommunityIcons' name={'star'} style={[styles.myStarStyle]} />}
                            emptyStar={<Icon type='MaterialCommunityIcons' name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                            halfStar={<Icon type='MaterialCommunityIcons' name={'star-half'} style={[styles.myStarStyle]} />}
                        />

                        <Button onPress={()=> 	this.review()} block rounded style={{ backgroundColor: 'green', alignSelf: 'center', marginTop: 15,margin:10,padding:10, }}>
                            <Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>قيم العميل</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>

                    </View>
                </Modal>
								<Modal
                    isVisible={this.state.isModalVisible2}
                    onBackdropPress={() => this.setState({ isModalVisible2: false })}
                	>
                    <View style={{ height: '30%', width: '90%', backgroundColor: 'white', alignSelf: 'center',alignItems:'center', justifyContent: 'center', flexDirection: 'column',borderRadius:10 }}>
                        <Text style={{fontWeight: 'bold',  color: '#266A8F',fontSize: 18,fontFamily:'Droid Arabic Kufi'}}>الغاء الرحله</Text>
                        <Text style={{ color: 'gray',fontFamily:'Droid Arabic Kufi', fontSize: 12, fontWeight: 'bold',textAlign:'center',width:'90%' }}>
                          اذا كان الالغاء ليس عن تراضي يتم تغريمك العموله
                        </Text>

                        <View style={{flexDirection:'row'}}>
                        <Button onPress={()=>this.cancel(this.state.order)} block rounded style={{ backgroundColor: 'green', alignSelf: 'center', marginTop: 15,margin:10,padding:10, }}>
                            <Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>تاكيد</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator  size="small" color="#000000" />
                            )}
                        </Button>

                        <Button onPress={()=> 	this._toggleModal2()} block rounded style={{ backgroundColor: 'gray', alignSelf: 'center', marginTop: 15,margin:10,padding:10, }}>
                            <Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>الغاء</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>
                        </View>

                    </View>
                </Modal>

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
const styles = StyleSheet.create({
    myStarStyle: {
        color: '#FAC819',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: '#FAC819',
    }
});
