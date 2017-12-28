import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
var Spinner = require('react-native-spinkit');


export default class SpinnerView extends Component<{}> {
    constructor(props) {
        super(props);
        this.state= {
            index: 0,
                types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
                size: 100,
                color: "#FFFFFF",
                isVisible: true,
        }
    }

    render() {
        return (
            <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={'Circle'} color={'#000'}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize:70,
        height:400,
        width:400,
    },
    spinner: {
        marginBottom: 50
    },

});
