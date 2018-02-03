import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class SelectCurrentLocation extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: '',
        };

        this.selectCurrentLocation = this.selectCurrentLocation.bind(this);
    }

    selectCurrentLocation() {
        console.log(this.state.currentLocation);
        this.props.selectCurrentLocation(this.state.currentLocation);
        this.props.close();
    }


    render(){
        return (
            <View style={styles.topView}>
                <TouchableHighlight style={styles.closeBtn} onPress={this.props.close}>
                    <Icon name="times" size={20}  style={{color: '#FFF', width: 20}} />
                </TouchableHighlight>
                <GooglePlacesAutocomplete
                    placeholder="בחר כתובת מקור"
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed="auto" // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => {
                        this.setState({currentLocation: data.description});
                        this.selectCurrentLocation();
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
                            marginTop: 30,
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
                    currentLocationLabel="כתובת נוכחית"
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
                {/*<TouchableHighlight style={styles.continueBtn} onPress={this.selectCurrentLocation}>*/}
                    {/*<Text style={styles.continueBtnText}>אישור</Text>*/}
                {/*</TouchableHighlight>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    continueBtn : {
        position: 'absolute',
        bottom: 40,
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
        height: 40,
        width:40
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
