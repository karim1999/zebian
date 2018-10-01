import React, { Component } from 'react';
import { Button, Text, View, List } from 'native-base';
import AccountTemplate from '../accountTemplate';

import Coupon from '../../../assets/images/png/coupon.png'
import Listitem from '../../../components/common/ListItem'

export default class UserAccount extends Component {
    render() {
        const nav = this.props.navigation
        return (
            <AccountTemplate navigation={nav} name="حدد نوع السياره">
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: '#15588D', fontSize: 25 }}>Mohamed Awad</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '80%', alignSelf: 'center' }}>
                        <List>
                            <Listitem RightData='اضف كوبون' Icon={Coupon} />
                            <Listitem RightData='رصيد الحساب' LeftData='00 ريال' />
                            <Listitem RightData='عدد الطلبات' LeftData='0' />
                            <Listitem RightData='تعليقات العملاء' LeftData='0 تعليقات' />
                        </List>
                    </View>
                    <View style={{ flex: 1, flexDirection:'row', width:'40%', alignSelf:'center', marginTop:20 }}>
                        <Button rounded block style={{ flex: 1 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                                شحن رصيد
                            </Text>
                        </Button>
                    </View>
                </View>
            </AccountTemplate>
        );
    }
}

const styles = {

}
