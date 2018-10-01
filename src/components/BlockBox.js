import React, { Component } from 'react';
import {View,I18nManager,Image} from "react-native";
import { strings,currentLocale } from '../i18n';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import Text2 from './Text2.js'

export default class BlockBox extends Component {
    render() {
        return (

            (currentLocale == 'ar')?(<View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#c4c4c4',paddingVertical:13 }}>
            <View style={{flexDirection:'row',flex:.4,alignItems:'center'}}>
            <Image style={{width: 75, height: 75,flex:.5,alignSelf:'flex-start'}}
                      source={{uri: 'https://image.ibb.co/nydN0e/Layer_0.png'}}
            />
              <Text2 text="test.name" style={{flex:.5,fontWeight:'bold',fontSize:15,padding:6,textAlign:'center',color:'black',}}/>

            </View>


          <View style={{flex:.4,flexDirection:'row',alignItems:'center'}}>
          <Text2 text="test.email" style={{flex:.5,textAlign:'center',color:'gray',fontSize:12}}/>

          <Icon name='clock-o' type='FontAwesome' style={{color:'#c4c4c4'}} />
          <Text2 text="test.time" style={{flex:.5,textAlign:'center',color:'gray',fontSize:12,padding:10}}/>
          </View>

          <View style={{flex:.1,alignItems:'center',justifyContent:'center'}}>
          <Icon name='unlock' type='FontAwesome' style={{flex:.3,color:'#c4c4c4'}} />
          </View>
          </View>)
           :
          ( <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#c4c4c4',paddingVertical:13 }}>


          <View style={{flex:.1,alignItems:'center',justifyContent:'center'}}>
          <Icon name='unlock' type='FontAwesome' style={{flex:.3,color:'#c4c4c4'}} />
          </View>

         <View style={{flex:.4,flexDirection:'row',alignItems:'center'}}>

         <Text2 text="test.time" style={{flex:.5,textAlign:'center',color:'gray',fontSize:12,padding:10}}/>
         <Icon name='clock-o' type='FontAwesome' style={{color:'#c4c4c4'}} />
         <Text2 text="test.email" style={{flex:.5,textAlign:'center',color:'gray',fontSize:12}}/>

         </View>


         <View style={{flexDirection:'row',flex:.4,alignItems:'center'}}>
         <Text2 text="test.name" style={{flex:.5,fontWeight:'bold',fontSize:15,padding:6,textAlign:'center',color:'black',}}/>

         <Image style={{width: 75, height: 75,flex:.5,alignSelf:'flex-start'}}
                   source={{uri: 'https://image.ibb.co/nydN0e/Layer_0.png'}}
         />

         </View>
         </View>)



        );
    }
}
