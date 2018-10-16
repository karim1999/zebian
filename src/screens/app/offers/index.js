import React, { Component } from 'react';
import { View ,Text} from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import User from '../../../assets/images/png/user-circle.png';
import Dollar from '../../../assets/images/png/dollar-coin.png';
import firebase from 'react-native-firebase'
import {TouchableOpacity} from 'react-native'
import {_} from 'lodash'
import {FlatList} from 'react-native'
export default class Offers extends Component {
  constructor(props){
    super(props);
    this.state = {
      offers:[
         ],
         users:[],
      fetch:0,
      isLoading:false
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
				return offer.order_id == this.props.navigation.state.params.key
			});
			await second.forEach(async (result)=>{
				await firebase.database().ref('/users/'+result.user_id).once('value', data2 => {
					this.setState({
						offers: _.concat(this.state.offers, [{user: data2.val(), ...result}]),
						isLoading: false
					});
				});
			});
			this.setState({
				isLoading: false
			});
		});
	}
  filter_user(offer){
    return _.filter(this.state.users, user=>{
       return user.uid == offer.user_id
     });

  }
  accept = (user_id,order_id,offer_id,nav)=>{
      var now = new Date();
      var orderData = {
          status:1, //being delivered ----->
          driver_id:user_id,
          accepted_time:now
      };

      // var updates = {};
      // updates['/orders/' + order_id] = orderData;
       firebase.database().ref('/orders/' + order_id).update(orderData);
      firebase.database().ref('/offers/' + offer_id).update({status:1});
      nav.navigate('SingleChatUser',{user_id})

  }
  render() {
    const nav = this.props.navigation

    return (
      <AppTemplate back={true} navigation={nav} name="العروض">
        <View style={{width: '95%', alignSelf:'center' , flexDirection:'column' }}>
        <FlatList
								ListEmptyComponent={
									<Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>لا يوجد طلبات حاليا</Text>
								}
								data={this.state.offers}
								renderItem={({item}) => (

                     <ListCard
                     onPressAccept={()=>{
                       this.accept(item.user.uid,this.props.navigation.state.params.key,item.key,nav)
                     }}
                     rightIcon={User} rightIconWidth={60} header={
                       (item == {} )? 'aa' : item.user.displayName
                     } stars={true} chat={true}  order_id={this.props.navigation.state.params.key} select={true} nav={nav} user_id={item.user.uid} Price={item.price} leftIconSrc={Dollar} />
								)}
								keyExtractor = { (item, index) => index.toString() }
							/>

        </View>
      </AppTemplate>
    );
  }
}
