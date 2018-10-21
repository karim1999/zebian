import React, { Component } from 'react';
import {ListItem, List, Left, Thumbnail, Body, Text, Right} from 'native-base';
import AppTemplate from '../appTemplate';
import {ActivityIndicator, FlatList, View} from "react-native";
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import _ from "lodash";
import SingleChatUser from "../singleChat";
import {setUser} from "../../../reducers";

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			orders: []
		};
	}
	async componentDidMount(){
		this.setState({
			isLoading: true
		});
		await firebase.database().ref('/offers/').on('value', async data => {
			let first= await _.filter(_.map(data.val(), (value, key)=> {
				return {...value, key};
			}), offer=> {
				return offer.chat && (offer.client_id == this.props.user.uid || this.props.user.uid == offer.user_id)
			});

			await first.forEach(async (result)=>{
				await firebase.database().ref('/users/'+(this.props.user.driver ? result.client_id : result.user_id)).once('value', data2 => {
					this.setState({
						orders: _.concat(this.state.orders, [{user: data2.val(), ...result}]),
						isLoading: false
					});
				});
			});
			this.setState({
				isLoading: false
			});
		});
	}
	render() {

		return (
			<AppTemplate navigation={this.props.navigation} name="الرسائل">
				<View style={{padding: 10}}>
					<View>
						{this.state.isLoading? (
							<View>
								<ActivityIndicator size="large" color="#000000" />
							</View>
						) : (
							<FlatList
								ListEmptyComponent={
									<Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>لا يوجد رسائل حاليا</Text>
								}
								data={_.reverse(this.state.orders)}
								renderItem={({item}) => (
									<ListItem avatar
									          key={item.key}
									          onPress={() => this.props.navigation.navigate("SingleChat", {
										          ...item
									          })}
									          style={{padding: 10, marginLeft: 0}}
									>
										<Left>
											{/*<Text note>{item.orderedTime}</Text>*/}
										</Left>
										<Body>
										<Text style={{textAlign: "right"}}>{item.user.displayName}</Text>
										<Text style={{textAlign: "right"}} note>{item.recieveShortAddress}</Text>
										</Body>
										<Right>
											<Thumbnail source={{uri: item.user.photoURL}} small />
										</Right>
									</ListItem>
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
)(Chat);
