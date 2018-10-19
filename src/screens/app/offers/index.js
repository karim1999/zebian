import React, { Component } from 'react';
import { View ,Text,Card,CardItem,Body,Button} from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import User from '../../../assets/images/png/user-circle.png';
import Dollar from '../../../assets/images/png/dollar-coin.png';
import firebase from 'react-native-firebase'
import {TouchableOpacity} from 'react-native'
import {_} from 'lodash'
import {FlatList} from 'react-native'
import Alarm from '../../../assets/images/png/alarm.png'
import Warning from '../../../assets/images/png/warning.png'
import AutoHeightImage from 'react-native-auto-height-image';

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
		this.fetch_data();
	}
  async fetch_data(){
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
				await firebase.database().ref('/users/'+result.user_id).on('value', data2 => {
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
  accept = (user_id,order_id,offer_id,nav,offer_price)=>{
      var now = new Date();
      var orderData = {
          status:1, //being delivered ----->
          driver_id:user_id,
          accepted_time:now,
          price:offer_price
      };

      // var updates = {};
      // updates['/orders/' + order_id] = orderData;
       firebase.database().ref('/orders/' + order_id).update(orderData);
      firebase.database().ref('/offers/' + offer_id).update({status:1});
      nav.navigate('SingleChatUser',{key:order_id})

  }
  render() {
    const nav = this.props.navigation

    return (
      <AppTemplate back={true} navigation={nav} name="العروض">
        <View style={{width: '95%', alignSelf:'center' , flexDirection:'column' }}>
        <FlatList
								ListEmptyComponent={
                  <View style={{ justifyContent: 'center' }}>
                    <Card style={{ width: '90%', alignSelf: 'center' }}>
                      <CardItem header style={{ justifyContent: 'center' }}>
                        <AutoHeightImage
                          width={40}
                          source={Warning}
                          style={{ alignSelf: 'center' }}
                        />
                        <Text style={{ color: '#266A8F', fontSize: 20, marginHorizontal: 5,fontFamily:'Droid Arabic Kufi' }}>مازلنا نبحث عن مندوبين لك</Text>
                      </CardItem>
                      <CardItem style={{ justifyContent: 'center' }}>
                        <Body style={{ justifyContent: 'center' }}>
                          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <AutoHeightImage
                              width={100}
                              source={Alarm}
                              style={{ alignSelf: 'center', marginBottom: 10 }}
                            />
                          </View>
                          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                            <Text style={{ fontFamily:'Droid Arabic Kufi',color: '#266A8F', fontSize: 23, fontWeight: 'bold' }}>
                              جرب معنا خدمه ذيبان فذعه
                            </Text>
                            <Text style={{ color: 'gray',fontFamily:'Droid Arabic Kufi', fontSize: 12, fontWeight: 'bold',textAlign:'center' }}>
                              يتضاعف السعر مع هذه الخدمه
                            </Text>
                          </View>
                        </Body>
                      </CardItem>
                      <CardItem footer style={{ alignSelf: 'center', width: '60%' }}>
                        <Button rounded block style={{ flex: 1, backgroundColor: '#266A8F' }}>
                          <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>جرب ذلك</Text>
                        </Button>
                      </CardItem>
                    </Card>
                  </View>
								}
								data={this.state.offers}
								renderItem={({item}) => (

                     <ListCard
                     onPressAccept={()=>{
                       this.accept(item.user.uid,this.props.navigation.state.params.key,item.key,nav,item.price)
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
