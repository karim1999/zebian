import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  Image
} from "react-native";
import { Button, Icon } from 'native-base'
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import haversine from "haversine";
import AppTemplate from '../appTemplate';
import ListCard from '../../../components/common/Card2';
import greenDot from '../../../assets/images/png/green-dot.png';
import Msg from '../../../assets/images/png/send-button.png';
import MapMarker from '../../../assets/images/png/map-marker.png';
import Cancel from '../../../assets/images/png/cancel.png';
let { width, height } = Dimensions.get('window');
import MapComponent from '../../../components/common/map';


const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

export default class TalabDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      })
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => { },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentDidMount() {
    const { coordinate } = this.state;
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate navigation={nav} name="تفاصيل الطلب">
        {/* <View style={{ flexDirection: 'column', height: height/2}}> */}
        <View style={{ position: 'relative' }}>
          <MapComponent />
          {/*<MapView*/}
            {/*provider={PROVIDER_GOOGLE}*/}
            {/*style={styles.map}*/}
            {/*showUserLocation*/}
            {/*followUserLocation*/}
            {/*loadingEnabled*/}
            {/*region={this.getMapRegion()}*/}
          {/*>*/}
            {/*<Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />*/}
            {/*<Marker.Animated*/}
              {/*ref={marker => {*/}
                {/*this.marker = marker;*/}
              {/*}}*/}
              {/*coordinate={this.state.coordinate} />*/}
          {/*</MapView>*/}
          <View style={{ position: 'absolute', top: 0, alignSelf: 'center',height:40, backgroundColor: 'rgba(135, 135, 135, 0.8)' }}>
            <Text style={{ color: 'white', alignSelf: 'center', textAlign: 'center', width: '55%' }}>
              تتطلب خدمه ذيبان فزعه تكاليف اضافيه سيتم تفريغ مندوب بشكل خاص لتوصيل طلبك
            </Text>
          </View>
          <View style={{ position: 'absolute', width: '90%', bottom: 0, alignSelf: 'center' }}>
            <Button iconLeft rounded style={{ alignSelf: 'center', height: 24, backgroundColor: '#15588D' }}>
              <Icon style={{ marginLeft: 3 }}>
                <Image source={Cancel} />
              </Icon>
              <Text style={{ paddingHorizontal: 20, color: 'white', fontSize: 16 }}>الغاء الطلب</Text>
            </Button>
            <ListCard header={'مكان الاستلام '} footer={'حي النصر - شارع الوحده'} rightIconSrc={MapMarker} />
            <ListCard header={'مكان التسليم'} footer={'حي النصر - شارع الوحده'} rightIconSrc={MapMarker} />
          </View>
        </View>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <ListCard header={'نوع السياره '} footer={'سيدان'} deliveryTime='3:00' />
          <ListCard header={'الحاله'} footer={'جاري التوصيل'} leftIconSrc={greenDot} />
          <ListCard header={'السائق'} footer={'عدنان شريف'} btnText="مراسله" btnIconSrc={Msg} />
        </View>
        {/* </View> */}
      </AppTemplate >
    );
  }
}

const styles = {
  // container: {
  //     ...StyleSheet.absoluteFillObject,
  //     justifyContent: "flex-end",
  //     alignItems: "center"
  // },
  map: {
    width: '100%', height: height / 2, flex: 1
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
};
