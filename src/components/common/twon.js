import React, { Component } from 'react';
import { View, Text, } from 'native-base';
import { CheckBox } from 'react-native';



export default class Twon extends Component {
    render() {
        return (
            <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center' }}>
                <Text style={{color:'#707070', fontSize:15}}>{this.props.text}</Text>
                <CheckBox checked={true} />
            </View>
        );
    }
}

