import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import ModalBox from './src/components/ModalBox'
import ModalMapOrder from './src/components/ModalMapOrder'
import SearchRoute from "./src/components/SerachRoute";
import SelectCurrentLocation from "./src/components/SelectCurrentLocation";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: 'שדרות רוטשילד 1, תל אביב יפו',
            destination: '',
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            steps: [],
            legs: [],
            points: [],
            pickUpLong: false,
            pickUpLat: false,
            approveOrderOnClick: false,
            selectCurrentLocation: false,
            region: {
                latitude: 32.062979,
                longitude: 34.769209,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
        };
        this.orderLimo = this.orderLimo.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openSearchRoute = this.openSearchRoute.bind(this);
        this.closeSearchRoute = this.closeSearchRoute.bind(this);
        this.decode = this.decode.bind(this);
        this.showRouteSelected = this.showRouteSelected.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.closeApproveOrderOnClick = this.closeApproveOrderOnClick.bind(this);
        this.selectCurrentLocation = this.selectCurrentLocation.bind(this);
        this.closeSelectCurrentLocation = this.closeSelectCurrentLocation.bind(this);
        this.openSearchCurrentLocation = this.openSearchCurrentLocation.bind(this);
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0001,
                longitudeDelta: 0.0001
            };
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&result_type=street_address&language=iw&key=AIzaSyBsrXgDNR_bVCYuKMkhs9LU6c_n9fzNZG8`)
                .then((response) => response.json()).then((responseJson) => {
                if (responseJson.results[0]) {
                    this.setState({currentLocation: responseJson.results[0].formatted_address});
                }
            }).catch((error) => {
                console.error(error);
            });
           // this.onRegionChange(region);
        });
    }

    showRouteSelected(steps, destination) {
        let points = [];
        steps.map((step) => {
            console.log(this.decode(step.polyline.points));
            const poly = this.decode(step.polyline.points);
            points = points.concat(poly);
        });
        this.setState({points: points , steps, destination});
    }

    decode(encoded){

        // array that holds the points

        const points=[ ]
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;
        while (index < len) {
            let b, shift = 0, result = 0;
            do {

                b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);


            const dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})

        }
        return points
    }

    closeModal() {
        this.setState({openApproveModal: false})
    }

    closeApproveOrderOnClick() {
        this.setState({approveOrderOnClick: false})
    }

    closeSelectCurrentLocation() {
        this.setState({selectCurrentLocation: false})
    }

    orderLimo(destination) {
        this.setState({openApproveModal: true, openSearch: false, destination})
    }

    openSearchRoute() {
        this.setState({openSearch: true})
    }

    closeSearchRoute() {
        this.setState({openSearch: false})
    }

    /*onRegionChange(region, lastLat, lastLong) {
        const lat = region.latitude;
        const long = region.longitude;
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
        }).catch((error) => {
            console.error(error);
        });
    }*/
    onRegionChange(region) {
        console.log(region);
        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&result_type=street_address&language=iw&key=AIzaSyBsrXgDNR_bVCYuKMkhs9LU6c_n9fzNZG8`)
        //     .then((response) => response.json()).then((responseJson) => {
        //     if (responseJson.results[0]) {
        //         this.setState({currentLocation: responseJson.results[0].formatted_address});
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });
        this.setState({ region });
    }

   /* mapPressed(e) {
        const {destination} = this.state
        if(destination !== '') {
            this.setState({ pickUpLat: e.nativeEvent.coordinate.latitude,
             pickUpLong: e.nativeEvent.coordinate.longitude,
             approveOrderOnClick: true});
        }
    }*/

    selectCurrentLocation(currentLocation)  {
        this.setState({currentLocation});
    }

    openSearchCurrentLocation() {
        this.setState({selectCurrentLocation: true});
    }

    render() {
        const {openApproveModal, currentLocation, openSearch, points, destination, steps, pickUpLong, pickUpLat,approveOrderOnClick, selectCurrentLocation} = this.state;

        return (
            <View style={styles.container}>
                {openSearch && <SearchRoute currentLocation={currentLocation} closeSearchRoute={this.closeSearchRoute} showRouteSelected={this.showRouteSelected} orderLimo={this.orderLimo}/>}
                {openApproveModal && <ModalBox close={this.closeModal} isModalVisible={openApproveModal} destination={destination}/>}
                {approveOrderOnClick && <ModalMapOrder close={this.closeApproveOrderOnClick} isModalVisible={approveOrderOnClick} destination={destination}/>}
                {selectCurrentLocation && <SelectCurrentLocation close={this.closeSelectCurrentLocation} isModalVisible={selectCurrentLocation} selectCurrentLocation={this.selectCurrentLocation}/>}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.region}
                    showsUserLocation={true}
                    followUserLocation={true}
                    // moveOnMarkerPress={false}

                    onRegionChange={this.onRegionChange}
                    //  onPress={this.mapPressed.bind(this)}

                >
                    {pickUpLong && <MapView.Marker
                        coordinate={{latitude: pickUpLat, longitude: pickUpLong}}
                        title={'איסוף'}
                        pinColor={'#3B5998'}
                    />
                    }

                    <MapView.Polyline
                        coordinates={points}
                        strokeColor="#3B5998"
                        strokeWidth={6}
                    />


                </MapView>
                {points.length === 0 && <View style={styles.bottomButtons}>
                    <Text style={{fontSize: 22, color: '#3B5998' , textAlign: 'center', marginTop: 10, marginBottom: 20}}
                          onPress={this.openSearchCurrentLocation}>
                        <Text>{currentLocation}</Text>

                    </Text>
                    <TouchableHighlight style={styles.continueBtn} onPress={this.openSearchRoute}>
                        <Text style={styles.continueBtnText}>המשך</Text>
                    </TouchableHighlight>
                </View>}
                {points.length > 0 &&
                <View style={styles.steps}>
                    {steps.length > 0 && <View style={{marginLeft: 10}}>
                        <TouchableHighlight>
                            <View style={{marginBottom:20 , marginTop:20}}>
                                {steps.map((step, index) => {
                                    return (
                                        <Text key={index} style={styles.stepRow}>
                                            <Icon name={`${step.travel_mode === 'WALKING' ? 'arrow-right' : 'bus' }`} size={15}
                                                  style={{color: '#000', marginRight: 10 ,  marginTop: 10}} />   {step.html_instructions}
                                        </Text>
                                    )
                                })}
                            </View>
                        </TouchableHighlight>
                    </View>
                    }
                </View>
                }
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
        zIndex:2
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

    text: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF'

    },
    continueBtn : {
        height:50,
        width: '80%',
        backgroundColor: '#3e3e3e',
        marginLeft: '10%'

    },
    continueBtnText : {
        color: '#FFF',
        fontSize:20,
        textAlign: 'center',
        fontWeight:'bold',
        marginTop:10

    },
    bottomButtons : {
       backgroundColor: '#FFF',
       height:150,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    steps : {
        backgroundColor: '#FFF',
        opacity:0.8,
        height:'auto',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    stepRow: {
        color: "#616161",
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'left',
        marginTop: 10

    }
});
