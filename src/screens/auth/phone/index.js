import React, { Component } from 'react';
import {View, Button, Text, Toast, Item, Form, Input} from 'native-base';
import {Dimensions, TouchableOpacity, ImageBackground, AsyncStorage, ActivityIndicator} from 'react-native';
import SignBox from '../../../components/common/signBox'
import SignTemplate from '../signTemplate';
import AutoHeightImage from 'react-native-auto-height-image';

import Zeban from '../../../assets/images/png/zeban.png';
import Zeban1 from '../../../assets/images/png/Zeban1.png';
import Sparkels from '../../../assets/images/png/sparkels.png';
import City from '../../../assets/images/png/city.png';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import { setUser } from '../../../reducers';

let { width, height } = Dimensions.get('window');

class Phone extends Component {
    constructor(props){
        super(props);
        this.state= {
            phone: "",
            confirm: false,
            confirmResult: "",
            isSubmitting: false,
            code: ""
        }
    }

    submitPhone(){
        this.setState({
            isSubmitting: true
        })
        firebase.auth().signInWithPhoneNumber(this.state.phone).then(confirmResult => {
            this.setState({
                confirm: true,
                confirmResult,
                isSubmitting: false
            })
        }).catch(error => {
            // alert(JSON.stringify(error));
            Toast.show({
                text: "Please, try again later",
                buttonText: "OK",
                type: "danger",
                duration: 5000
            });
            this.setState({
                isSubmitting: false
            })
        })
    }
    confirm(){

        this.setState({
            isSubmitting: true
        });
        this.state.confirmResult.confirm(this.state.code).then(currentUser => {
            this.setState({
                isSubmitting: false
            });
            let user= firebase.database().ref('users/'+currentUser.uid);
            user.once("value").then(snapshot => {
                if(!snapshot.exists()){

                    user.set({currentUser, displayName: currentUser.phoneNumber,accepted:false});
                }
            });
            Toast.show({
                text: "You have signed in successfully",
                buttonText: "OK",
                type: "success",
                duration: 5000
            });
            this.props.navigation.navigate('App')

        }).catch(error => {
            Toast.show({
                text: "Please, use a valid phone number",
                buttonText: "OK",
                type: "danger",
                duration: 5000
            });
            this.setState({
                isSubmitting: false
            })
        })
    }
    async storeItem(key, item) {
        try {
            let jsonOfItem = await AsyncStorage.setItem(key, item);
            return jsonOfItem;
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        const nav = this.props.navigation;
        return (
            <SignTemplate navigation={nav}>
                <View style={{justifyContent: 'center', flex: 1}}>
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
                    <View style={{ flex: .5, flexDirection: 'column', width: '80%', alignSelf: 'center' }}>
                        <Form style={{ alignSelf: 'center' }}>
                            {
                                (this.state.confirm)? (
                                    <View style={{ flex: 1, flexDirection: 'column' }} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: '#266A8F', fontSize: 18, marginTop: 5, marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>رقم التأكيدي</Text>
                                        </View>
                                        <Item>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Input
                                                    keyboardType='phone-pad'
                                                    inputColorPlaceholder="gray"
                                                    placeholder='123456'
                                                    value={this.state.code}
                                                    onChangeText={(code)=> this.setState({code})}
                                                    style={{ borderWidth: 0.5, borderRadius: 7,height:40,textAlign:'center', borderColor: '#266A8F' }} />
                                            </View>
                                        </Item>
                                        <View style={{flex: .5}}>

                                        </View>

                                        <Button onPress={()=> {
                                            if(this.state.confirm){
                                                this.confirm()
                                            }else{
                                                this.submitPhone()
                                            }
                                        }} activeOpacity={.9}  block style={{ backgroundColor: '#15588D',width:'90%',justfyContent:'center',alignItems:'center',alignSelf:'center' }}>
                                            <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi',textAlign:'center' }}>موافق</Text>
                                            {this.state.isSubmitting && (
                                                <ActivityIndicator style={{}} size="small" color="#000000" />
                                            )}
                                        </Button>

                                    </View>
                                ):(
                                    <View style={{ flex: 1, flexDirection: 'column' }} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: '#266A8F', fontSize: 18, marginTop: 5, marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>رقم الهاتف</Text>
                                        </View>
                                        <Item>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Input
                                                    placeholderTextColor="gray"
                                                    keyboardType='phone-pad'
                                                    placeholder='+20 114 046 3805'
                                                    value={this.state.phone}
                                                    onChangeText={(phone)=> this.setState({phone})}
                                                    style={{ borderWidth: 0.5, borderRadius: 7,height:40,textAlign:'center', borderColor: '#266A8F' }} />
                                            </View>
                                        </Item>
                                        <View style={{flex: .5}}>

                                        </View>

                                        <Button onPress={()=> {
                                            if(this.state.confirm){
                                                this.confirm()
                                            }else{
                                                this.submitPhone()
                                            }
                                        }} activeOpacity={.9}  block style={{ backgroundColor: '#15588D',width:'90%',justfyContent:'center',alignItems:'center',alignSelf:'center' }}>
                                            <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi',textAlign:'center' }}>موافق</Text>
                                            {this.state.isSubmitting && (
                                                <ActivityIndicator style={{}} size="small" color="#000000" />
                                            )}
                                        </Button>

                                    </View>
                                )
                            }

                        </Form>

                    </View>
                    <View style={{flex: .5}}>

                    </View>
                </View>
            </SignTemplate>
        );
    }
}
const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Phone);
