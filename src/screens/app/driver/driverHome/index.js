import React, { Component } from 'react';
import {Text, View,} from 'native-base';
import AppTemplate from '../../appTemplate';
import ListCard from '../../../../components/common/Card2';
import firebase from "react-native-firebase";
import {ActivityIndicator, FlatList, TouchableOpacity} from "react-native";
import _ from "lodash";

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state= {
			isLoading: false,
			orders: []
		}
	}
	componentDidMount(){
		this.setState({
			isLoading: true
		});
		firebase.database().ref('/orders/').on('value', data => {
			this.setState({
				orders: _.map(data.val(), (value, key)=> {
					return {...value, key};
				}),
				isLoading: false
			});
		});
	}
	render() {
		const nav = this.props.navigation
		return (
			<AppTemplate navigation={nav} name="طلبات التوصيل">
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
								data={_.reverse(this.state.orders)}
								renderItem={({item}) => (
									<TouchableOpacity onPress={()=> this.props.navigation.navigate("AddTalab", {...item})}>
										<ListCard header={item.giveShortAddress} footer={_.truncate(item.desc)} status={item.status} />
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