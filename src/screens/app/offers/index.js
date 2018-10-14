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
//   componentDidMount(){
//
//     const ref = firebase.database().ref('offers');
//     const ref2 = firebase.database().ref('users');
//     ref2.once('value',users =>{
//       this.setState({ users:  _.map(users.val(), (value, key)=> {
//                  return {...value};
//            })
//     ,fetch:1})
//   })
// ref.once('value',snapshot => {
//    this.setState({ offers:  _.map(snapshot.val(), (value, key)=> {
//            if(value.order_id == this.props.navigation.state.params.key){
//               return {...value, key};
//           }
//         })
//        });
// //       // alert(JSON.stringify(snapshot))
//   })
// // const ref = firebase.database().ref('offers');
// // var finished = [];
// // ref.once('value',snapshot => {
// // this.setState({ orders:  _.map(snapshot.val(), (value, key)=> {
// //           return {...value, key};
// //     })
// //    });
// //
// // })
//
//
//   }
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
                  <TouchableOpacity onPress={()=>alert(JSON.stringify(item))} >
{
}

                     <ListCard rightIcon={User} rightIconWidth={60} header={
                       (item == {} )? 'aa' : item.user.displayName
                     } stars={true} Price={item.price} leftIconSrc={Dollar} />
                 </TouchableOpacity>
								)}
								keyExtractor = { (item, index) => index.toString() }
							/>

        </View>
      </AppTemplate>
    );
  }
}
