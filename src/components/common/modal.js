import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, ListItem, CheckBox, Body } from 'native-base'
import Modal from "react-native-modal";

import ModalListItem from './modalListItem';

export default class ModalComponent extends Component {
    state = {
        isModalVisible: false
    };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        return (
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
                                    <ModalListItem />
                                    <ListItem>
                                        <View style={{ flex: 4, flexDirection: 'column' }}>
                                            <Text style={styles.text}>تاخر السائق في الاستلام</Text>
                                        </View>
                                        <View style={{ flex: 0.5, flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <CheckBox checked={false} />
                                        </View>
                                    </ListItem>
                                    <ListItem>
                                        <View style={{ flex: 4, flexDirection: 'column' }}>
                                            <Text style={styles.text}>لم اعد اريد التوصيله</Text>
                                        </View>
                                        <View style={{ flex: 0.5, flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <CheckBox checked={false} />
                                        </View>
                                    </ListItem>
                                    <ListItem>
                                        <View style={{ flex: 4, flexDirection: 'column' }}>
                                            <Text style={styles.text}>اخري</Text>
                                        </View>
                                        <View style={{ flex: .5, flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <CheckBox checked={false} />
                                        </View>
                                    </ListItem>
                                </View>
                            </View>
                            <View style={{ flex: .2, flexDirection: 'row', width: '80%', justifyContent: 'center', alignSelf: 'center' }}>
                                <Button rounded block onPress={this._toggleModal} style={{ flex: 1, alignSelf: 'center', backgroundColor: '#15588D' }}>
                                    <Text style={{ color: 'white', fontSize: 25, }}>الغاء الطلب</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
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





















































// import React, { Component } from 'react';
// import AppTemplate from '../appTemplate';
// import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
// import { Button, ListItem, CheckBox, Body } from 'native-base'
// // import  from "react-native-modal";



// export default class ModalBox extends Component {
//     state = {
//         modalVisible: false,
//     };

//     setModalVisible(visible) {
//         this.setState({ modalVisible: visible });
//     }


//     render() {
//         const nav = this.props.navigation
//         return (
//             <AppTemplate navigation={nav} name="MOdal">
//                 <View style={{ marginTop: 22 }}>
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={this.state.modalVisible}
//                         onRequestClose={() => {
//                             Alert.alert('Modal has been closed.');
//                         }}>
//                         <View style={{ marginTop: 22, height: 200, width: 200, backgroundColor: 'red', alignSelf:'center', justifyContent:'center' }}>
//                             <ListItem>
//                                 <CheckBox checked={true} />
//                                 <Body>
//                                     <Text>Daily Stand Up</Text>
//                                 </Body>
//                             </ListItem>
//                             <ListItem>
//                                 <CheckBox checked={false} />
//                                 <Body>
//                                     <Text>Discussion with Client</Text>
//                                 </Body>
//                             </ListItem>
//                             <ListItem>
//                                 <CheckBox checked={false} color="green" />
//                                 <Body>
//                                     <Text>Finish list Screen</Text>
//                                 </Body>
//                             </ListItem>
//                             <Button onPress={() => {
//                                 this.setModalVisible(!this.state.modalVisible);
//                             }} >
//                             <Text>الغاء الطلب</Text>
//                             </Button>
//                         </View>
//                     </Modal>

//                     <TouchableHighlight
//                         onPress={() => {
//                             this.setModalVisible(true);
//                         }}>
//                         <Text>Show Modal</Text>
//                     </TouchableHighlight>
//                 </View>
//             </AppTemplate>
//         );
//     }
// }
