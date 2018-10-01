import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, ListItem, CheckBox, Body } from 'native-base'
import Modal from "react-native-modal";

import ModalListItem from '../../../components/common/modalListItem';
import AppTemplate from '../appTemplate';
export default class ModalBox extends Component {
    state = {
        isModalVisible: false
    };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="Modal">
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Text>Show Modal</Text>
                    </TouchableOpacity>
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
                </View>
            </AppTemplate>
        );
    }
}



const styles = {
    text: {
        color: '#7F7F7F',
        fontSize: 15,
        textAlign: 'right'
    }
}