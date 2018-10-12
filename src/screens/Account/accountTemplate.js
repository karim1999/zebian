import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Container, Content, Text, View } from 'native-base'
import AutoHeightImage from 'react-native-auto-height-image';

import User from '../../assets/images/png/user-circle.png';
import Settings from '../../assets/images/png/settings.png';
import Ring from '../../assets/images/png/ring.png';
import SignOut from '../../assets/images/png/sign-out.png';

export default class AccountTemplate extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: '#F1F1F1' }}>

                <View style={{ position: 'relative', height: 160 }}>
                    <Header style={{ overflow: 'visible', height: 100, backgroundColor:'#266A8F' }}>
                        <Left style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-around', flex: 1 }}>
                            <Button transparent>
                                <Icon type="FontAwesome" name='bell' />
                            </Button>
                            <Button transparent>
                                <Icon type="FontAwesome" name='cog' />
                            </Button>
                        </Left>
                        <Body style={{ flex: 1 }}>
                        </Body>
                        <Right style={{ alignSelf: 'flex-end', flex: 1, justifyContent: 'center' }}>
                            <Button transparent style={{ alignSelf: 'center' }}>
                                <Icon type="FontAwesome" name='sign-out' />
                            </Button>
                        </Right>
                    </Header>
                    <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', bottom: 0, marginTop: 20 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>حسابي</Text>
                        <View style={{ backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignSelf: 'center', padding: 10 }}>
                            {/* <Thumbnail large source={User} style={{}} /> */}
                            <AutoHeightImage
                                width={100}
                                source={User}
                            />
                        </View>
                    </View>
                </View>
                <Content >
                    {this.props.children}
                </Content>
            </Container>
        );
    }
}

const styles = {
}
