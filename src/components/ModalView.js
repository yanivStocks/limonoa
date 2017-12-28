import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modalbox';
// import SpinnerView from './SpinnerView';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalBox extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            loading : true,
        }
    }

    componentDidMount() {
        const {steps} = this.props;
        console.log(steps);
        this.refs.modal1.open();
    }

    render(){
        const {steps} = this.props;

        return (
            <Modal
                style={[styles.modal, styles.modal1]}
                ref={"modal1"}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}>
                {steps.length > 0 && <View style={{marginLeft: 10}}>
                    {steps.map((step, index) => {
                        return (
                            <Text key={index} style={styles.text}>
                                <Icon name="bus" size={15}
                                      style={{color: '#000', marginRight: 10 ,  marginTop: 10}} />   {step.html_instructions}
                            </Text>
                        )
                    })}
                </View>
                }
                {/*<Button onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}>Disable swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>*/}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    wrapper: {
        paddingTop: 10,
        flex: 1
    },

    modal: {
        zIndex: 300,
        paddingTop: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    modal1: {
        height: '100%',
        backgroundColor: "#FFF"
    },
    btn: {
        margin: 10,
        backgroundColor: "#FFF",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "#616161",
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'left',
        marginTop: 10

    }
});
