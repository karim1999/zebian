import React, { Component } from 'react';
import {Text, View,} from 'native-base';
import AppTemplate from '../../appTemplate';
import ListCard from '../../../../components/common/Card2';
import firebase from "react-native-firebase";
import {ActivityIndicator, FlatList, TouchableOpacity} from "react-native";
import _ from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../../reducers";

class Offers extends Component {
	constructor(props){
		super(props);
		this.state= {
			isLoading: false,
			orders: [],
			offers: []
		}
	}
	async componentDidMount(){
		this.setState({
			isLoading: true
		});
		await firebase.database().ref('/offers/').on('value', async data => {
			let first= await _.map(data.val(), (value, key)=> {
				return {...value, key};
			});
			let second= await _.filter(first, offer=>{
				return offer.user_id == this.props.user.uid
			});
			await second.forEach(async (result)=>{
				await firebase.database().ref('/orders/'+result.order_id).once('value', data2 => {
                    if(this.state.offers.length != second.length){
                        this.setState({
                            offers: _.concat(this.state.offers, [{order: data2.val(), ...result}]),
                            isLoading: false
                        });
					}
				});
			});
			this.setState({
				isLoading: false
			});
		});
	}
	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate navigation={nav} name="طلباتي">
				<View style={{flex: 1, flexDirection: 'row',justifyContent:'center' }}>
					<View style={{width:'90%'}}>
						{this.state.isLoading? (
							<View>
								<ActivityIndicator size="large" color="#000000" />
							</View>
						) : (
							<FlatList
								ListEmptyComponent={
									<Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>لا يوجد طلبات حاليا</Text>
								}
								data={_.reverse(this.state.offers)}
								renderItem={({item}) => (
									<TouchableOpacity onPress={()=> this.props.navigation.navigate("AddTalab", {...item.order, key: item.order_id})}>
										<ListCard header={item.order.giveShortAddress} footer={_.truncate(item.order.desc)} status={item.order.status} />
									</TouchableOpacity>
								)}
								keyExtractor = { (item, index) => index.toString() }
							/>
						)}
					</View>
				</View>
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
)(Offers);
