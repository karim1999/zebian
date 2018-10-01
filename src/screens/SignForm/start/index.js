import React, { Component } from 'react';
import { View, Form, Item, Label, Input, Icon,Button,Text } from 'native-base';
import { Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import SignTemplate from '../signTemplate';
import AutoHeightImage from 'react-native-auto-height-image';

import Zeban from '../../../assets/images/png/zeban.png';
import Zeban1 from '../../../assets/images/png/Zeban1.png';
import Sparkels from '../../../assets/images/png/sparkels.png';
import City from '../../../assets/images/png/city.png';

let { width, height } = Dimensions.get('window');

export default class StartScreen extends Component {
    render() {
        const nav = this.props.navigation
        return (
            <SignTemplate navigation={nav}>
             <View style={{ flex: 1, height: 100, justifyContent: 'center', flexDirection: 'row'}}>
                    <AutoHeightImage
                        width={width}
                        source={Sparkels}
                        style={{ zIndex: 1 }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', zIndex: 2, }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom:40 }}>
                        <AutoHeightImage
                            width={width / 2}
                            source={Zeban}
                            style={{ alignSelf: 'center' }}
                        />
                        <AutoHeightImage
                            width={width / 4}
                            source={Zeban1}
                            style={{ alignSelf: 'center' }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row',  justifyContent:'center',borderWidth:1, borderRadius: 12, borderColor: '#A6AEB8',marginBottom:10  }} >
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Input placeholder="اسم المستخدم" style={{ borderWidth:0, color:'#8E8E8E' }} />
                            </View>
                            <View style={{ flex: 0.1, flexDirection: 'column', justifyContent: 'center', alignSelf:'center' }}>
                                <Icon type="FontAwesome" name="user" />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row',  justifyContent:'center',borderWidth:1, borderRadius: 12, borderColor: '#A6AEB8',  }} >
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Input placeholder="الرمز السري" style={{ borderWidth:0, color:'#8E8E8E' }} />
                            </View>
                            <View style={{ flex: 0.1, flexDirection: 'column', justifyContent: 'center', alignSelf:'center' }}>
                                <Icon type="FontAwesome" name="lock" />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row',  justifyContent:'center' }} >
                           <Button block rounded style={{flex:1, backgroundColor:'#15588D', borderRadius:9, marginTop:10}}>
                               <Text style={{fontSize:20}}>
                                   دخول
                               </Text>
                           </Button>
                        </View>
                    </View>
                </View>
                <ImageBackground source={City} style={{width:width, height: 190}}>
                        <TouchableOpacity style={{alignSelf:'center', justifyContent:'center', marginTop:40}}>
                            <Text style={{color:'#22688D'}}>نسيت كلمه المرور ؟</Text>
                        </TouchableOpacity>
                </ImageBackground>
            </SignTemplate>
        );
    }
}