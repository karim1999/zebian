import React, { Component } from 'react';
import {  View,Fab, Icon } from 'native-base';
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/card';
import {connect} from "react-redux";
import firebase from 'react-native-firebase'
import {_} from 'lodash';
import {TouchableOpacity} from 'react-native';

 class Complains extends Component {

      constructor(props){
        super(props);
        this.state = {
          complains:[
             { test1: { giveShortAddress: 'FirstHeader', giveAddress: 'FirstText' } }
             , { test2: { giveShortAddress: 'SecondSub', giveAddress: 'SecondSub' } }],
          fetch:0
        }
      }
      componentWillMount(){
        const ref = firebase.database().ref('complains');
    var finished = [];
    ref.on('value',snapshot => {
       this.setState({ complains:  _.map(snapshot.val(), (value, key)=> {
         if(value.user_id == this.props.user.uid){
             return {...value, key};
         }
            })
           });
      })

      }

    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate back={true} navigation={nav} name="الشكاوي">
                <View style={{flex:1}} >
                    <View style={{flex: 1,flexDirection:'row',justifyContent:'center' }}>
                        <View style={{width:'95%', flexDirection:'column'}}>
                        {
                          this.state.complains.map((complain,key) =>
                          <ListCard header={complain.title} footer={complain.desc}  />
                        )
                        }
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
const mapStateToProps = ({ order,user }) => ({
    order,
    user
});


export default connect(
    mapStateToProps,
)(Complains);
