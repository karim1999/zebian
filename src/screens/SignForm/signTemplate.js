import React, { Component } from 'react';
import { Image, Dimensions, ImageBackground } from 'react-native'
import { Container, Content, View } from 'native-base'
import AutoHeightImage from 'react-native-auto-height-image';


import Sparkels from '../../assets/images/png/sparkels.png';
import City from '../../assets/images/png/city.png';

let { width, height } = Dimensions.get('window');

export default class SignTemplate extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: '#F1F1F1' }}>
                <Content style={{ zIndex: 2, height:height, position:'relative' }}>
                    {this.props.children}
                </Content>
            </Container>
        );
    }
}

const styles = {
}
