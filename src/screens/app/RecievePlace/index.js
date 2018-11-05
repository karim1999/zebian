import React, { Component } from 'react';
import {
    View,
    Dimensions,
    PermissionsAndroid,
    AsyncStorage
} from "react-native";

import {Button,Text} from 'native-base'

import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/Card2';
import MapComponent from '../../../components/common/map';

import MapMarker from '../../../assets/images/png/map-marker.png';
import MapView from 'react-native-maps';
import {connect} from "react-redux";
import {setOrderRecieveAddress} from "../../../reducers";
import {setOrderRecievePos} from "../../../reducers";
import {setOrderRecieveShortAddress} from "../../../reducers";
let { width, height } = Dimensions.get('window');



 class RecivePlace extends Component {
constructor(props){
  super(props);
  // const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

  this.state = {
    fetch:0,
    pos:{
      lat:this.props.order.recievePos.lat,
      long:this.props.order.recievePos.long
    },
    address:this.props.order.recieveAddress,
    short_address:this.props.order.recieveShortAddress

  }
}
accept = ()=>{
  // AsyncStorage.setItem('car',''+this.state.selected);
  this.props.setOrderRecieveAddress(this.state.address);
  this.props.setOrderRecievePos(this.state.pos);
  this.props.setOrderRecieveShortAddress(this.state.short_address)
  this.props.navigation.navigate('Home')
}

set_location = (location) =>{
  fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      location.coordinate.latitude +
      ',' +
      location.coordinate.longitude +
      '&language=ar&key=AIzaSyCxXoRqTcOTvsOLQPOiVtPnSxLUyGJBFqw',
    { headers: { 'Cache-Control': 'no-cache' } }
  )
    .then(res => res.json())
    .then(resJson => {
      var target = resJson.results[0].address_components;
      // AsyncStorage.setItem('recieve_address',resJson.results[0].formatted_address);
      AsyncStorage.setItem('recieve_short_address',resJson.results[0].address_components[1].long_name)

      this.setState({
        address:resJson.results[0].formatted_address,
        short_address:resJson.results[1].address_components[0].long_name
      })
    });
    this.setState({
    	pos: {
    		lat: location.coordinate.latitude,
    		long: location.coordinate.longitude
    	}
    })
    // AsyncStorage.setItem('recieve_long',location.coordinate.latitude);
    // AsyncStorage.setItem('recieve_lat',location.coordinate.longitude);


}
componentDidMount(){
  navigator.geolocation.getCurrentPosition(
    (position) => {

      this.setState({
        pos: {
          long: position.coords.longitude,
          lat: position.coords.latitude
        },
        fetch:1
      });
      // AsyncStorage.setItem('recieve_long',position.coords.longitude);
      // AsyncStorage.setItem('recieve_lat',position.coords.longitude);

      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          position.coords.latitude +
          ',' +
          position.coords.longitude +
          '&language=ar&key=AIzaSyCxXoRqTcOTvsOLQPOiVtPnSxLUyGJBFqw',
        { headers: { 'Cache-Control': 'no-cache' } }
      ).then(res => res.json())
      .then(resJson => {
        alert
        var target = resJson.results[0].address_components;
        // AsyncStorage.setItem('recieve_address',resJson.results[0].formatted_address);
        // AsyncStorage.setItem('recieve_short_address',resJson.results[0].address_components[1].long_name)

        this.setState({
          address:resJson.results[0].formatted_address,
          short_address:resJson.results[1].address_components[1].long_name

        })
      })
    })

}
    render() {
        const nav = this.props.navigation
        return (
            <AppTemplate back={true} navigation={nav} name="حدد مكان الاستلام">

                <View style={{ position: 'relative' }}>
                <View style={{backgroundColor:'gray',height:40}}>
                  <Text style={{fontFamily:'Droid Arabic Kufi',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>اضغط علي العلامه ثم اسحب</Text>
                </View>
                {
                (this.state.fetch == 1)?

                   <MapView
                     style={{ flex: 1,height:500 }}
                     showsMyLocationButton={true}
                     showsUserLocation = {true}
                     followUserLocation = {true}
                     showsMyLocationButton = {true}
                     zoomEnabled = {true}

                     initialRegion={{
                       latitude: this.state.pos.lat,
                       longitude: this.state.pos.long,
                       longitudeDelta:0.04250270688370961,
                     latitudeDelta:0.03358723958820065

                     }}
                   >
                     <MapView.Marker
                       coordinate={{
                         latitude: this.state.pos.lat,
                         longitude: this.state.pos.long
                       }}

                       
                       onDragEnd={(e) =>
                       {
                         this.set_location(e.nativeEvent);

                       }
                       }
                        draggable
                        onSelect={() => console.log('onSelect', arguments)}
                        onDragStart={() => console.log('onDragStart', arguments)}

                     />
                   </MapView>

                   :null
                  }

                       <View style={{ position: 'absolute', width: '90%', bottom: 0, alignSelf: 'center' }}>
                        <ListCard header={this.state.short_address} footer={this.state.address} rightIconSrc={MapMarker} />

                    </View>


                </View>
                <Button onPress={()=>this.accept()} rounded block style={{ backgroundColor: '#15588D', }}>
                  <Text style={{fontSize:20}}>موافق</Text>
                </Button>
            </AppTemplate>
        );
    }
}
const mapStateToProps = ({ order }) => ({
    order,
});

const mapDispatchToProps = {
    setOrderRecieveAddress,
    setOrderRecievePos,
    setOrderRecieveShortAddress
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecivePlace);
