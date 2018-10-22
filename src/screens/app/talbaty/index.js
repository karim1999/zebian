import React, { Component } from 'react';
import {  View,} from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/Card2';
import MapMarker from '../../../assets/images/png/map-marker.png';
import GreenDot from '../../../assets/images/png/green-dot.png';
import YellowDot from '../../../assets/images/png/yellow-dot.png';
import Done from '../../../assets/images/png/done.png';
import firebase from 'react-native-firebase'
import {connect} from "react-redux";
import {TouchableOpacity} from 'react-native';
import {_} from 'lodash';
class Talabaty extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders:[
                { test1: { giveShortAddress: 'FirstHeader', giveAddress: 'FirstText' } }
                , { test2: { giveShortAddress: 'SecondSub', giveAddress: 'SecondSub' } }],
            fetch:0
        }
    }
    componentWillMount(){
        const ref = firebase.database().ref('orders');
        var finished = [];
        ref.on('value',snapshot => {
            this.setState({ orders:  _.filter(_.map(snapshot.val(), (value, key)=> {
                    return {...value, key};
                }), order => {
                    return value.user_id == this.props.user.uid
                })
            });
        })

    }
    order_navigate = (order)=>{
        if(order.status == 0){
            this.props.navigation.navigate('offers',{key:order.key})
        }
        else {
            this.props.navigation.navigate('talabDetails1',{order})
        }
    }

    render() {
        const nav = this.props.navigation

        return (
            <AppTemplate navigation={nav} name="طلباتي">
                <View style={{flex: 1, flexDirection: 'row',justifyContent:'center' }}>
                    <View style={{width:'95%'}}>
                        {
                            this.state.orders.map((order,key) => <TouchableOpacity onPress ={()=>this.order_navigate(order)} ><ListCard header={order.giveShortAddress} footer={order.giveAddress} status={order.status} /></TouchableOpacity>)
                        }
                    </View>

                </View>
            </AppTemplate>
        );
    }
}
const mapStateToProps = ({ order,user }) => ({
    order,
    user
});


export default connect(
    mapStateToProps,
)(Talabaty);
