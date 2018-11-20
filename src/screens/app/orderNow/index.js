import React, { Component } from 'react';

import { View, Form, Textarea, Text, Button,Toast,Picker,Item,Icon,Card } from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import MapLocation from '../../../assets/images/png/map-location.png'
import Navigation from '../../../assets/images/png/navigation.png'
import Clock from '../../../assets/images/png/clock.png'
import Car from '../../../assets/images/png/car0.png'
import {AsyncStorage} from 'react-native'
import {connect} from "react-redux";
import firebase from 'react-native-firebase'
import {_} from 'lodash'
var moment = require('moment');

class OrderNow extends Component {
    constructor(props){
        super(props);
        this.state = {
            recieve_address : '',
            give_address:'',
            time:'',
            car:'',
            desc:'',
            deliveryType: 0,
            cities:[],
            city:0
        }

    }
    onValueChange2(value: string) {
        this.setState({
            deliveryType: value
        });
    }
    componentDidMount(){

        const ref = firebase.database().ref('cities');
        ref.on('value',snapshot => {
            this.setState({ cities: _.map(snapshot.val(), (value, key)=> {
                    return {...value, key};
                })
            });
        })
    }
    OrderNow = (nav)=>{
        user_id = this.props.user.uid
        desc = this.state.desc;
        deliveryType = this.state.deliveryType;
        if(user_id == null){
            Toast.show({
                text: "تحتاج الي تسجيل الدخول اولا",
                buttonText: "OK",
                type: "danger",
                duration: 100000
            });
        }
        else {

            order = this.props.order;
            //order.giveAddress == '' || this.state.city == 0|| order.car == '' || order.time == '' || order.recieveAddress == '' || desc == '' || deliveryType == undefined
            if(false){
                Toast.show({
                    text: "الرجاء ملأ جميع البيانات",
                    buttonText: "موافق",
                    type: "danger",
                    duration: 100000
                });
            }
            else {
                order.desc = desc;
                order.user_id = user_id;
                order.orderedTime = new Date();
                order.deliveryType = deliveryType;
                order.status = 0;
                order.city = this.state.city;

                fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+order.recievePos.lat+','+order.recievePos.long+'&destinations='+order.givePos.lat+','+order.givePos.long+'&key=AIzaSyCxXoRqTcOTvsOLQPOiVtPnSxLUyGJBFqw').then((response) => response.json())
                    .then((data) => {
                        var distance = (data.rows[0].elements[0].distance.value)/1000; // Distanc by km
                        var time = (data.rows[0].elements[0].duration.value)/60; // time per minutes
                        order.googleTime = Math.round(Number(time));
                        var time_from_now = Math.round(moment().diff(moment(this.props.order.time), 'hours', true))

                        order.googleDistance = Number(distance).toFixed(2);
                        if(order.deliveryType == 1){ // outside country
                            if(order.car == 'car'){ // sedan
                                order.maxPrice = 95;
                                order.minPrice = 75;
                            }
                            else { // pickup
                                order.maxPrice = 125;
                                order.minPrice = 95;
                            }
                        }
                        else { // inside country
                            if(order.car == 'car'){ // sedan normal
                                order.maxPrice = (13 + order.googleDistance*1)+5;
                                order.minPrice = (13 + order.googleDistance*1)-5;
                            }
                            else { // pickup
                                order.maxPrice = (15 + order.googleDistance*2)+5;
                                order.minPrice = (15 + order.googleDistance*2)-5;
                            }
                        }

                    }).then(()=>{
                      var time_from_now = Math.round(moment().diff(moment(this.props.order.time), 'minutes', ))
                      if(Number(-time_from_now) < order.googleTime ){
                        Toast.show({
                            text: "الطلب يحتاج علي الاقل "+order.googleTime+" دقيقه",
                            buttonText: "موافق",
                            type: "danger",
                            duration: 100000
                        });
                      }
                      else {
                        var addOrder=   firebase.database().ref('orders/').push(
                            order
                        )
                        nav.navigate('offers',{key:addOrder.key,order})

                      }

                })

            }

        }
    }
    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="اطلب الان">
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '90%', flexDirection: 'column' }}>
                        <ListCard header={'حدد مكان الاستلام'} footer={(this.props.order.recieveAddress != '')?this.props.order.recieveAddress :'اختر موقع استلام الشحنه'} rightIcon={MapLocation} onPress={()=>{
                            nav.navigate('RecievePlace')
                        }} rightIconWidth={40} />
                        <ListCard header={'حدد مكان التسليم'} onPress={()=>{
                            nav.navigate('GivePlace')
                        }}footer={(this.props.order.giveAddress != '')?this.props.order.giveAddress :'اختر موقع تسليم الشحنه'} rightIcon={Navigation} rightIconWidth={40} />
                        <ListCard onPress={()=>{
                            nav.navigate('Time')
                        }} header={'حدد وقت التسليم'} footer={(this.props.order.time != '')?this.props.order.time :'اختر وقت تسليم الشحنه'} rightIcon={Clock} rightIconWidth={40} />
                        <ListCard onPress={()=>{
                            nav.navigate('CarType')
                        }} header={'حدد نوع السياره'} footer={(this.props.order.car != '')?(this.props.order.car == 'car') ? 'سيدان ': 'بيك اب':'بيك أب - سيدان'} rightIcon={Car} rightIconWidth={40} />
                        <Card picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: '100%' ,backgroundColor:'white',textAlign:'center'}}
                                placeholderStyle={{ color: '#bfc6ea' }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.deliveryType}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item  label="نوع التوصيل" value={0} />
                                <Picker.Item label="توصيل خارجي" value="1" />
                                <Picker.Item label="توصيل داخلي" value="2" />
                            </Picker>

                        </Card>
                        <Card picker>

                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: '100%' ,backgroundColor:'white',textAlign:'center'}}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"

                                selectedValue={this.state.city}
                                onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
                                <Picker.Item label={'مدينه التسليم'} value={0} />

                                {
                                    this.state.cities.map(
                                        (order,key) =>
                                            <Picker.Item label={order.name} value={order.key} />
                                    )
                                }
                            </Picker>
                        </Card>


                    </View>
                </View>
                <View style={{ flexdirection: 'row' }}>
                    <Form style={{ marginHorizontal: 14 }}>
                        <View style={{ width: '80%', alignSelf: 'center' }}>
                            <Text style={{ color: '#266A8F', fontSize: 20,fontWeight:'bold', textAlign: 'center',fontFamily:'Droid Arabic Kufi' }}>تفاصيل الطلب</Text>
                            <Text style={{ textAlign: 'center',fontWeight:'bold', fontSize: 17,fontFamily:'Droid Arabic Kufi' }} note>اكتب هنا تفاصيل الغرض الذي ترغب في ارساله مثلا ما هو وكيف حجمه</Text>
                        </View>
                        <Textarea  onChangeText={
                            (text)=>{
                                this.setState({desc:text})
                            }
                        } value={this.state.desc} style={{ borderRadius: 14, backgroundColor: 'white',textAlign:'center',fontFamily:'Droid Arabic Kufi' }} rowSpan={4} bordered placeholder=""  />
                    </Form>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={() => this.OrderNow(nav)} rounded style={{ backgroundColor: '#15588D', alignSelf: 'center', alignItems: 'center', marginVertical: 30, paddingRight: 20, paddingLeft: 20 }}>
                        <Text style={{ fontSize: 20,fontWeight:'bold', textAlign: 'center',fontFamily:'Droid Arabic Kufi' }}>اطلب الان !</Text>
                    </Button>
                </View>
            </AppTemplate>
        );
    }
}

const mapStateToProps = ({ order,user }) => ({
    order,
    user
});


export default connect(
    mapStateToProps,
)(OrderNow);

const styles = {
    btnBot: {
        backgroundColor: '#15588D',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
    }
}
