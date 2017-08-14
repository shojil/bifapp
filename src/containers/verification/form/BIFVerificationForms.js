/**
 * BIFVerificationForms Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
import { Spacer, Text, Button } from '@ui/';

import BIFVerificationForm from '@containers/verification/form/BIFVerification1Container';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.brand.primary,
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  logo: {
    width: AppSizes.screen.width * 0.85,
    resizeMode: 'contain',
  },
  whiteText: {
    color: '#FFF',
  },
});

/*const applicantinfo={
  bcilno:'BCIL-EB-885',
  name:'Imran Ahmad Memon',
  residenceaddress:'96 Memon MOHALLAH MALL ROAD KHAIRPUR MEMON MOHALLAH KHAIRPUR',
  regid:'0019NPM000058',
  phone:'032133994883',
  businessname:'Graint Heights'
}*/

/* Component ==================================================================== */
class BIFVerificationForms extends Component {
  static componentName = 'BIFVerificationForms';

  constructor(props) {
    super(props);

     this.state = {
      formstep:0,
      nextbtndisable: true,
      applicantinfo: false
    }
  }
 

  componentDidMount = async () => {

    //console.log("Porps of form: ")
    //console.log(this.props)

    var applicant = {}
    if(typeof this.props.data != 'undefined' && typeof this.props.data.isNew != 'undefined')
    {
      applicant = this.props.data
    }

    const formsteps = await this.getFormStep()

    this.setState({
      formstep: (parseInt(formsteps) + 1),
      applicantinfo: applicant
    })

  }

  /**
    * Handle Go next Question
    */
    goNext = async() => {

      const formsteps = await this.getFormStep()

      this.setState({
        formstep: (parseInt(formsteps) + 1),
        nextbtndisable: true
      })

    }

    /**
    * Handle Show options of this question
    */
    showOptions = () => {

      this.setState({
        nextbtndisable: false
      })

    }

  /**
    * Get form step from AsyncStorage to populate fields
    */
  getFormStep = async () => {
    var jsonValues = 0

    console.log(typeof AppConfig.localstoragekeys + ' !=  undefined && ' + typeof AppConfig.localstoragekeys.verfromstep + ' != undefined')

    if(typeof AppConfig.localstoragekeys != 'undefined' && typeof AppConfig.localstoragekeys.verfromstep != 'undefined')
    {
      console.log("Yes key is in config file : ......")

      jsonValues = await AsyncStorage.getItem(AppConfig.localstoragekeys.verfromstep);

      //await AsyncStorage.setItem(AppConfig.localstoragekeys.fromstep, (jsonValues + 1));
    }

    return jsonValues;
  }

  /**
    * Set form step from AsyncStorage to populate fields
    */
  updateFormStep = (step) => {
    if(typeof AppConfig.localstoragekeys != 'undefined' && typeof AppConfig.localstoragekeys.verfromstep != 'undefined')
    {
      AsyncStorage.setItem(AppConfig.localstoragekeys.verfromstep, (step.toString()));
    }
  }

  render = () => {
    //console.log("Form Rnder ...... " + this.state.formstep)

    //set next step
    this.updateFormStep(this.state.formstep)

    return (
    <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>

      <Spacer size={60} />

      {this.state.applicantinfo && (<BIFVerificationForm applicantinfo={this.state.applicantinfo} mainform={this} openstep={this.state.formstep} nexteisalbe={this.state.nextbtndisable} />)}


      <Spacer size={40} />
    </View>
  )}
}

/* Export Component ==================================================================== */
export default BIFVerificationForms;
