import React, { Component } from 'react';
import {Text, View,} from 'native-base';
import AppTemplate from '../../appTemplate';
import ListCard from '../../../../components/common/Card2';
import firebase from "react-native-firebase";
import {ActivityIndicator, FlatList, TouchableOpacity} from "react-native";
import _ from "lodash";
import axios from "axios";
import {SERVER_KEY} from "../../../../constants/config";
import {setUser} from "../../../../reducers";
import {connect} from "react-redux";

class Home extends Component {
	constructor(props){
		super(props);
		this.state= {
			isLoading: false,
			orders: []
		}
	}
	async componentDidMount(){
        // const notification = new firebase.notifications.Notification()
        //     .setNotificationId('notificationId')
        //     .setTitle('My notification title')
        //     .setBody('My notification body')
        //     .android.setChannelId('notification-action')
        //     .android.setPriority(firebase.notifications.Android.Priority.Max)
        //     .setData({
        //         key1: 'value1',
        //         key2: 'value2',
        //     });
        // firebase.notifications().displayNotification(notification)
        this.setState({
            isLoading: true
        });
        await firebase.database().ref('/orders/').on('value', async data => {
            let first= await _.filter(_.map(data.val(), (value, key)=> {
                return {...value, key};
            }), order=> {
                return order.status == 0
            });

            await first.forEach(async (result)=>{
                await firebase.database().ref('/users/'+(result.user_id)).once('value', data2 => {
									if(this.state.order.length == _.concat(this.state.orders, [{user: data2.val(), ...result}]).length){

									}
									else {
										this.setState({orders:[]})
										this.setState({
                        orders: _.concat(this.state.orders, [{user: data2.val(), ...result}]),
                        isLoading: false
                    });
									}

                });
            });
            this.setState({
                isLoading: false
            });
        });

        // firebase.database().ref('/orders/').on('value', data => {
		// 	this.setState({
		// 		orders: _.filter(_.map(data.val(), (value, key)=> {
         //            return {...value, key};
		// 		}), order => {
		// 			return order.status == 0
		// 		}),
		// 		isLoading: false
		// 	});
		// });
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
									<TouchableOpacity onPress={()=> this.props.navigation.navigate("AddTalab", {...item, token: item.user.token})}>
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
const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
