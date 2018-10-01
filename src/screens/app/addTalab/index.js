import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Text, TouchableHighlight, TouchableOpacity, View, Alert, StyleSheet
} from "react-native";
import { Button, Icon, Card, CardItem, Body, Left, Right, } from 'native-base';
import Modal from "react-native-modal";
import ModalListItem from '../../../components/common/modalListItem';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import MapComponent from '../../../components/common/map';
import MapMarker from '../../../assets/images/png/map-marker.png';
import Cancel from '../../../assets/images/png/cancel.png';
import Dollar from '../../../assets/images/png/dollar-coin.png';

let { width, height } = Dimensions.get('window');


export default class AddTalab extends Component {

    state = {
        isModalVisible: false
    };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="اضافه العرض">
                <View style={{ position: 'relative' }}>
                    <MapComponent />
                    <View style={{ position: 'absolute', width: '90%', bottom: 0, alignSelf: 'center' }}>
                        <Button onPress={this._toggleModal} iconLeft rounded style={{ alignSelf: 'center', height: 24, backgroundColor: '#15588D' }}>
                            <Icon style={{ marginLeft: 3 }}>
                                <Image source={Cancel} />
                            </Icon>
                            <Text style={{ paddingHorizontal: 20, color: 'white', fontSize: 16 }}>الغاء الطلب</Text>
                        </Button>
                        <ListCard header={'مكان الاستلام '} footer={'حي النصر - شارع الوحده'} rightIconSrc={MapMarker} />
                        <ListCard header={'مكان التسليم'} footer={'حي النصر - شارع الوحده'} rightIconSrc={MapMarker} />
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <Card>
                        <CardItem>
                            <Body>
                                <View style={{ flexDirection: 'column', marginLeft: 5, alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text style={{ color: '#266A8F', fontSize: 20, fontWeight: 'bold' }}>وقت التوصيل</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text note style={{ color: '#707070', fontSize: 15, fontWeight: 'bold' }}>3:00</Text>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ flex: 1, borderRadius: 5 }} >
                        <CardItem style={{ borderRadius: 5 }}>
                            <Left style={{ flex: 0.5 }} >
                                <Icon style={{ color: this.props.LeftIconColor, marginRight: 10 }} >
                                    <Image source={Dollar} />
                                </Icon>
                                <Text style={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, fontSize: 15, color: '#CBCBCB', borderColor: 'deepskyblue' }} >
                                    00
                                </Text>
                            </Left>
                            <Right style={{ flex: 1, backgroundColor: '', alignContent: 'flex-end' }}>
                                <Text style={{ color: '#266A8F', fontSize: 20, fontWeight: 'bold' }} >المبلغ</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <View style={{ width: '60%', alignSelf: 'center' }}>
                        <Button block rounded style={{ backgroundColor: '#15588D', alignSelf: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>اضافه عرض</Text>
                        </Button>
                    </View>
                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={{ height: '60%', width: '90%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }}>
                        <View style={{ flex: .1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, color: '#236C8E', textAlign: 'center', fontWeight: 'bold' }}>
                                سبب الغاء الطلب
                                </Text>
                        </View>
                        <View style={{ flex: .5, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', }}>
                            <View style={{ flex: 1, flexDirection: 'column', width: '90%' }}>
                                <ModalListItem text='تاخر السائق عن الوصول' />
                                <ModalListItem text='تاخر السائق في الاستلام' />
                                <ModalListItem text='لم اعد اريد التوصيله' />
                                <ModalListItem text='اخري' />
                            </View>
                        </View>
                        <View style={{ flex: .2, flexDirection: 'row', width: '60%', justifyContent: 'center', alignSelf: 'center' }}>
                            <Button rounded block onPress={this._toggleModal} style={{ flex: 1, alignSelf: 'center', backgroundColor: '#15588D' }}>
                                <Text style={{ color: 'white', fontSize: 25, }}>الغاء الطلب</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </AppTemplate>
        );
    }
}