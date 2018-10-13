import React, { Component } from 'react';

import { Button, Text, View } from 'native-base';
import AppTemplate from '../appTemplate';
import Square from '../../../components/common/square';
import Car from '../../../assets/images/png/car0.png';
import Pickup from '../../../assets/images/png/pickup-car.png';
import CarSelected from '../../../assets/images/png/CarSelected.png';
import PickupSelected from '../../../assets/images/png/PickupSelected.png';
import CarUnSelected from '../../../assets/images/png/CarUnSelected.png';
import PickupUnSelected from '../../../assets/images/png/PickupUnSelected.png';
import {TouchableOpacity,AsyncStorage} from 'react-native'
import {connect} from "react-redux";
import {setOrderCar} from "../../../reducers";

 class CarType extends Component {
  constructor(props){
    super(props);
    this.state= {
      pickup:true,
      car:false,
      selected:'pickup'
    }
  }
  accept = ()=>{
    // AsyncStorage.setItem('car',''+this.state.selected);
    this.props.setOrderCar(this.state.selected);
    this.props.navigation.navigate('Home')
  }
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate back={true} navigation={nav} name="حدد نوع السياره">
        <View style={{ flexDirection: 'column', flex: 1, marginTop:30 }}>
          <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', flex: 1 }}>
            <TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
              ()=>{
                this.setState({car:false,pickup:true,selected:'pickup'})
              }
            }
            >
              <Square ImgS={PickupSelected} ImgU={PickupUnSelected} status={this.state.pickup} InnerText='بيك أب' width={90} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
              ()=>{
                this.setState({car:true,pickup:false,selected:'car'})
              }
            }
            >
              <Square ImgS={CarSelected} ImgU={CarUnSelected} status={this.state.car} InnerText='سيدان' width={90} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignSelf: 'center', height: 250, width: '50%',justifyContent:'flex-end' }}>
          <Button onPress={()=>this.accept()} rounded block style={{ backgroundColor: '#15588D', }}>
            <Text style={{fontSize:20}}>موافق</Text>
          </Button>
        </View>
      </AppTemplate>
    );
  }
}

const styles = {

}
const mapStateToProps = ({ order }) => ({
    order,
});

const mapDispatchToProps = {
    setOrderCar
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarType);
