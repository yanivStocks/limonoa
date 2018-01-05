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


export default class ModalMapOrder extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            loading : false,
            showSuccessMsg: false,
            success: false,
            approveOrder: true
        }
        this.showSuccessMsg = this.showSuccessMsg.bind(this);
        this.approveOrder = this.approveOrder.bind(this);

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

    approveOrder() {
        this.setState({approveOrder: false , loading: true});

    }

    render(){
        const {loading, showSuccessMsg, success, approveOrder} = this.state;
        const {close, destination} = this.props;
        return (
            <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                {approveOrder && <View>
                    <Text style={{color: '#3B5998', fontSize: 14, marginTop: 30, textAlign: 'center'}}>האם ברצונך להזמין לימונוע</Text>
                    <TouchableHighlight onPress={close} style={styles.approveBtn}>
                        <Text style={{color: '#FFF', fontSize: 15, fontWeight: '600', textAlign: 'center'}}
                              onPress={this.approveOrder}>אישור</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={close} style={styles.cancelBtn}>
                        <Text style={{color: '#FFF', fontSize: 15, fontWeight: '600', textAlign: 'center'}}
                              onPress={close}>ביטול</Text>
                    </TouchableHighlight>
                </View>
                }

                {loading &&
                <View >
                    <ActivityIndicator size="large" color="#3B5998" />
                    <Text style={{color: '#3B5998', fontSize: 14, marginTop: 30, textAlign: 'center'}}>מחפש לימונוע עבורך</Text>
                </View>
                }
                {success && <View>
                    <Text style={{color: '#3B5998', fontSize: 16, textAlign: 'center', fontWeight: '700', marginBottom: 15}}>יש!</Text>
                    <Text style={{color: '#3B5998', fontSize: 14, textAlign: 'center', marginBottom: 15}}>נמצא נהג עבורך</Text>
                    <Text style={{color: '#3B5998', fontSize: 14, textAlign: 'center', marginBottom: 15}}>היעד: </Text>
                    <Text style={{color: '#3B5998', fontSize: 16, textAlign: 'center', fontWeight: '700', marginBottom: 15}}>{destination}</Text>
                    <Text style={{color: '#3B5998', fontSize: 15, textAlign: 'center', marginBottom: 15}}>ליאור עם לימונוע מס 2 יחכה לך בתחנה </Text>
                    <Text style={{color: '#3B5998', fontSize: 14, marginTop: 15, textAlign: 'center', marginBottom: 15}}>המחיר:
                        <Text style={{color: '#616161', fontSize: 16, fontWeight: '600'}} > 29 שקלים חדשים</Text>
                    </Text>
                    <TouchableHighlight onPress={close} style={styles.approveBtn}>
                        <Text style={{color: '#FFF', fontSize: 15, fontWeight: '600', textAlign: 'center'}} onPress={this.showSuccessMsg}>אישור</Text>
                    </TouchableHighlight>
                </View>}
                {showSuccessMsg &&
                <View>
                    <Text style={{color: '#3B5998', fontSize: 14 ,textAlign: 'center'}}>תודה שבחרת</Text>
                    <Text style={{color: '#fbc02d', fontSize: 16, fontWeight: '600',  marginTop: 15 , textAlign: 'center'}} >LEMONOA</Text>
                    <Text style={{color: '#3B5998', fontSize: 14, marginTop: 15, textAlign: 'center', marginBottom: 15}}> האופנוע יגיע תוך<Text>12 דקות </Text></Text>
                    <TouchableHighlight onPress={close} style={styles.approveBtn}>
                        <Text style={{color: '#FFF', fontSize: 15, fontWeight: '600', textAlign: 'center'}} onPress={close}>סגור</Text>
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
        alignItems: 'center',
        height:400,
        width: '90%'
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        borderRadius: 5,

    },

    modal4: {
        height: 300
    },
    approveBtn: {
        margin: 10,
        marginTop: 30,
        backgroundColor: "#3B5998",
        padding: 10
    },
    cancelBtn: {
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
    },
    btn: {
        backgroundColor: '#616161',
        width: '90%',
        height: 40,
        borderRadius: 4,
        marginLeft: '5%',
    },
    btnText : {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 10
    }
});
