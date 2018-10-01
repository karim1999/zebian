import React, { Component } from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import { Container,Label, Header, Content, Title, Button, Left, Right, Body, Icon, Form, Item, Input, ListItem, Radio } from 'native-base';
import { strings,isRTL } from '../../../i18n';
import Text2 from "../../../components/Text2";
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemSelected:1
        }
    }
    render() {
        return (
            <Container >
                <Header style= {style.header}>
                    <Left>
                        {
                            (Platform.OS === 'android') &&
                            <Button transparent>
                                <Icon onPress={()=>{
                                    this.props.navigation.goBack();
                                }} name='arrow-back' color="white" style={{color:'white'}} />
                            </Button>
                        }
                    </Left>
                    <Body style={style.body}>
                        <Title style={{color:'white'}}><Text2 text="login.new_email" style={{color:'white'}}/></Title>
                    </Body>
                    <Right>
                        {
                            (Platform.OS === 'ios') &&
                            <Button transparent>
                                <Icon onPress={()=>{
                                    this.props.navigation.goBack();
                                }} name='arrow-back' color="white" style={{color:'white'}} />
                            </Button>
                        }
                    </Right>
                </Header>
                <Content padder>
                    <View style={style.viewIcon}>
                        <Icon size={'70'} type='Ionicons' name='camera' style={style.camera}/>
                    </View>

                    <Form>
                        <Item floatingLabel>
                            <Label style={style.label}><Text2 text="signup.username" style={{color:'#000',fontSize:15}}/></Label>
                            <Input />
                        </Item>

                        <Item floatingLabel>
                            <Label style={style.label}><Text2 text="signup.age" style={{color:'#000',fontSize:15}}/></Label>
                            <Input />
                        </Item>

                        <Item floatingLabel>
                            <Label style={style.label}><Text2 text="signup.country" style={{color:'#000',fontSize:15}}/></Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={style.label}><Text2 text="signup.email" style={{color:'#000',fontSize:15}}/></Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={style.label}><Text2 text="signup.password" style={{color:'#000',fontSize:15}}/></Label>
                            <Input secureTextEntry={true}/>
                        </Item>
                    </Form>
                    <View style={{flexDirection:'row',width:'100%',padding:10, justifyContent: "center", alignItems: "center"}}>
                        <ListItem style={{width:'100%'}} onPress={() => this.setState({ itemSelected: 1 })}>
                            <Left>
                                <Radio
                                    color={"#e21347"}
                                    selectedColor={"#e21347"}

                                    selected={this.state.itemSelected == 1}
                                />
                            </Left>
                            <Text2 style={{paddingHorizontal:50}} text='signup.male'/>
                        </ListItem>
                        <ListItem style={{width:'100%'}} onPress={() => this.setState({ itemSelected: 2 })}>
                            <Left>
                                <Radio
                                    color={"#e21347"}
                                    selectedColor={"#e21347"}
                                    selected={this.state.itemSelected == 2 }
                                />
                            </Left>
                            <Text2 style={{paddingHorizontal:50}} text='signup.female'/>
                        </ListItem>
                    </View>
                    <View >
                        <Button  rounded style={style.button} >
                            <Text2 style={style.login} text="signup.signup" />
                        </Button>
                    </View>
                </Content>
            </Container>

        );
    }
}

const style=StyleSheet.create({
    body:{
        justifyContent: 'center',

    },
    header:{
        backgroundColor:'#e21347'
    },
    camera:{
        alignSelf: 'center',
        color:'#c0c0c0',
        paddingTop:15


    },
    viewIcon:{
        backgroundColor:'#e7e7e7',
        width:60,
        height:60,
        alignSelf: 'center',
        marginTop:30,
        borderRadius: 100,
        overflow:'hidden'
    },
    label:{
        marginTop:-5,
    },
    radio:{
        alignSelf:'flex-end',
    },
    inputText:{
        height:60
    },
    button:{
        alignSelf: 'center',
        padding:40,
        backgroundColor:'#e21347',
        marginTop:10

    },
    login:{
        color:'white',
        fontSize:18,

    }


});
