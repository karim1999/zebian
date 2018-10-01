import React, { Component } from 'react';
import {View,I18nManager,Image} from "react-native";
import { strings,currentLocale } from '../i18n';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,Text } from 'native-base';
import Text3 from './Text3.js'

export default class BlockBox extends Component {
    render() {
        return (

            (currentLocale == 'en')?(<View style={{flexDirection:'row',flex:1,}}>

   <View style={{flexDirection:'column',flex:.8,justifyContent: 'space-between',}}>
      <View style={{flexDirection:'row',flex:.2,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
            <Icon name='ios-arrow-forward' type='Ionicons' style={{color:'#c4c4c4',paddingTop:5,paddingHorizontal:5}}/>
            <Text3 style={{textAlign:'center',color:'gray',marginTop:4,paddingHorizontal:5}}
            text="25 m"/>
            <Icon name='clock-o' type='FontAwesome'  style={{color:'#c4c4c4',fontSize:25}} />
            </View>

            <Text3 style={{flex:.7,fontSize:15,color:'black',textAlign:'right',paddingTop:5,paddingHorizontal:5}} text="user name"/>
    </View>
          <Text3 style={{flex:.1,color:'gray',padding:5}} text="test test test test"/>

       <View style={{flexDirection:'row',flex:.2,alignItems:'center',margin:5,justifyContent:'flex-end',borderRadius: 10,borderWidth:1,borderColor: '#d6d7da',marginLeft:11,backgroundColor:'#e6f1f8'}}>

       <Left style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Image
                 style={{width: 20, height: 13,margin:2}}
                 source={{uri: 'https://image.ibb.co/iyDnAp/Calque_1.png'}}
               />
               <Text3 style={{textAlign:'center',fontSize:12}} text="30 year"/>

      </Left>
      <Body style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Text3 text="Avaiable" style={{fontSize:13,color:'#22c88b'}}/>
      <Icon name='controller-record' type='Entypo'  style={{color:'#22c88b',fontSize:19}} />
      </Body>
      <Right style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Text3 style={{textAlign:'center',fontSize:12}} text="1KM"/>
      <Icon name='location-pin' type='Entypo'  style={{color:'#298bdd',fontSize:19}} />
      </Right>

       </View>
      </View>

        <Image
                  style={{width: 75, height: 80,flex:.2,alignSelf:'flex-start'}}
                  source={{uri: 'https://image.ibb.co/nydN0e/Layer_0.png'}}
                />
</View>
)
           :
          ( <View style={{flexDirection:'row',flex:1,}}>
          <Image
                    style={{width: 75, height: 80,flex:.2,alignSelf:'flex-start'}}
                    source={{uri: 'https://image.ibb.co/nydN0e/Layer_0.png'}}
                  />
 <View style={{flexDirection:'column',flex:.8,justifyContent: 'space-between',}}>
    <View style={{flexDirection:'row',flex:.2,justifyContent:'center',alignItems:'center'}}>
        <Text3 style={{flex:.7,fontSize:15,color:'black',textAlign:'right',paddingTop:5,paddingHorizontal:5}} text="حمزه نمره"/>
          <View style={{flex:.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
          <Icon name='clock-o' type='FontAwesome'  style={{color:'#c4c4c4',fontSize:23}} />
          <Text3 style={{textAlign:'center',color:'gray',marginTop:4,paddingHorizontal:5}}
          text="25 د"/>
          <Icon name='ios-arrow-back' type='Ionicons' style={{color:'#c4c4c4',paddingTop:5,paddingHorizontal:5}}/>
          </View>
  </View>
        <Text3 style={{flex:.1,color:'gray',padding:5,fontSize:12}} text="نص تجريبي نص تجريبي نص تجريبي "/>

     <View style={{flexDirection:'row',flex:.2,alignItems:'center',margin:5,justifyContent:'flex-end',borderRadius: 10,borderWidth:1,borderColor: '#d6d7da',marginLeft:11,backgroundColor:'#e6f1f8'}}>

     <Left style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
     <Text3 style={{textAlign:'center',fontSize:12}} text="30 عام"/>

            <Image
               style={{width: 20, height: 13,margin:2}}
               source={{uri: 'https://image.ibb.co/iyDnAp/Calque_1.png'}}
             />

    </Left>
    <Body style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Icon name='controller-record' type='Entypo'  style={{color:'#22c88b',fontSize:19}} />
    <Text3 text="متواجد" style={{fontSize:13,color:'#22c88b'}}/>
    </Body>
    <Right style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Text3 style={{textAlign:'center',fontSize:12}} text="1KM"/>
    <Icon name='location-pin' type='Entypo'  style={{color:'#298bdd',fontSize:19}} />
    </Right>

     </View>
    </View>


</View>)



        );
    }
}
