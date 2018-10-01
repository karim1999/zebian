import * as React from 'react';
import { StyleSheet } from 'react-native';
import AppTemplate from '../screens/app/appTemplate';
import userBtn from '../png/user-btn.png'
import {
    Content, Item, Input, Text, View, Button, Icon, Container, Header, Spinner
} from 'native-base';

// You can import from local files
import Box from './common/box';

export default class Loading extends React.Component {
    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate navigation={nav} name="navigator.Home">
                <View style={{ display: 'flex', backgroundColor: '#F1F1F1', height: '100%' }}>
                    <Container>
                        <Content>
                            <Spinner color='blue' />
                        </Content>
                    </Container>
                </View>
            </AppTemplate>
        );
    }
}

const style = {
    item: {
        marginRight: 10,
        marginLeft: 10,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12, },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    }
}