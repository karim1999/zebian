import React, { Component } from 'react';
import { Text, View,TouchableOpacity,StyleSheet } from "react-native";
import { Button, Container, Icon, List, ListItem } from "native-base";
import _ from "lodash";
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import AppTemplate from '../appTemplate';
import {setUser} from "../../../reducers";
import axios from 'axios';
import {SERVER_KEY} from "../../../constants/config";
import Stars from 'react-native-stars';
import Modal from "react-native-modal";

class SingleChatUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.navigation.state.params,
            message: "",
            logs: [],
            menu: false,
            order:[{
                status:0
            }],
            stars:5,
            isModalVisible: false,
            order_key:'',
            fetch:0

        };
    }
    renderBubble (props) {
        return (
            <Bubble
                {...props}
            />
        )
    }
    // toggleMenu() {
    // 	this.setState({
    // 		menu: !this.state.menu
    // 	})
    // }
    addNewMessage(data){
        let newPostKey = firebase.database().ref('/chat/').child(this.state.key).push(data[0]);
        axios.post("https://fcm.googleapis.com/fcm/send", {
            data: {
                type: "msg",
                toast: false,
                toast_type: "success",
                toast_text: "New message from " + this.props.user.displayName,
                navigation: true,
                navigation_data: {...this.props.navigation.state.params, title: this.props.user.displayName, token: this.props.user.token},
                navigation_name: "SingleChat"
            },
            notification: {
                title: this.props.user.displayName,
                text: _.truncate(data[0].text)
            },
            to: this.state.token ? this.state.token : ""
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + SERVER_KEY
            }
        }).then(response => {
            // alert("done")
        }).catch(error => {
            // alert("error1")
        });
    }
    componentDidMount(){
        firebase.database().ref('/offers/'+this.state.key).update({
            chat: true
        });
        firebase.database().ref('/chat/').child(this.state.key).on('value', data => {
            this.setState({
                logs: _.values(data.val())
            })
        });
        firebase.database().ref('/orders/'+this.state.order_id).on('value', data => {
            this.setState({
                order: data,
                fetch:1
            })

        });
    }

    accept = (user_id,order_id,offer_id,nav,offer_price,user)=>{
        var now = new Date();
        var orderData = {
            status:1, //being delivered ----->
            driver_id:user_id,
            accepted_time:now,
            price:offer_price,
            offer_id:offer_id
        };

        // var updates = {};
        // updates['/orders/' + order_id] = orderData;
        firebase.database().ref('/orders/' + order_id).update(orderData);
        firebase.database().ref('/offers/' + offer_id).update({status:1});
        nav.navigate('SingleChatUser',{key:offer_id,token:user.token,title:user.displayName});

        axios.post("https://fcm.googleapis.com/fcm/send", {
            data: {
                type: "msg",
                toast: true,
                toast_type: "success",
                toast_text: "تم اختيارك لطلب جديد",
                navigation: true,
            },
            notification: {
                title: 'تم اختيارك',
                text: this.props.user.displayName+'تم اختيارك لطلب جديد'
            },
            to: user.token
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + SERVER_KEY
            }
        }).then(response => {
            // alert("done")
        }).catch(error => {
            // alert("error1")
        });
    }
    toggleMenu() {
        this.setState({
            menu: !this.state.menu
        })
    }
    arrived = (order,user,nav,offer_id)=>{
        order_id = order.key;
        price = order.val().price;
        fees = price*.15;
        var driver_id = user.uid;
        var	balance = user.balance;
        var	stars = this.state.stars;
        var orders = user.orders;

        if(balance == undefined){
            balance = 0;
        }
        if(stars == undefined){
            stars = 0;
        }
        if(orders == undefined){
            orders = 0;
        }
        if(orders == 0 || orders == undefined){
            new_orders = 1;
        }
        else {
            new_orders = Number(orders)+1
        }
        var new_stars = (stars + this.state.stars)/new_orders
        var new_balance = balance - fees;
        orderData= {
            status : 2
        }
        driverData = {
            balance:new_balance,
            stars:new_stars,
            orders:new_orders
        }
        var now = new Date();

        offerData = {
            end_date : now
        }
        firebase.database().ref('/offers/' + offer_id).update(offerData);

        firebase.database().ref('/orders/' + order_id).update(orderData);
        firebase.database().ref('/users/' + driver_id).update(driverData);
        axios.post("https://fcm.googleapis.com/fcm/send", {
            data: {
                type: "msg",
                toast: true,
                toast_type: "success",
                toast_text: "تم توصيل الطلب",
                navigation: true,
            },
            notification: {
                title: 'تم اختيارك',
                text: this.props.user.displayName+'تم اختيارك لطلب جديد'
            },
            to: user.token
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + SERVER_KEY
            }
        }).then(response => {
            // alert("done")
        }).catch(error => {
            // alert("error1")
        });

        nav.navigate('Home')
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    // componentDidUnMount() {
    //     this.state.ref.off('value');
    // }
    //	accept = (user_id,order_id,offer_id,nav,offer_price,user,axios)=>{

    render() {
        return (
            <AppTemplate right={true} toggleMenu={() => this.toggleMenu()} isChat back navigation={this.props.navigation} customBack="ChatUser" name={this.state.title}>
                {this.state.menu && (
                    <List style={{backgroundColor: "#ffffff", right: 0}}>
                        {
                            (this.state.order.val().status == 0 ) ?
                                (<ListItem onPress={()=>{
                                    this.accept(this.state.user.uid,this.state.order_id,this.state.key,this.props.navigation,this.state.price,this.state.user);
                                }} style={{justifyContent: "flex-end"}}>
                                    <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:17}}>اختر هذا السائق</Text>
                                </ListItem>)
                                :
                                (this.state.order.val().status == 1)?
                                    (
                                        <ListItem onPress={()=>{
                                            this._toggleModal()
                                        }}  style={{justifyContent: "flex-end"}}>
                                            <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:17,textAlign:'center'}}>وصل الطلب</Text>
                                        </ListItem>
                                    )
                                    :
                                    null
                        }

                        <ListItem onPress={()=>{
                            if(this.state.order.status == 0){

                                this.props.navigation.navigate('offers',{key:this.state.order_id,order:this.state.order})
                            }
                            else {
                                this.props.navigation.navigate('talabDetails1',{order:this.state.order.val()})
                            }
                        }} style={{justifyContent: "flex-end"}}>
                            <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:17,textAlign:'center'}}>بيانات الطلب</Text>
                        </ListItem>
                    </List>
                )}
                {
                    (this.state.fetch == 1)?(
                        (this.state.order.val().status == 0 )?
                            (<View style={{backgroundColor:'gray',height:40}}>
                                <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>ب انتظار قبول عرض</Text>
                            </View>)
                            :
                            (this.state.order.val().status == 1)?
                                (<View style={{backgroundColor:'orange',height:40}}>
                                    <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>جاري التوصيل</Text>
                                </View>)
                                :
                                (<View style={{backgroundColor:'green',height:40}}>
                                    <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>تم التوصيل </Text>
                                </View>)):null

                }



                <GiftedChat
                    messages={this.state.logs}
                    onSend={data => this.addNewMessage(data)}
                    alwaysShowSend={true}
                    placeholder="Send a message..."
                    isAnimated={true}
                    inverted={true}
                    showUserAvatar={true}
                    renderBubble={(props) => this.renderBubble(props)}
                    user={{
                        _id: this.props.user.uid,
                        name: this.props.user.displayName,
                        avatar: this.props.user.photoURL
                    }}
                />
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={{ height: '30%', width: '90%', backgroundColor: 'white', alignSelf: 'center',alignItems:'center', justifyContent: 'center', flexDirection: 'column',borderRadius:10 }}>
                        <Text style={{fontWeight: 'bold',  color: '#266A8F',fontSize: 13,fontFamily:'Droid Arabic Kufi'}}>قيم السائق </Text>
                        <Stars
                            default={this.state.stars}
                            count={5}
                            half={true}
                            starSize={50}
                            update={(stars)=>{this.setState({stars})}}

                            fullStar={<Icon type='MaterialCommunityIcons' name={'star'} style={[styles.myStarStyle]} />}
                            emptyStar={<Icon type='MaterialCommunityIcons' name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                            halfStar={<Icon type='MaterialCommunityIcons' name={'star-half'} style={[styles.myStarStyle]} />}
                        />

                        <Button onPress={()=> 	this.arrived(this.state.order,this.state.user,this.props.navigation,this.state.key)} block rounded style={{ backgroundColor: 'green', alignSelf: 'center', marginTop: 15,margin:10,padding:10, }}>
                            <Text style={{  fontWeight: 'bold', color: 'white',fontSize: 15,fontFamily:'Droid Arabic Kufi' }}>قيم السائق</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>

                    </View>
                </Modal>

            </AppTemplate>
        );
    }
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
)(SingleChatUser);
const styles = StyleSheet.create({
    myStarStyle: {
        color: '#FAC819',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: '#FAC819',
    }
});
