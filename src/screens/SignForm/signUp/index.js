import React, { Component } from 'react';
import { View, Form, Item, Label, Input, Icon, Button, Text, Card, CardItem, Body } from 'native-base';
import { Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import SignBox from '../../../components/common/signBox'
import SignTemplate from '../signTemplate';
import AutoHeightImage from 'react-native-auto-height-image';

import Zeban from '../../../assets/images/png/zeban.png';
import Zeban1 from '../../../assets/images/png/Zeban1.png';
import Sparkels from '../../../assets/images/png/sparkels.png';
import City from '../../../assets/images/png/city.png';

let { width, height } = Dimensions.get('window');

export default class SignUp extends Component {
    render() {
        const nav = this.props.navigation
        return (
            <SignTemplate navigation={nav}>
                <View style={{ flex: 1, height: 100, justifyContent: 'center', flexDirection: 'row' }}>
                    <AutoHeightImage
                        width={width}
                        source={Sparkels}
                        style={{ zIndex: 1 }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', zIndex: 2, }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 40 }}>
                        <AutoHeightImage
                            width={width / 2}
                            source={Zeban}
                            style={{ alignSelf: 'center' }}
                        />
                        <AutoHeightImage
                            width={width / 4}
                            source={Zeban1}
                            style={{ alignSelf: 'center'}}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '80%', alignSelf: 'center' }}>
                        <SignBox icon="facebook" text="تسجيل الدخول بواسطه فيسبوك"/>
                        <SignBox icon="google" text="تسجيل الدخول بواسطه جوجل"/>
                        <SignBox icon="mobile" text="تسجيل الدخول بواسطه الجوال"/>
                    </View>
                </View>
                <ImageBackground source={City} style={{ width: width, height: 190 }}>
                    <Button bordered style={{borderColor:'#2AA2B9', backgroundColor:'transparent', borderRadius:12,alignSelf:'center',}}>
                            <Text style={{color:'#276A8E', fontSize:20}} >ليس الان</Text>
                        </Button>
                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#22688D', textAlign:'center' }}>استخدامك لهذا التطبيق يعني موافقتك علي</Text>
                        <Text style={{ color: '#22688D', fontWeight:'bold', textAlign:'center'}}>الشروط والاحكام</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </SignTemplate>
        );
    }
}