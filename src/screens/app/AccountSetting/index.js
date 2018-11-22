import React, { Component } from 'react';
import {Button, Text, View, List, ListItem, Left, Right, CheckBox, Switch} from 'native-base';
import AppTemplate from '../appTemplate';
import Modal from "react-native-modal";
import ModalListItem from '../../../components/common/modalListItem';
import Coupon from '../../../assets/images/png/coupon.png'
import Listitem from '../../../components/common/ListItem'
import Twon from '../../../components/common/twon'
import firebase from 'react-native-firebase'
import {connect} from "react-redux";
import {Share} from 'react-native'
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.Label,
            driver: this.props.user.driver
        };
    }


    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    state = {
        isModalVisible: false
    };
    async setDriver(){
        this.setState({
            driver: !this.props.user.driver
        });
        await firebase.database().ref('/users/'+this.props.user.uid+'/driver/').set(!this.props.user.driver);
        this.props.navigation.navigate("Check");
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });


    press_share = ()=>{
        Share.share({
            message: 'رحله مجانيه عند اضافه هذا الكود '+this.props.user.uid ,
            title: 'ذيبان'
        }, {
            // Android only:
            dialogTitle: 'ذيبان',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="الاعدادات">

                <View style={{ flex: 1, flexDirection: 'column', width: '95%', alignSelf: 'center' }}>
                    <List>
                        <Listitem RightData='رقم العضويه' LeftData={this.props.user.uid} onPress={()=> {this.press_share()}} press={true} />
                        <Listitem RightData='الرصيد' LeftData={this.props.user.balance ? this.props.user.balance : 0}  />

                        <ListItem selected>
                            <Left style={{flex: 1}}>
                                <Switch onValueChange={()=> this.setDriver()} value={this.state.driver} />
                                <Text style={{color: '#B1B1B1', fontFamily: 'Droid Arabic Kufi'}}></Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Text style={{
                                    color: '#727272',
                                    fontSize: 16,
                                    fontFamily: 'Droid Arabic Kufi'
                                }}>سائق</Text>
                            </Right>
                        </ListItem>

                        <Listitem press={true} onPress={()=>{
                          nav.navigate('Complains')
                        }} RightData='الشكاوي' />
                        <Listitem press={true} onPress={()=>{
                          nav.navigate('Policy')
                        }}  RightData='سياسه الخصوصيه' />
                        <Listitem press={true} onPress={()=>{
                          firebase.auth().signOut()
                        }}  RightData='تسجيل الخروج' />
                    </List>
                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={{ height: '50%', width: '90%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ flex: .8, width: '90%', margin: 10, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', flexWrap: 'wrap', padding:10 }}>
                            <Twon text='الرياض' />
                            <Twon text='جده' />
                            <Twon text='الدمام' />
                            <Twon text='المدينه' />
                            <Twon text='بريده' />
                            <Twon text='الطائف' />
                            <Twon text='الرياض' />
                            <Twon text='جده' />
                            <Twon text='الدمام' />
                            <Twon text='المدينه' />
                            <Twon text='بريده' />
                            <Twon text='الطائف' />
                        </View>
                        <View style={{ flex: .2, flexDirection: 'row', width: '60%', justifyContent: 'center', alignSelf: 'center' }}>
                            <Button rounded block onPress={this._toggleModal} style={{ flex: 1, alignSelf: 'center', backgroundColor: '#15588D' }}>
                                <Text style={{ color: 'white', fontSize: 25, }}>حفظ المدن</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
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
)(Settings);

const styles = {

}
