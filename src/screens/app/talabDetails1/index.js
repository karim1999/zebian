import React, { Component } from 'react';
import {
	Dimensions,
	Image,
	Text, TouchableHighlight, TouchableOpacity, View, Alert, StyleSheet, ActivityIndicator
} from "react-native";
import {Button, Icon, Card, CardItem, Body, Left, Right, Item, Input, Label, Form, Toast,} from 'native-base';
import Modal from "react-native-modal";
import ModalListItem from '../../../components/common/modalListItem';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import MapComponent from '../../../components/common/map';
import MapMarker from '../../../assets/images/png/map-marker.png';
import Cancel from '../../../assets/images/png/cancel.png';
import Dollar from '../../../assets/images/png/dollar-coin.png';
import firebase from "react-native-firebase";
import _ from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import Stars from 'react-native-stars';

let { width, height } = Dimensions.get('window');


class talabDetails1 extends Component {
	constructor(props){
		super(props);
		this.state= {
			isModalVisible: false,
			price: 0,
			order: this.props.navigation.state.params.order,
			isSubmitted: false,
			isLoading: false,
			driver:[],
			stars:5
		}
	}

	componentDidMount(){
		firebase.database().ref('/orders/'+this.state.order.key).on('value', data => {
			this.setState({
				orders: data.val(),
			});
		});
		firebase.database().ref('/offers/').on('value', data => {
			let result= _.filter(data.val(), offer=>{
				return offer.user_id == this.props.user.uid && offer.order_id == this.state.order.key
			});
			if(result.length >= 1){
				this.setState({
					isSubmitted: true,
				});
			}
		});
		const ref = firebase.database().ref('users/'+this.state.order.driver_id);
ref.once('value',snapshot => {
	 this.setState({ driver: snapshot.val(),
			 });
	})
	}
	_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
	arrived = (order,nav)=>{


		order_id = order.key;
		price = order.price;
		fees = price*.15;
		var driver_id = this.state.driver.key;
		var	balance = this.state.driver.val().balance;
		var	stars = this.state.driver.val().stars;
		var orders = this.state.driver.val().orders;

		if(balance == undefined){
			balance = 0;
		}
		if(stars == undefined){
			stars = 0;
		}
		if(orders == undefined){
			orders = 0;
		}
		if(orders == 0 || orders == undefined){
			new_orders = 1;
		}
		var new_stars = (stars + this.state.stars)/new_orders
		var new_balance = balance - fees;
		orderData= {
			status : 2
		}
		driverData = {
			balance:new_balance,
			stars:new_stars
		}
		firebase.database().ref('/orders/' + order_id).update(orderData);
		firebase.database().ref('/users/' + driver_id).update(driverData);
		nav.navigate('Home')
	}
chat = (order,nav)=>{
  nav.navigate('SingleChatUser',{key:order.offer_id,title:this.state.driver.displayName,token:this.state.driver.token})
   // alert(JSON.stringify(order.driver_id))
}
	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate back navigation={nav} name="تفاصيل الطلب">
				{this.state.isSubmitted && (
					<Button
						style={{width: "100%", alignItems: "center"}} light={true}><Text style={[{flex: 1}, {textAlign: "right"}]}> لقد قمت بوضع عرض علي هذا الطلب </Text>
						<Icon name="ios-information-circle-outline" style={{color: "#000000", fontSize: 25}}/>
					</Button>
				)
				}
				<View style={{ position: 'relative' }}>
					<MapComponent />
					<View style={{ position: 'absolute', width: '90%', bottom: 0, alignSelf: 'center' }}>
						{
							(this.state.order.driverId && this.state.order.driverId == this.props.user.uid) && (
								<Button onPress={this._toggleModal} iconLeft rounded style={{ alignSelf: 'center', height: 24, backgroundColor: '#15588D' }}>
									<Icon style={{ marginLeft: 3 }}>
										<Image style={{width: 16, height: 16}} source={Cancel} />
									</Icon>
									<Text style={{ paddingHorizontal: 20, color: 'white', fontSize: 16 }}>الغاء الطلب</Text>
								</Button>
							)
						}
						<ListCard onPress={()=>this.props.navigation.navigate("GivePlace", {order: this.state.order})} header={'مكان الاستلام '} footer={this.state.order.giveAddress} leftIconSrc={MapMarker} />
						<ListCard onPress={()=>this.props.navigation.navigate("RecievePlace", {order: this.state.order})} header={'مكان التسليم'} footer={this.state.order.recieveAddress} leftIconSrc={MapMarker} />
						<ListCard leftIcon="history" header={'وقت التوصيل المتوقع'} footer={this.state.order.googleTime+" minutes"} leftIconSrc={MapMarker} />
						<ListCard leftIcon="money" header={'المبلغ'} footer={this.state.order.minPrice+"$ : "+this.state.order.maxPrice+"$"} leftIconSrc={MapMarker} />

					</View>
				</View>
				{
					(this.state.order.status == 2)?

					<Text style={{ textAlign:'center', fontWeight: 'bold', color: 'green',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>تم توصيل الطلب</Text>

					:

						<View style={{ width: '95%', alignSelf: 'center' }}>

							<View style={{ width: '100%', alignSelf: 'center',justifyContent:'center',flexDirection:'row' }}>
								<Button onPress={()=> this.chat(this.state.order,nav)} block rounded style={{ backgroundColor: '#15588D', alignSelf: 'center', marginTop: 15,margin:10,padding:10 }}>
									<Text style={{fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>محادثه السائق</Text>
									{this.state.isLoading && (
										<ActivityIndicator style={{}} size="small" color="#000000" />
									)}
								</Button>
								<Button onPress={()=> this._toggleModal()} block rounded style={{ backgroundColor: 'green', alignSelf: 'center', marginTop: 15,margin:10,padding:10, }}>
									<Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>وصل الطلب</Text>
									{this.state.isLoading && (
										<ActivityIndicator style={{}} size="small" color="#000000" />
									)}
								</Button>
							</View>
							</View>

				}



				<Modal
					isVisible={this.state.isModalVisible}
					onBackdropPress={() => this.setState({ isModalVisible: false })}
				>
					<View style={{ height: '30%', width: '90%', backgroundColor: 'white', alignSelf: 'center',alignItems:'center', justifyContent: 'center', flexDirection: 'column',borderRadius:10 }}>
						<Text style={{fontWeight: 'bold',  color: '#266A8F',fontSize: 13,fontFamily:'Droid Arabic Kufi'}}>قيم السائق </Text>
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

						<Button onPress={()=> 	this.arrived(this.state.order,nav)} block rounded style={{ backgroundColor: 'green', alignSelf: 'center', marginTop: 15,margin:10,padding:10, }}>
							<Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>قيم السائق</Text>
							{this.state.isLoading && (
								<ActivityIndicator style={{}} size="small" color="#000000" />
							)}
						</Button>

					</View>
				</Modal>
			</AppTemplate>
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
)(talabDetails1);
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
