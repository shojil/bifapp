/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react'
import ReactNative from 'react-native'

import {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View, TouchableHighlight, TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';
import appvariables from '@constants/appvariables';

// Consts and Libs
import { AppStyles, AppColors } from '@theme/';
import { Button } from '@ui/';

class RNSignatureExample extends Component {
    static componentName = 'BIF Signature';

    constructor(props) {
        super(props);
    }

    render = () => {

        let signdata = ((appvariables.signatureResult && typeof appvariables.signatureResult.encoded != 'undefined') ? "data:image/png;base64,"+appvariables.signatureResult.encoded : "")
        let signimg = ((signdata) ? (<View>
            <Image resizeMode={'contain'} style={{width: 300, height: 300}} source={{uri: signdata}} />
            <Button title="Go Back" onPress={() => { this.goBack() } } ></Button>
            </View>) : (<View></View>))

        return (
        <ScrollView
        automaticallyAdjustContentInsets={false}
      >
            <View style={{ flex: 1, flexDirection: "column", backgroundColor:AppColors.tabbar.background }}>
                {signimg}
                <Text style={{alignItems:"center",justifyContent:"center"}}>Signature Capture Extended </Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => { this.resetSign() } } >
                        <Text>Reset</Text>
                    </TouchableOpacity>

                </View>

            </View>
            </ScrollView>
        );
    }

    saveSign = () => {
        this.refs["sign"].saveImage();
    }

    resetSign = () => {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent = (result) => {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        //console.log(result);

        //console.log(this)

        if(typeof this.props.wrapperform != 'undefined')
        {

            appvariables.signaturePad = false
            appvariables.signatureResult = result

            //console.log("Sign App Varialbles :", appvariables)
            this.props.wrapperform.setState({
              status: !this.props.wrapperform.status
            })
            //this.props.wrapperform.closesignaturePad(this.props.wrapperform)
        }
    }
    _onDragEvent = () => {
         // This callback will be called when the user enters signature
        console.log("dragged");
    }

    goBack = () => {
        if(typeof this.props.wrapperform != 'undefined')
        {

            appvariables.signaturePad = false

            this.props.wrapperform.setState({
              status: !this.props.wrapperform.status
            })
        }
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
        width:250,
        height:350
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

export default RNSignatureExample;

//AppRegistry.registerComponent('RNSignatureExample', () => RNSignatureExample);