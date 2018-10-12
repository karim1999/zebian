import React, { Component } from 'react';
import {  Button, Icon,  Text, View,Textarea } from 'native-base';
import AppTemplate from '../appTemplate';


export default class Invite extends Component {
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate navigation={nav} name="نوع الحساب">
           <View style={{flexDirection:'column', width:'90%',justifyContent:'center', alignSelf:'center',}}>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:30,}}>
                    <Text style={{color:'#929292',fontWeight:'bold', alignSelf:'center', fontSize:25, marginHorizontal:20,textAlign:'center'}}>قم بدعوه صديق للحصول علي خصومات رائعه</Text>
                    <Textarea style={{width:'80%',borderRadius:6, backgroundColor:'white', color:'#2C8092',textAlign:'center',fontSize:25}} rowSpan={2}  bordered placeholder="qe332459o" value={'qe332459'} />
                    <Button rounded iconLeft  style={styles.btnBot}>
                        <Icon type="FontAwesome" name="user-plus" />
                        <Text style={{fontSize:20}}>دعوه صديق</Text>
                    </Button>
                </View>
                <View style={{borderBottomColor: '#bbb',borderBottomWidth: 1,marginTop:30, marginBottom:20}}/>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:30,}}>
                    <Text style={{color:'#929292',fontWeight:'bold', alignSelf:'center', fontSize:25, marginHorizontal:20,textAlign:'center'}}>قم بدعوه صديق للحصول علي خصومات رائعه</Text>
                    <Textarea style={{width:'80%',borderRadius:6, backgroundColor:'white', color:'#2C7092',textAlign:'center',fontSize:25}} rowSpan={2}  bordered placeholder="qe332459o" value={'qe332459'} />
                    <Button rounded style={{ backgroundColor:'#15588D',alignSelf:'center',alignItems:'center',marginTop:30,paddingRight:30,paddingLeft:30}}>
                        <Text style={{fontSize:20, textAlign:'center'}}>ادخال</Text>
                    </Button>
                </View>
           </View>
                
                
      </AppTemplate>
    );
  }
}


    
const styles = {   
    btnBot:{
         backgroundColor:'#15588D',
         alignSelf:'center',
         alignItems:'center',
         marginTop:30,
       }
   }