import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ModalView from './ModalView';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class SearchRoute extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            destination: '',
            steps: [],
            legs: [],
        };

        this.orderLimoWithTransit = this.orderLimoWithTransit.bind(this);
        this.orderLimoNow = this.orderLimoNow.bind(this);
        this.close = this.close.bind(this);
        this.routeSelected = this.routeSelected.bind(this);

    }
    orderLimoWithTransit() {
        const {currentLocation} = this.props;
        fetch(`https://maps.googleapis.com/maps/api/directions/json?language=en&origin=${this.props.currentLocation}&destination=${this.state.destination}&mode=transit&key=AIzaSyBsrXgDNR_bVCYuKMkhs9LU6c_n9fzNZG8&transit_mode=train|bus`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.routes[0].legs);
                if (responseJson.routes) {
                    this.setState({legs: responseJson.routes[0].legs, steps: responseJson.routes[0].legs[0].steps, openSteps: true});

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    close() {
        this.props.closeSearchRoute();
    }

    routeSelected() {
        const {steps, openSteps} = this.state;
        this.setState({openSteps: false});
        this.props.showRouteSelected(steps);
        this.close()
    }

    orderLimoNow() {
        const {orderLimo} = this.props;
        const {destination} = this.state;
        this.props.orderLimo(destination)
    }


    render(){
        const {steps, openSteps} = this.state;
        return (
            <View style={styles.topView}>
                {openSteps &&<ModalView steps={steps} selectRoute={this.routeSelected}/>}


                <TouchableHighlight style={styles.closeBtn} onPress={this.close}>
                    <Icon name="times" size={15}  style={{color: '#FFF', width: 15}} />
                </TouchableHighlight>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={styles.topViewInput}
                    onChangeText={(currentLocation) => this.setState({currentLocation})}
                    value={this.props.currentLocation}
                />

                <GooglePlacesAutocomplete
                    placeholder="בחר כתובת יעד"
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed="auto" // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => {
                        this.setState({destination: data.description});
                    }}
                    getDefaultValue={() => {
                        return ''; // text input default value
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyBmPFLVlYvx3594B8ASm7zuwQPTGep13_M',
                        language: 'iw', // language of the results
                        types: 'address', // default: 'geocode'
                    }}
                    styles={{
                        zIndex:9,
                        powered: {
                            display: 'none',
                            height: 0,
                        },
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0,
                            marginLeft: 15,
                            marginRight: 15,
                            height: 50,
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16
                        },
                        predefinedPlacesDescription: {
                            //color: '#1faadb'
                        },
                        listView: {
                            marginTop:20,
                        },
                        description: {
                            fontWeight: 'bold',
                            color:'#FFF',
                        },
                        container: {
                            height:20,
                        }
                    }}
                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food',
                    }}
                    filterReverseGeocodingByTypes={[
                        'locality',
                        'administrative_area_level_3',
                    ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    debounce={200}
                />
                <View style={styles.orderNow}>
                    <Icon name="motorcycle"  size={30} padding={10} style={{color: '#3B5998', marginTop: 18 , marginLeft: 17, width: 39}} onPress={this.orderLimoNow}/>
                </View>

                <View style={styles.searchRoute}>
                    <Icon name="bus" size={30}  style={{color: '#3B5998', marginTop: 17 , marginLeft: 22, width: 30}} onPress={this.orderLimoWithTransit} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topView: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 0,
        height: '100%',
        minHeight:200,
        width: '100%',
        backgroundColor: '#3B5998',

        zIndex: 9,
    },
    closeBtn: {
        position: 'absolute',
        top: 5,
        right: -15,
        height: 30,
        width:30
    },

    topViewInput: {
        marginTop: 45,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        color: '#3e3e3e' ,
        fontSize: 16,
        paddingLeft: 5,
    },
    btn: {
        backgroundColor: '#616161',
        width: '100%',
        height: 40,
    },
    btnText : {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 10
    },
    orderNow: {
        height:70,
        width: 70,
        backgroundColor: '#FFF',
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
        backgroundColor: '#FFF',

        position: 'absolute',
        bottom: 10,
        left: 10,
    },

});
