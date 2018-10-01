import React, { Component } from 'react';
import {  View,} from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/Card2';
import MapMarker from '../../../assets/images/png/map-marker.png';
import GreenDot from '../../../assets/images/png/green-dot.png';
import YellowDot from '../../../assets/images/png/yellow-dot.png';
import Done from '../../../assets/images/png/done.png';

export default class Talabaty extends Component {
    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="طلباتي">
                <View style={{flex: 1, flexDirection: 'row',justifyContent:'center' }}>
                    <View style={{width:'90%'}}>
                        <ListCard header={'توصيل شاشه'} footer={'حي النصر- شارع الوحده'} status='1' />
                        <ListCard header={'توصيل اثاث منزلي'} footer={'شارع خالد بن الوليد'} status='3' />
                        <ListCard header={'توصيل اجهزه كهربائيه'} footer={'حي الامل'} status='2' />
                    </View>
                </View>
            </AppTemplate>
        );
    }
}
