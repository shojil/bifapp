/**
 * Login/Sign Up/Forgot Password Screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  AndroidPermissions,
  Alert,
  Switch,
  TextInput,
  Picker
} from 'react-native';
import FormValidation from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppColors } from '@theme/';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
import { Alerts, Card, Spacer, Text, Button } from '@ui/';

import appvariables from '@constants/appvariables';

/* Component ==================================================================== */
let redirectTimeout;

class BIFReview extends Component {
  static componentName = 'BIF Review';

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount = async () => {

    //console.log("Step  mountedd..... ")
    
  }

  componentWillUnmount = () => {}

  render = () => {

        return (
        	<ScrollView
        automaticallyAdjustContentInsets={false}
      >
          <View style={[AppStyles.container, {width:'100%'}]}>
            <View><Text style={AppStyles.textRemarks}>Please Review all questions:</Text></View>
            {
            	typeof this.props != 'undefined' && typeof this.props.allquestions != 'undefined' && this.props.allquestions.map((qus, i) => {
			      return (
			        <View key={i} style={{paddingLeft:5, paddingTop:5}}>
			        <View><Text style={AppStyles.textRemarks}>{(i+1)}- {qus.text}</Text></View>
			        <View><Text style={AppStyles.textRemarks}>Answer of this question</Text></View>
			        </View>
			      )
			    })
        	}
        	<Button title="Go Back" onPress={() => {this.goBack()}}></Button>
          </View>
          </ScrollView>
        );
    }

    goBack = () => {
        if(typeof this.props.wrapperform != 'undefined')
        {

            appvariables.reviewScreen = false

            this.props.wrapperform.setState({
              status: !this.props.wrapperform.status
            })
        }
    }
}

/* Export Component ==================================================================== */
export default BIFReview;
