import React, { Component } from 'react';
import {Button, Text, View, List, ListItem, Left, Right, CheckBox, Toast, Switch,Input} from 'native-base';
import AppTemplate from '../../appTemplate';
import Modal from "react-native-modal";
import ModalListItem from '../../../../components/common/modalListItem';
import Coupon from '../../../../assets/images/png/coupon.png'
import Listitem from '../../../../components/common/ListItem'
import Twon from '../../../../components/common/twon'
import firebase from 'react-native-firebase'
import {setUser} from "../../../../reducers";
import {connect} from "react-redux";
import _ from "lodash";
import {FlatList,Share} from "react-native";

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.Label,
			cities: [],
			chosen: this.props.user.cities ? this.props.user.cities : [],
			allow: this.props.user.allow,
			driver: this.props.user.driver,
			coupon:''
		};
	}

	press_share = ()=>{
			Share.share({
					message: 'رحله مجانيه عند اضافه هذا الكود '+this.props.user.uid ,
					title: 'ذيبان'
			}, {
					// Android only:
					dialogTitle: 'ذيبان',
					// iOS only:
					excludedActivityTypes: [
							'com.apple.UIKit.activity.PostToTwitter'
					]
			})
	}

	onValueChange2(value) {
		this.setState({
			selected2: value
		});
	}
	coupon = ()=>{
		if(this.props.user.coupon == 0){
			if(this.state.coupon != ''){
				firebase.database().ref('/users/'+this.state.coupon).once('value',(users)=>{
					if(JSON.stringify(users) !== null && JSON.stringify(users) != 'null'){
						firebase.database().ref('/users/'+this.props.user.uid).update({coupon:1,used_coupon:0})
						Toast.show({
								text: "تم استخدام الكود بعد ٣٠ رحله تاخذ رحله بدون عموله",
								buttonText: "OK",
								type: "success",
								duration: 5000
						});
					}else {
						Toast.show({
								text: "الكود غير صحيح",
								buttonText: "OK",
								type: "danger",
								duration: 5000
						});
					}
				})
			}
			else {
				Toast.show({
						text: "الرجاء ادخال كود",
						buttonText: "OK",
						type: "danger",
						duration: 5000
				});
			}
		}
		else {
			Toast.show({
					text: "لقد استخدمت خاصيه الكود من قبل",
					buttonText: "OK",
					type: "danger",
					duration: 5000
			});
		}



		}

	state = {
		isModalVisible: false
	};

	_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
	changeCities(){
        firebase.database().ref('/users/'+this.props.user.uid+'/cities/').set(this.state.chosen);
        Toast.show({
            text: "تم تغيير المدن بنجاح",
            buttonText: "OK",
            type: "success",
            duration: 5000
        });

        this._toggleModal()
	}
	componentDidMount(){
        firebase.database().ref('/cities/').on('value', data => {
        	this.setState({
				cities: _.map(data.val(), (value, key)=> {
                    return {...value, key};
                })
			})
		});
	}
	setAllow(){
        firebase.database().ref('/users/'+this.props.user.uid+'/allow/').set(this.props.user.allow == 1 ? 0 : 1);
        this.setState({
			allow: this.state.allow == 1 ? 0 : 1
		})
	}
	async setDriver(){
        this.setState({
            driver: !this.props.user.driver
        });
        await firebase.database().ref('/users/'+this.props.user.uid+'/driver/').set(!this.props.user.driver);
        this.props.navigation.navigate("Check");
	}
	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate navigation={nav} name="الاعدادات">

				<View style={{ flex: 1, flexDirection: 'column', width: '95%', alignSelf: 'center' }}>
					<List>
						{/*<Listitem RightData='نوع الحساب' Label='سائق' Label2='مستخدم' />*/}
						<Listitem RightData='رقم العضويه' LeftData={this.props.user.uid} onPress={()=> {this.press_share()}} press={true} />
						<Listitem RightData='عدد الرحلات' LeftData={this.props.user.num_reviews ? this.props.user.num_reviews : 0}  />

                        <ListItem selected>
                            <Left style={{flex: 1}}>
                                <Switch onValueChange={()=> this.setDriver()} value={this.state.driver} />
                                <Text style={{color: '#B1B1B1', fontFamily: 'Droid Arabic Kufi'}}></Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Text style={{
                                    color: '#727272',
                                    fontSize: 16,
                                    fontFamily: 'Droid Arabic Kufi'
                                }}>سائق</Text>
                            </Right>
                        </ListItem>
						<Listitem RightData='الرصيد' LeftData={this.props.user.balance ? this.props.user.balance : 0} />
                        <ListItem selected>
                            <Left style={{flex: 1}}>
                                <Switch onValueChange={()=> this.setAllow()} value={this.state.allow == 1} />
								<Text style={{color: '#B1B1B1', fontFamily: 'Droid Arabic Kufi'}}></Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Text style={{
                                    color: '#727272',
                                    fontSize: 16,
                                    fontFamily: 'Droid Arabic Kufi'
                                }}>استقبال الطلبات</Text>
                            </Right>
                        </ListItem>

						{/*<Listitem RightData='استقبال الطلبات' Switch={true} />*/}
						{/*<Listitem RightData='تغيير نوع السياره' Label='سيدان' Label2='بيك أب' />*/}
						<ListItem selected>
							<Left style={{ flex: 1 }}>
								<Button onPress={this._toggleModal} rounded style={{ backgroundColor: '#266A8F', height: 30 }}>
									<Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
										اختيار
									</Text>
								</Button>
							</Left>
							<Right style={{ flex: 1 }}>
								<Text style={{ color: '#727272', fontSize: 16,fontFamily:'Droid Arabic Kufi' }}>المدن المفضله لي</Text>
							</Right>
						</ListItem>


						<ListItem selected>
							<Left style={{ flex: 1 }}>
								<Button onPress={this.coupon} rounded style={{ backgroundColor: '#266A8F', height: 30 }}>
									<Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
										موافق
									</Text>
								</Button>
							</Left>
							<Right style={{ flex: 1 }}>
							<Input style={{  fontSize: 16,fontFamily:'Droid Arabic Kufi' }} value={this.state.coupon} onChangeText={(coupon)=>this.setState({coupon})} placeholder="الكوبون" />

							</Right>
						</ListItem>

						<Listitem press={true} onPress={()=>{
							nav.navigate('ComplainsDriver')
						}} RightData='الشكاوي' />
						<Listitem press={true} onPress={()=>{
							nav.navigate('Charge')
						}} RightData='شحن الرصيد' />
						<Listitem press={true} onPress={()=>{
							nav.navigate('Policy')
						}}  RightData='سياسه الخصوصيه' />
						<Listitem press={true} onPress={()=>{
							firebase.auth().signOut()
						}}  RightData='تسجيل الخروج' />
					</List>
				</View>
				<Modal
					isVisible={this.state.isModalVisible}
					onBackdropPress={() => this.setState({ isModalVisible: false })}
				>
					<View style={{ height: '50%', width: '90%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'space-evenly' }}>
						<View style={{ flex: .8, width: '90%', margin: 10, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', flexWrap: 'wrap', padding:10 }}>
                            <FlatList
                                ListEmptyComponent={
                                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>لا يوجد مدن حاليا</Text>
                                }
                                data={this.state.cities}
                                renderItem={({item}) => (
                                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center' }}>
                                        <Text style={{color:'#707070', fontSize:15}}>{item.name}</Text>
                                        <CheckBox checked={this.state.chosen[item.key]} onPress={()=> this.setState({chosen: {...this.state.chosen, [item.key]: (this.state.chosen[item.key]? false : true)}})} />
                                    </View>
                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
						</View>
						<View style={{ flex: .2, flexDirection: 'row', width: '60%', justifyContent: 'center', alignSelf: 'center' }}>
							<Button rounded block onPress={()=>this.changeCities()} style={{ flex: 1, alignSelf: 'center', backgroundColor: '#15588D' }}>
								<Text style={{ color: 'white', fontSize: 25, }}>حفظ المدن</Text>
							</Button>
						</View>
					</View>
				</Modal>
			</AppTemplate>
		);
	}
}

const styles = {

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
)(Settings);
