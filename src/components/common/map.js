import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    Dimensions,
    Image
} from "react-native";
import { } from 'native-base'
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE, } from "react-native-maps";
import haversine from "haversine";

let { width, height } = Dimensions.get('window');


const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

export default class MapComponent extends Component {
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
            <MapView
                // provider={PROVIDER_GOOGLE}
                style={styles.map}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={this.getMapRegion()}
            >
                <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                <Marker.Animated
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={this.state.coordinate} />
            </MapView>
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
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
};
