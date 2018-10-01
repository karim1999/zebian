import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import {View,I18nManager} from "react-native";
import { strings,currentLocale } from '../i18n';

export default class Text3 extends Component {
    render() {
        return (
            <Text {...this.props} style={[this.props.style,{
            }]}>{this.props.text}</Text>
        );
    }
}
