import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    StatusBar,
    Button
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ModalBox from './src/components/ModalBox'
import ModalView from './src/components/ModalView'
import SearchRoute from "./src/components/serachRoute";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: '',
            destination: '',
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            steps: [],
            legs: [],
        };
        this.orderNow = this.orderNow.bind(this);
        this.orderLimo = this.orderLimo.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openSearchRoute = this.openSearchRoute.bind(this);
        this.closeSearchRoute = this.closeSearchRoute.bind(this);
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        });
    }

    orderLimo() {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?language=en&origin=${this.state.currentLocation}&destination=${this.state.destination}&mode=transit&key=AIzaSyBsrXgDNR_bVCYuKMkhs9LU6c_n9fzNZG8&transit_mode=train|bus`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.routes[0].legs);
                if (responseJson.routes) {
                    this.setState({legs: responseJson.routes[0].legs, steps: responseJson.routes[0].legs[0].steps});
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    closeModal() {
        this.setState({openApproveModal: false})
    }

    orderNow() {
        this.setState({openApproveModal: true})
    }

    openSearchRoute() {
        this.setState({openSearch: true})
    }

    closeSearchRoute() {
        this.setState({openSearch: false})
    }

    onRegionChange(region, lastLat, lastLong) {
        const lat = lastLat || this.state.lastLat;
        const long = lastLong || this.state.lastLong;
        this.setState({
            mapRegion: region,
            lastLat: lat,
            lastLong: long,
        });

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=street_address&language=iw&key=AIzaSyBsrXgDNR_bVCYuKMkhs9LU6c_n9fzNZG8`)
            .then((response) => response.json()).then((responseJson) => {
            if (responseJson.results[0]) {
                this.setState({currentLocation: responseJson.results[0].formatted_address});
            }
        })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const {openApproveModal, steps, currentLocation, openSearch} = this.state;

        return (
            <View style={styles.container}>
                {openSearch && <SearchRoute currentLocation={currentLocation} closeSearchRoute={this.closeSearchRoute}/>}
                {openApproveModal && <ModalBox close={this.closeModal}/>}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 32.78825,
                        longitude: 34.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    onRegionChange={this.onRegionChange.bind(this)}>

                </MapView>
                <View style={styles.orderNow}>
                    <Icon name="motorcycle"  size={30} padding={10} style={{color: '#FFF', marginTop: 18 , marginLeft: 17, width: 39}} onPress={this.orderNow}/>
                </View>

                <View style={styles.searchRoute}>
                    <Icon name="bus" onPress={this.openSearchRoute} size={30}  style={{color: '#FFF', marginTop: 17 , marginLeft: 22, width: 30}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    topViewInput: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,

        color: '#3e3e3e',
        fontSize: 16,
        paddingLeft: 5,
    },
    orderNow: {
        height:70,
        width: 70,
        backgroundColor: '#01579b',
        borderRadius: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    icon: {
        fontSize:32,
    },
    searchRoute: {
        height:70,
        width: 70,
        backgroundColor: '#01579b',
        borderRadius:50,
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF'

    }
});
