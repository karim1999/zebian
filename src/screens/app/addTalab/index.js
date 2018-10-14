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

let { width, height } = Dimensions.get('window');


class AddTalab extends Component {
	constructor(props){
		super(props);
		this.state= {
			isModalVisible: false,
			price: 0,
			order: {...this.props.navigation.state.params},
			isSubmitted: false,
			isLoading: false
		}
	}
	submit(){
		if(!this.state.isLoading){
			if(this.state.price >= this.state.order.minPrice && this.state.price <= this.state.order.maxPrice){
				this.setState({
					isLoading: true
				});
				firebase.database().ref('/offers').push({
					user_id: this.props.user.uid,
					price: this.state.price,
					order_id: this.state.order.key,
					status: 0
				}, error=>{
					Toast.show({
						text: "تم اضافة عرضك بنجاح",
						buttonText: "موافق",
						type: "success"
					});
					this.setState({
						isLoading: false
					})
				});
				this.props.navigation.goBack();
			}else{
				Toast.show({
					text: "يجب ان يكون السعر اكبر من القيمة الصغري واقل من القيمة العظمي",
					buttonText: "موافق",
					type: "danger"
				});
			}
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
	}
	_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate back navigation={nav} name="اضافه العرض">
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
				{!this.state.isSubmitted && (
					<View style={{ width: '90%', alignSelf: 'center' }}>
						<Form style={{ flex: 1, borderRadius: 5 }} >
							<Item style={{height: 70, flex: 1}}>
								<Input value={this.state.price} style={{textAlign: "right"}} onChangeText={(price) => this.setState({price})}
								       keyboardType='phone-pad'
								/>
								<Label>السعر</Label>
								<Icon type="FontAwesome" name='pencil' />
							</Item>
						</Form>
						<View style={{ width: '60%', alignSelf: 'center' }}>
							<Button onPress={()=> this.submit()} block rounded style={{ backgroundColor: '#15588D', alignSelf: 'center', marginTop: 15 }}>
								<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>اضافه عرض</Text>
								{this.state.isLoading && (
									<ActivityIndicator style={{}} size="small" color="#000000" />
								)}
							</Button>
						</View>
					</View>
				)}
				<Modal
					isVisible={this.state.isModalVisible}
					onBackdropPress={() => this.setState({ isModalVisible: false })}
				>
					<View style={{ height: '60%', width: '90%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }}>
						<View style={{ flex: .1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
							<Text style={{ fontSize: 25, color: '#236C8E', textAlign: 'center', fontWeight: 'bold' }}>
								سبب الغاء الطلب
							</Text>
						</View>
						<View style={{ flex: .5, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', }}>
							<View style={{ flex: 1, flexDirection: 'column', width: '90%' }}>
								<ModalListItem text='تاخر السائق عن الوصول' />
								<ModalListItem text='تاخر السائق في الاستلام' />
								<ModalListItem text='لم اعد اريد التوصيله' />
								<ModalListItem text='اخري' />
							</View>
						</View>
						<View style={{ flex: .2, flexDirection: 'row', width: '60%', justifyContent: 'center', alignSelf: 'center' }}>
							<Button rounded block onPress={this._toggleModal} style={{ flex: 1, alignSelf: 'center', backgroundColor: '#15588D' }}>
								<Text style={{ color: 'white', fontSize: 25, }}>الغاء الطلب</Text>
							</Button>
						</View>
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
)(AddTalab);
