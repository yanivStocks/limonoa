import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modalbox';
// import SpinnerView from './SpinnerView';


export default class ModalBox extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            loading : true,
            showSuccessMsg: false,
            success: false
        }
        this.showSuccessMsg = this.showSuccessMsg.bind(this);

    }

    componentDidMount() {

        this.refs.modal3.open();
        setTimeout(() => {
            this.setState({loading: false, success: true});
        },4000);
    }

    showSuccessMsg() {
        this.setState({showSuccessMsg: true , success: false});
    }

    render(){
        const {loading, showSuccessMsg, success} = this.state;
        const {close} = this.props;
        return (
            <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                {loading &&
                <View >
                    <ActivityIndicator size="large" color="#3B5998" />
                    <Text style={{color: '#3B5998', fontSize: 14, marginTop: 30 }}>Looking for a ride for you</Text>
                </View>
                    }
                {success && <View>
                    <Text style={{color: '#3B5998', fontSize: 14, textAlign: 'center'}}>We Found A ride for you</Text>
                    <Text style={{color: '#3B5998', fontSize: 14, marginTop: 15, textAlign: 'center'}}>The prise will be
                        <Text style={{color: '#616161', fontSize: 16, fontWeight: '600'}} > 29 NIS</Text>
                    </Text>
                    <TouchableHighlight onPress={close} style={styles.approveBtn}>
                        <Text style={{color: '#FFF', fontSize: 15, fontWeight: '600', textAlign: 'center'}} onPress={this.showSuccessMsg}>APPROVE</Text>
                    </TouchableHighlight>
                </View>}
                {showSuccessMsg &&
                    <View>
                        <Text style={{color: '#3B5998', fontSize: 14 ,textAlign: 'center'}}>Thank you for choosing</Text>
                        <Text style={{color: '#fbc02d', fontSize: 16, fontWeight: '600',  marginTop: 15 , textAlign: 'center'}} >LEMONOA</Text>
                        <Text style={{color: '#3B5998', fontSize: 14, marginTop: 15, textAlign: 'center'}}>The ride will come in <Text>3 Minutes</Text></Text>
                        <TouchableHighlight onPress={close} style={styles.approveBtn}>
                            <Text style={{color: '#FFF', fontSize: 15, fontWeight: '600', textAlign: 'center'}} onPress={close}>Close</Text>
                        </TouchableHighlight>
                    </View>
                }
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        zIndex: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300,
        borderRadius: 5,
    },

    modal4: {
        height: 300
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        padding: 10
    },
    approveBtn: {
        margin: 10,
        marginTop: 30,
        backgroundColor: "#616161",
        padding: 10
    },
    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    }
});
