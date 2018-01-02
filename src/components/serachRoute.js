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

export default class SearchRoute extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            destination: '',
            steps: [],
            legs: [],
        };

        this.orderLimo = this.orderLimo.bind(this);
        this.close = this.close.bind(this);

    }
    orderLimo() {
        const {currentLocation} = this.props;
        fetch(`https://maps.googleapis.com/maps/api/directions/json?language=en&origin=${this.props.currentLocation}&destination=${this.state.destination}&mode=transit&key=AIzaSyBsrXgDNR_bVCYuKMkhs9LU6c_n9fzNZG8&transit_mode=train|bus`)
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

    close() {
        this.props.closeSearchRoute();
    }

    render(){
const {steps} = this.state;
        return (
            <View style={styles.topView}>
                <TouchableHighlight style={styles.closeBtn} onPress={this.close}>
                    <Text >x</Text>
                </TouchableHighlight>
                {steps.length > 0 && <ModalView steps={steps}/>}
                <TextInput
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
                            // color: "#FFF"
                        },
                        description: {
                            fontWeight: 'bold',
                            color:'#FFF',
                        },
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
                <TouchableHighlight style={styles.btn} onPress={this.orderLimo}>
                    <Text style={styles.btnText}>שלח</Text>
                </TouchableHighlight>
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
        backgroundColor: '#01579b',
        zIndex: 9,
    },
    closeBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
    },

    topViewInput: {
        marginTop: 25,
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
    }

});
