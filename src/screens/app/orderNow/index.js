import React, { Component } from 'react';

import { View, Form, Textarea, Text, Button } from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import MapLocation from '../../../assets/images/png/map-location.png'
import Navigation from '../../../assets/images/png/navigation.png'
import Clock from '../../../assets/images/png/clock.png'
import Car from '../../../assets/images/png/car0.png'


export default class OrderNow extends Component {
    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="اطلب الان">
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '90%', flexDirection: 'column' }}>
                        <ListCard header={'حدد مكان الاستلام'} footer={'اختر موقع استلام الشحنه'} rightIcon={MapLocation} onPress={()=>{
                            nav.navigate('RecievePlace')
                        }} rightIconWidth={40} />
                        <ListCard header={'حدد مكان التسليم'} onPress={()=>{
                          nav.navigate('GivePlace')
                        }}footer={'اختر موقع تسليم الشحنه'} rightIcon={Navigation} rightIconWidth={40} />
                        <ListCard onPress={()=>{
                          nav.navigate('Time')
                        }} header={'حددوقت التسليم'} footer={'اختر وقت تسليم الشحنه'} rightIcon={Clock} rightIconWidth={40} />
                        <ListCard onPress={()=>{
                          nav.navigate('CarType')
                        }} header={'حدد نوع السياره'} footer={'بيك أب - سيدان'} rightIcon={Car} rightIconWidth={40} />
                    </View>
                </View>
                <View style={{ flexdirection: 'row' }}>
                    <Form style={{ marginHorizontal: 14 }}>
                        <View style={{ width: '80%', alignSelf: 'center' }}>
                            <Text style={{ color: '#266A8F', fontSize: 18, textAlign: 'center',fontFamily:'Droid Arabic Kufi' }}>تفاصيل الطلب</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15,fontFamily:'Droid Arabic Kufi' }} note>اكتب هنا تفاصيل الغرض الذي ترغب في ارساله مثلا ما هو وكيف حجمه</Text>
                        </View>
                        <Textarea style={{ borderRadius: 14, backgroundColor: 'white',textAlign:'center',fontFamily:'Droid Arabic Kufi' }} rowSpan={4} bordered placeholder="" />
                    </Form>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={() => this.props.navigation.navigate("TalabDetails")} rounded style={{ backgroundColor: '#15588D', alignSelf: 'center', alignItems: 'center', marginVertical: 30, paddingRight: 20, paddingLeft: 20 }}>
                        <Text style={{ fontSize: 18, textAlign: 'center',fontFamily:'Droid Arabic Kufi' }}>اطلب الان !</Text>
                    </Button>
                </View>
            </AppTemplate>
        );
    }
}



const styles = {
    btnBot: {
        backgroundColor: '#15588D',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
    }
}
