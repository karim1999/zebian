import React, { Component } from 'react';
import {  View,Fab, Icon } from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';

export default class Talabaty extends Component {
    state = {
        active: 'true'
      };
    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate back={true} navigation={nav} name="البيانات الشخصيه">
                <View style={{flex:1}} >
                    <View style={{flex: 1,flexDirection:'row',justifyContent:'center' }}>
                        <View style={{width:'90%', flexDirection:'column'}}>
                            <ListCard header={'شكوي بخصوص التسجيل'} footer={'لم يتم التسجيل ..الرجاء متابعه الموضوع'}  />
                            <ListCard header={'شكوي بخصوص التوصيل'} footer={'التوصيل يتاخر'}  />
                        </View>
                    </View>
                    <View style={{flex:3,flexDirection:'row',height:250}}>
                            <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomLeft"
                        onPress={() => {
                          nav.navigate('AddComplain')
                        }}>
                        <Icon name="add" />
                    </Fab>
                    </View>
                </View>
            </AppTemplate>
        );
    }
}

