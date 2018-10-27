import React, { Component } from 'react';
import {Button, Text, View, List, ListItem, Left, Right, CheckBox, Toast} from 'native-base';
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
import {FlatList} from "react-native";

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.Label,
			cities: [],
			chosen: this.props.user.cities
		};
	}


	onValueChange2(value) {
		this.setState({
			selected2: value
		});
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
	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate navigation={nav} name="الاعدادات">

				<View style={{ flex: 1, flexDirection: 'column', width: '95%', alignSelf: 'center' }}>
					<List>
						{/*<Listitem RightData='نوع الحساب' Label='سائق' Label2='مستخدم' />*/}
						<Listitem RightData='رقم العضويه' LeftData={this.props.user.uid} />
						<Listitem RightData='الرصيد' LeftData={this.props.user.balance ? this.props.user.balance : 0} />
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
						<Listitem press={true} onPress={()=>{
							nav.navigate('ComplainsDriver')
						}} RightData='الشكاوي' />
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
