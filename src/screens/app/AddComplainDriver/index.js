import React, { Component } from 'react';
import { Form, View, Text, Textarea, Button, Icon,Toast } from 'native-base';
import AppTemplate from '../appTemplate'
import {connect} from "react-redux";
import firebase from 'react-native-firebase'
import {_} from 'lodash';


 class AddComplainDriver extends Component {
   constructor(props){
     super(props);
     this.state = {
       desc:'',
       title:''
     }

   }
   complain(){
     if(this.state.desc == '' || this.state.title == '' ){
       Toast.show({
 				text: "الرجاء كتابه بيانات الشكوي",
 				buttonText: "OK",
 				type: "danger",
 				duration: 5000
 			});
     }
     else {
       complain = {
         title: this.state.title,
         desc: this.state.desc,
         user_id: this.props.user.uid,
         user_name:this.props.user.displayName,
         user_email:this.props.user.email
       }
       var addComplain=   firebase.database().ref('complains/').push(
           complain
         )
         Toast.show({
   				text: "تم تسجيل الشكوي بنجاح",
   				buttonText: "OK",
   				type: "success",
   				duration: 5000
   			});
        this.props.navigation.navigate('DriverHome');
     }


   }
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate back={true} navigation={nav} name="ارسال شكوي">
        <View style={{ flexdirection: 'row' }}>
          <Form style={{ marginHorizontal: 14 }}>
            <View  >
              <Text style={{ color: '#2A6C91', marginTop: 10, alignSelf: 'flex-end', fontSize: 20, marginRight: 5, fontWeight: 'bold' }} >عنوان الشكوي</Text>
            </View>
            <Textarea onChangeText={
              (text)=>{
                this.setState({title:text})
              }
            } value={this.state.title} style={{ borderRadius: 6, backgroundColor: 'white' }} rowSpan={2} bordered placeholder="" />
            <View style={{}} >
              <Text style={{ color: '#2A6C91', marginTop: 10, alignSelf: 'flex-end', fontSize: 20, marginRight: 5, fontWeight: 'bold' }} >نص الشكوي</Text>
            </View>
            <Textarea onChangeText={
              (text)=>{
                this.setState({desc:text})
              }
            } value={this.state.desc} style={{ borderRadius: 6, backgroundColor: 'white' }} rowSpan={6} bordered placeholder="" />
          </Form>
        </View>
        <View style={{ flexdirection: 'row', justifyContent:'center',alignItems:'center', marginTop:20}}>
          <Button onPress={()=>{
            this.complain();
          }} iconLeft style={{ alignSelf: 'center', borderRadius:15, backgroundColor:'#15588D' }} >
            <Icon type="FontAwesome" name="check-circle" />
            <Text style={{fontSize:20, fontWeight:'bold'}}>ارسال</Text>
          </Button>
        </View>
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
)(AddComplainDriver);
