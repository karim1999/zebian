import React, { Component } from 'react';
import {Form, Text, Button, Icon, View, Input, Item, Toast, DatePicker} from 'native-base';
import AppTemplate from '../appTemplate';
import FormInput from '../../../components/common/input';
import Square from '../../../components/common/square';
import {ActivityIndicator, TouchableOpacity} from 'react-native'
import CarSelected from '../../../assets/images/png/CarSelected.png';
import PickupSelected from '../../../assets/images/png/PickupSelected.png';
import CarUnSelected from '../../../assets/images/png/CarUnSelected.png';
import PickupUnSelected from '../../../assets/images/png/PickupUnSelected.png';
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
var moment = require('moment');

class AccountType extends Component {
	constructor(props){
		super(props);
		this.state= {
			pickup:true,
			car:false,
			selected:'pickup',
			name: this.props.user.displayName,
			phone: "",
			birth: moment(),
			licenseImg: "",
			carImg: "",
			isSubmitting: false
		}
	}
	componentDidMount(){
		if(this.props.user.drivingStatus && this.props.user.drivingStatus == 1){
			this.props.navigation.navigate("DriverHome");
		}
	}
	chooseLicenseImg(){
		let options = {
			title: "Choose Image",
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else {
				console.log(response.data);
				this.setState({
					licenseImg: response.uri
				});
			}
		});
	}
	chooseCarImg(){
		let options = {
			title: "Choose Image",
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else {
				console.log(response.data);
				this.setState({
					carImg: response.uri
				});
			}
		});
	}
	submit(){
		if(this.state.name == "" || this.state.phone == "" || this.state.birth == "" || this.state.licenseImg == "" || this.state.carImg == ""){
			Toast.show({
				text: "جميع الحقول مطلوبة",
				buttonText: "موافق",
				type: "danger"
			})
		}else{
			this.setState({
				isSubmitting: true
			})
			firebase.storage()
				.ref("/carImages/"+this.props.user.uid)
				.putFile(this.state.carImg)
				.then(data => {
					firebase.storage()
						.ref("/licenseImages/"+this.props.user.uid)
						.putFile(this.state.licenseImg)
						.then(data => {
							firebase.database().ref('/users/'+this.props.user.uid).update({
								displayName: this.state.name,
								phone: this.state.phone,
								birth: this.state.birth.format("DD/MM/YYYY"),
								car: this.state.selected,
								cities: false,
                                allow: 1,
								accepted: false,
								drivingStatus: 1
							});
							this.setState({
								isSubmitting: false
							})
                            this.props.navigation.navigate('DriverTabNavigator')
                            Toast.show({
								text: "تم",
								buttonText: "موافق",
								type: "success"
							})
						})
				})
				.catch(error => {
					Toast.show({
						text: "يرجي المحاولة مرة اخري",
						buttonText: "موافق",
						type: "danger"
					})
				});
		}
	}
	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate back={true} navigation={nav} name="البيانات الشخصيه">
				<Form style={{ width: '80%', alignSelf: 'center' }}>
					<View style={{ flex: 1, flexDirection: 'column' }} >
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={{ textAlign: 'center', color: '#266A8F', fontSize: 18, marginTop: 5, marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>الاسم بالكامل</Text>
						</View>
						<Item>
							<View style={{ flexDirection: 'row' }}>
								<Input placeholder='' value={this.state.name} onChangeText={(name)=> this.setState({name})} style={{ borderWidth: 0.5, borderRadius: 7,height:40,textAlign:'center', borderColor: '#266A8F' }} />
							</View>
						</Item>
					</View>
					<View style={{ flex: 1, flexDirection: 'column' }} >
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={{ textAlign: 'center', color: '#266A8F', fontSize: 18, marginTop: 5, marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>رقم الهاتف</Text>
						</View>
						<Item>
							<View style={{ flexDirection: 'row' }}>
								<Input placeholder='' value={this.state.phone} onChangeText={(phone)=> this.setState({phone})} style={{ borderWidth: 0.5, borderRadius: 7,height:40,textAlign:'center', borderColor: '#266A8F' }} />
							</View>
						</Item>
					</View>
					<View style={{ flex: 1, flexDirection: 'column' }} >
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={{ textAlign: 'center', color: '#266A8F', fontSize: 18, marginTop: 5, marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>تاريخ الميلاد</Text>
						</View>
						<Item>
							<View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(1900, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={this.state.birth.format("DD/MM/YYYY")}
                                    textStyle={{ color: "black", marginLeft: "40%"}}
                                    placeHolderTextStyle={{ color: "#d3d3d3", marginLeft: "40%" }}
                                    onDateChange={(birth)=> this.setState({birth: moment(birth)})}
                                />
							</View>
						</Item>
					</View>
					<Text style={{ textAlign: 'right', color: '#266A8F', fontSize: 18,textAlign:'center', marginTop: '2%',fontFamily:'Droid Arabic Kufi' }}>نوع السياره</Text>
				</Form>
				<View style={{ alignItems: 'center' }}>
					<View style={{ flexDirection: 'column', flex: 1 }}>
						<View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', flex: 1 }}>
							<TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
								()=>{
									this.setState({car:false,pickup:true,selected:'pickup'})
								}
							}
							>
								<Square ImgS={PickupSelected} ImgU={PickupUnSelected} status={this.state.pickup} InnerText='بيك أب' width={90} />
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
								()=>{
									this.setState({car:true,pickup:false,selected:'car'})
								}
							}
							>
								<Square ImgS={CarSelected} ImgU={CarUnSelected} status={this.state.car} InnerText='سيدان' width={90} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
					<Button onPress={()=> this.chooseLicenseImg()} activeOpacity={.9} iconLeft style={styles.btnBot}>
						{
							(this.state.licenseImg) ? (
								<Icon name="md-checkmark-circle" style={{color: "green"}} />
							):(
								<Icon name='add' />
							)
						}
						<Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>ارفق صوره الرخصه</Text>
					</Button>
					<Button onPress={()=> this.chooseCarImg()} activeOpacity={.9} iconLeft style={styles.btnBot}>
						{
							(this.state.carImg) ? (
								<Icon name="md-checkmark-circle" style={{color: "green"}} />
							):(
								<Icon name='add' />
							)
						}
						<Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>ارفق صوره السياره</Text>
					</Button>
					<Button onPress={()=> this.submit()} activeOpacity={.9}  block style={{ backgroundColor: '#15588D',width:'90%',justfyContent:'center',alignItems:'center',alignSelf:'center' }}>
						<Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>موافق</Text>
						{this.state.isSubmitting && (
							<ActivityIndicator style={{}} size="small" color="#000000" />
						)}
					</Button>
				</View>
			</AppTemplate>
		);
	}
}

const styles = {
	btnBot: {
		marginBottom: 10,
		backgroundColor: '#15588D',
		borderRadius: 20,
		alignSelf: 'center',
		paddingRight: '10%',
		paddingLeft: '10%',
	},
	item: {
		borderBottomWidth: 0,
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
)(AccountType);
