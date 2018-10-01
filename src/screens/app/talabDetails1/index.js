import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image
} from "react-native";
import { Button, Icon, Card, CardItem, Left, Right } from 'native-base'
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import MapComponent from '../../../components/common/map';
import Cancel from '../../../assets/images/png/cancel.png';
import Done from '../../../assets/images/png/done.png';
import MapMarker from '../../../assets/images/png/map-marker.png';
let { width, height } = Dimensions.get('window');



export default class TalabDetails1 extends Component {


    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="تفاصيل الطلب">

                <View style={{ position: 'relative' }}>
                    <MapComponent />
                    <View style={{ position: 'absolute', width: '90%', bottom: 0, alignSelf: 'center' }}>
                        <ListCard header={'مكان الاستلام '} footer={'حي النصر - شارع الوحده'} rightIconSrc={MapMarker} />
                        <ListCard header={'مكان التسليم'} footer={'حي النصر - شارع الوحده'} rightIconSrc={MapMarker} />
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <View style={{ flexDirection: 'column', marginLeft: 5, alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text style={{ color: '#266A8F', fontSize: 20, fontWeight: 'bold' }}>وقت التوصيل</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text note style={{ color: '#707070', fontSize: 15, fontWeight: 'bold' }}>3:00</Text>
                                    </View>
                                </View>
                            </Left>

                            <Right>
                                <View style={{ flexDirection: 'column', marginLeft: 5, alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text style={{ color: '#266A8F', fontSize: 20, fontWeight: 'bold' }}>نوع السياره</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Text note style={{ color: '#707070', fontSize: 15, fontWeight: 'bold' }}>سيدان</Text>
                                    </View>
                                </View>
                            </Right>

                        </CardItem>
                    </Card>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', padding: 10 }}>
                        <Button iconLeft rounded style={{ backgroundColor: '#15588D', height: 40, }}>
                            <Icon style={{ marginLeft: 10 }}>
                                <Image source={Cancel} />
                            </Icon>
                            <Text style={{ paddingHorizontal: 30, color: 'white', fontSize: 25 }}>رفض</Text>
                        </Button>
                        <Button iconLeft rounded style={{ backgroundColor: '#15588D', height: 40, }}>
                            <Icon style={{ marginLeft: 10 }}>
                                <Image source={Done} />
                            </Icon>
                            <Text style={{ paddingHorizontal: 30, color: 'white', fontSize: 25 }}>قبول</Text>
                        </Button>
                    </View>
                </View>
            </AppTemplate>
        );
    }
}
