import React, {Component} from 'react';
import {View, Text, Card, CardItem, Body, Button} from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import User from '../../../assets/images/png/user-circle.png';
import Dollar from '../../../assets/images/png/dollar-coin.png';
import firebase from 'react-native-firebase'
import {TouchableOpacity, ActivityIndicator} from 'react-native'
import {_} from 'lodash';
import {FlatList} from 'react-native'

var moment = require('moment');

import Modal from "react-native-modal";

import axios from 'axios';
import Alarm from '../../../assets/images/png/alarm.png'
import Warning from '../../../assets/images/png/warning.png'
import AutoHeightImage from 'react-native-auto-height-image';
import {SERVER_KEY} from "../../../constants/config";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            users: [],
            drivers: [],
            fetch: 0,
            isLoading: false,
            isModalVisible: false,
            time: '',
            show: false
        }
        setInterval(() => {
            order = this.props.navigation.state.params.order;
            this.setState({time: Math.round(moment().diff(moment(order.orderedTime), 'minutes', true))})
            if (this.state.time >= 5) {
                this.setState({show: true})
            }

        }, 1000)
    }

    async componentDidMount() {

        const ref = firebase.database().ref('users');
        ref.on('value', snapshot => {
            this.setState({
                drivers: _.map(snapshot.val(), (value, key) => {
                    if (value.allow == 1 && value.driver == true) {

                        return {...value, key};
                    }
                    else {
                        return {};
                    }
                })
            });
        })
        this.fetch_data();
    }

    async fetch_data() {

        this.setState({
            isLoading: true
        });
        await firebase.database().ref('/offers/').on('value', async data => {
            let first = await _.map(data.val(), (value, key) => {

                return {...value, key};

            });
            let second = await _.filter(first, offer => {
                return offer.order_id == this.props.navigation.state.params.key
            });
            await second.forEach(async (result) => {
                await firebase.database().ref('/users/' + result.user_id).once('value', data2 => {
                    if (_.concat(this.state.offers, [{user: data2.val(), ...result}]).length == this.state.offers.length) {

                    }
                    else {

                        this.setState({offers: []})
                        this.setState({
                            offers: _.concat(this.state.offers, [{user: data2.val(), ...result}]),
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

    filter_user(offer) {
        return _.filter(this.state.users, user => {
            return user.uid == offer.user_id
        });

    }

    accept = (user_id, order_id, offer_id, nav, offer_price, user, axios) => {
        var now = new Date();
        var orderData = {
            status: 1, //being delivered ----->
            driver_id: user_id,
            accepted_time: now,
            price: offer_price,
            offer_id: offer_id
        };

        // var updates = {};
        // updates['/orders/' + order_id] = orderData;
        firebase.database().ref('/orders/' + order_id).update(orderData);
        firebase.database().ref('/offers/' + offer_id).update({status: 1});
        nav.navigate('SingleChatUser', {key: offer_id, token: user.token, title: user.displayName});

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
                text: this.props.user.displayName + 'تم اختيارك لطلب جديد'
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
    message = (offer_id, nav, user, offer) => {
        nav.navigate('SingleChatUser', {
            key: offer_id,
            token: user.token,
            title: user.displayName,
            order_id: offer.order_id,
            price: offer.price,
            user
        })

    }
    argent = () => {
        order = this.props.navigation.state.params.order;
        var drivers = this.state.drivers.filter(value => Object.keys(value).length !== 0);
        var driver = drivers[Math.floor(Math.random() * drivers.length)]
        var offerData = {
            chat: false,
            client_id: order.user_id,
            order_id: this.props.navigation.state.params.key,
            price: order.maxPrice * 2,
            status: 0,
            user_id: driver.key
        }
        var addOffer = firebase.database().ref('offers/').push(
            offerData
        )
        var now = new Date();


        this._toggleModal()
        firebase.database().ref('/orders/' + this.props.navigation.state.params.key).update({
            zeban: true
        });
        axios.post("https://fcm.googleapis.com/fcm/send", {
            data: {
                type: "msg",
                toast: true,
                toast_type: "success",
                toast_text: "تم اختيارك ل ذيبان عاجل",
                navigation: true,
            },
            notification: {
                title: 'تم اختيارك ل ذيبان عاجل',
                text: this.props.user.displayName + 'تم اختيارك لذيبان عاجل'
            },
            to: driver.token
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
    _toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});

    render() {
        const nav = this.props.navigation

        return (
            <AppTemplate back={true} navigation={nav} name="العروض">
                <View style={{width: '95%', alignSelf: 'center', flexDirection: 'column'}}>
                    <FlatList
                        ListEmptyComponent={
                            <View style={{justifyContent: 'center'}}>
                                <Card style={{width: '90%', alignSelf: 'center'}}>
                                    <CardItem header style={{justifyContent: 'center'}}>
                                        <AutoHeightImage
                                            width={40}
                                            source={Warning}
                                            style={{alignSelf: 'center'}}
                                        />
                                        <Text style={{
                                            color: '#266A8F',
                                            fontSize: 20,
                                            marginHorizontal: 5,
                                            fontFamily: 'Droid Arabic Kufi'
                                        }}>مازلنا نبحث عن مندوبين لك</Text>
                                    </CardItem>
                                    <CardItem style={{justifyContent: 'center'}}>
                                        <Body style={{justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                            <AutoHeightImage
                                                width={100}
                                                source={Alarm}
                                                style={{alignSelf: 'center', marginBottom: 10}}
                                            />
                                        </View>
                                        {
                                            (this.state.show == false) ?

                                                <View style={{flexDirection: 'column', alignSelf: 'center'}}>

                                                    <Text style={{
                                                        fontFamily: 'Droid Arabic Kufi',
                                                        color: '#266A8F',
                                                        fontSize: 23,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        انتظر العروض ستظهر هنا
                                                    </Text>
                                                    <Text style={{
                                                        color: 'gray',
                                                        fontFamily: 'Droid Arabic Kufi',
                                                        fontSize: 12,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>
                                                        مر {this.state.time} دقيقه
                                                    </Text>
                                                </View>
                                                :
                                                <View style={{flexDirection: 'column', alignSelf: 'center'}}>

                                                    <Text style={{
                                                        fontFamily: 'Droid Arabic Kufi',
                                                        color: '#266A8F',
                                                        fontSize: 23,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        جرب معنا خدمه ذيبان فزعه
                                                    </Text>
                                                    <Text style={{
                                                        color: 'gray',
                                                        fontFamily: 'Droid Arabic Kufi',
                                                        fontSize: 12,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>
                                                        يتضاعف السعر مع هذه الخدمه
                                                    </Text>
                                                </View>
                                        }
                                        </Body>
                                    </CardItem>
                                    {
                                        (this.state.show == true) ?
                                            <CardItem footer style={{alignSelf: 'center', width: '60%'}}>
                                                <Button onPress={() => {
                                                    this._toggleModal()
                                                }} rounded block style={{flex: 1, backgroundColor: '#266A8F'}}>
                                                    <Text style={{fontSize: 18, fontFamily: 'Droid Arabic Kufi'}}>جرب
                                                        ذلك</Text>
                                                </Button>
                                            </CardItem>
                                            : null
                                    }
                                </Card>
                            </View>
                        }
                        data={this.state.offers}
                        renderItem={({item}) => (
                            <TouchableOpacity>
                                <ListCard
                                    onPress={() => {
                                        this.message(item.key, nav, item.user, item)
                                    }}

                                    rightIcon={User} rightIconWidth={60} header={
                                    (item == {}) ? 'aa' : item.user.displayName
                                } stars={true} stars_status={true} dolar={true}
                                    order_id={this.props.navigation.state.params.key} nav={nav} user_id={item.user.uid}
                                    Price={item.price} leftIconSrc={Dollar}/>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({isModalVisible: false})}
                >
                    <View style={{
                        height: '30%',
                        width: '90%',
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: 10
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#266A8F',
                            fontSize: 13,
                            fontFamily: 'Droid Arabic Kufi'
                        }}>هل تريد اختيار ذيبان عاجل </Text>

                        <Text style={{fontWeight: 'bold', color: 'gray', fontSize: 7, fontFamily: 'Droid Arabic Kufi'}}>بمجرد
                            الموافقه سياتيك عرض من سائق مضاعف السعر </Text>

                        <View style={{flexDirection: 'row'}}>
                            <Button onPress={() => this.argent()} block rounded style={{
                                backgroundColor: 'green',
                                alignSelf: 'center',
                                marginTop: 15,
                                margin: 10,
                                padding: 10,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontSize: 15,
                                    fontFamily: 'Droid Arabic Kufi'
                                }}>موافق</Text>
                                {this.state.isLoading && (
                                    <ActivityIndicator style={{}} size="small" color="#000000"/>
                                )}
                            </Button>
                            <Button onPress={() => this._toggleModal()} block rounded style={{
                                backgroundColor: 'green',
                                alignSelf: 'center',
                                marginTop: 15,
                                margin: 10,
                                padding: 10,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontSize: 15,
                                    fontFamily: 'Droid Arabic Kufi'
                                }}>الغاء</Text>
                                {this.state.isLoading && (
                                    <ActivityIndicator style={{}} size="small" color="#000000"/>
                                )}
                            </Button>
                        </View>
                    </View>
                </Modal>

            </AppTemplate>
        );
    }
}

const mapStateToProps = ({order, user}) => ({
    order,
    user
});


export default connect(
    mapStateToProps,
)(Offers);
