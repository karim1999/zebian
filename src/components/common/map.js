import React, { Component } from 'react';
import {
    Image
} from "react-native";
import { } from 'native-base'

export default class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const nav = this.props.navigation
        return (
        	<Image style={{flex: 1, width: '100%', height: 500}} source={require('../../assets/images/map.jpg')}></Image>
        );
    }
}

const styles = {
};
