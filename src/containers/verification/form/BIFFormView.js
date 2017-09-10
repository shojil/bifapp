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
  AndroidPermissions,
  Alert,
  Switch
} from 'react-native';

import {
  Divider
} from 'react-native-elements';
import FormValidation from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppColors } from '@theme/';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
import { Alerts, Card, Spacer, Text, Button } from '@ui/';
import TcombTextInput from '@components/tcomb/TextInput';
import Permissions from 'react-native-permissions'

import Geocoder from 'react-native-geocoding'
import Setp1 from './BIFStep1'
import Spinner from 'react-native-loading-spinner-overlay'
import RNSignatureExample from './RNSignatureExample'
import BIFReview from './BIFReview'
import appvariables from '@constants/appvariables'

/* Component ==================================================================== */
let redirectTimeout;
class BIFAuthForm extends Component {
  static componentName = 'BIF Verification';

  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    submit: PropTypes.func,
    onSuccessfulSubmit: PropTypes.func,
    formType: PropTypes.oneOf(['verification', 'signUp', 'passwordReset', 'updateProfile']),
    formFields: PropTypes.arrayOf(PropTypes.string),
    buttonTitle: PropTypes.string,
    successMessage: PropTypes.string,
    introTitle: PropTypes.string,
    introText: PropTypes.string,
  }

  static defaultProps = {
    user: null,
    submit: null,
    onSuccessfulSubmit: null,
    formType: 'verification',
    formFields: ['Question', 'Remarks'],
    buttonTitle: 'Next',
    successMessage: 'Awesome, Form is now saved',
    introTitle: null,
    introText: null,
  }

  constructor(props) {
    super(props);

    // What fields should exist in the form?
    const formFields = {};
    formFields.Question = FormValidation.Boolean;
    formFields.Remarks = FormValidation.String;

    //if (props.formFields.indexOf('Email') > -1) formFields.Email = this.validEmail;
    //if (props.formFields.indexOf('Password') > -1) formFields.Password = this.validPassword;
    //if (props.formFields.indexOf('ConfirmPassword') > -1) formFields.ConfirmPassword = this.validPassword;
    //if (props.formFields.indexOf('FirstName') > -1) formFields.FirstName = FormValidation.String;
    //if (props.formFields.indexOf('LastName') > -1) formFields.LastName = FormValidation.String;

    this.state = {
      initialPosition: 'unknown',
      currentadd: 'unknown',
      questions:[],
      newbusiness: false,
      locationLoading: false,
      nextbtnenable: true,
      status: false,
      _mounted: true,
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct(formFields),
      form_values: {
        Question: '',
        Remarks: '',
      },
      options: {
        fields: {
          Question: {
            template: TcombTextInput,
            error: 'Please enter a valid username',
            autoCapitalize: 'none',
            clearButtonMode: 'while-editing',
          },
          Remarks: {
            template: TcombTextInput,
            error: 'Please enter a valid email',
            autoCapitalize: 'none',
            clearButtonMode: 'while-editing',
          }
        },
      },
    };
  }

  requestLocationPermission = async () => {
  try {
    const granted = await AndroidPermissions.requestPermission(
      AndroidPermissions.PERMISSIONS.LOCATION,
      {
        'title': 'Get our current location',
        'message': 'Our App need to show curent location of this mobile. ' +
                   'That we can share on our server.'
      }
    )
    if (granted) {
      console.log("You have permissions.")
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

  componentDidMount = async () => {
    // Pre-populate any details stored in AsyncStorage
    const values = await this.getStoredCredentials();

    appvariables.signaturePad = false

    this.setState({
      _mounted: true
    })

    //console.log("Current User Info:")
    //console.log(values)

    if (values !== null && values.username && values.password) {
      this.setState({
        form_values: {
          ...this.state.form_values,
          Username: values.username || '',
          Password: values.password || '',
        },
      });

      console.log("VerForm Component Did Mount ....")

    }


    /**
      check first business type is it new business or existing business

    */

    if(typeof this.props.applicantinfo != 'undefined' && typeof this.props.applicantinfo.isNew != 'undefined')
    {
      var existingbusqus = [
      {text:'Business exists?', type:'location'},
      {text:'Business same as mentioned?', type:'boolean'},
      {text:'Business established since?', type:'detail'},
      {text:'Is business running?', type:'boolean'},
      {text:'Is applicant owner?', type:'boolean'},
      {text:'Doc proof of ownership?', type:'boolean'},
      {text:'Applicant was present?', type:'boolean'},
      {text:'Personal/business Bank A/C?', type:'bankaccount'},
      {text:'Account statement provided?', type:'boolean'},
      {text:'Account statement verified?', type:'boolean'},
      {text:'Business places?', type:'selection', list:['Owned', 'Family Owned', 'Rented', 'Others']},
      {text:'Ownership docs seen/obtained?', type:'boolean'},
      {text:'NEIGHBOURHOOD VERIFICATION # 1?', type:'neighbourhood'},
      {text:'NEIGHBOURHOOD VERIFICATION # 2?', type:'neighbourhood'},
      {text:'Photographs taken?', type:'takephoto'},
      {text:'Confirmation', type:'confirmation'}
      ];

      var newbusqus = [
      {text:'Lives at given address?', type:'location'},
      {text:'Applicnat was present?', type:'boolean'},
      {text:'Utility bills provided?', type:'utilitybills', list:['Electricity', 'Gas', 'Phone']},
      {text:'Residence is?', type:'selection', list:['Owned', 'Family Owned', 'Rented', 'Others']},
      {text:'Ownership docs seen/obtained?', type:'boolean'},
      {text:'NEIGHBOURHOOD VERIFICATION # 1?', type:'neighbourhood'},
      {text:'NEIGHBOURHOOD VERIFICATION # 2?', type:'neighbourhood'},
      {text:'Photographs taken?', type:'takephoto'},
      {text:'Confirmation', type:'confirmation'}
      ];

      if(this.props.applicantinfo.isNew.toLowerCase() == 'yes')
      {
        // business is new
        this.setState({
          questions : newbusqus,
          newbusiness: true
        })
      }
      else if(this.props.applicantinfo.isNew.toLowerCase() == 'no')
      {
        // business is existing
        this.setState({
          questions : existingbusqus,
          newbusiness: false
        })
      }
    }

  }

  componentWillUnmount = () => {

    if(this.state._mounted)
    {
      this.setState({
        _mounted: false
      })
    }

    console.log("Component Unmounted:", this.state._mounted)

    clearTimeout(redirectTimeout);
  }

  /**
    * Get user data from AsyncStorage to populate fields
    */
  getStoredCredentials = async () => {
    const values = await AsyncStorage.getItem('api/credentials');
    const jsonValues = JSON.parse(values);

    return jsonValues;
  }

  /**
    * Email Validation
    */
  validEmail = FormValidation.refinement(
    FormValidation.String, (email) => {
      const regularExpression = /^.+@.+\..+$/i;

      return regularExpression.test(email);
    },
  );

  /**
    * Password Validation - Must be 6 chars long
    */
  validPassword = FormValidation.refinement(
    FormValidation.String, (password) => {
      if (password.length < 8) return false; // Too short
      if (password.search(/\d/) === -1) return false; // No numbers
      if (password.search(/[a-zA-Z]/) === -1) return false; // No letters
      return true;
    },
  );

  /**
    * Username Validation - Must be 3 chars long
    */
  validUsername = FormValidation.refinement(
    FormValidation.String, (username) => {
      username = username.trim()
      if (username.length < 3) return false; // Too short
      return true;
    },
  );

  /**
    * Password Confirmation - password fields must match
    * - Sets the error and returns bool of whether to process form or not
    */
  passwordsMatch = (form) => {
    const error = form.Password !== form.ConfirmPassword;

    this.setState({
      options: FormValidation.update(this.state.options, {
        fields: {
          ConfirmPassword: {
            hasError: { $set: error },
            error: { $set: error ? 'Passwords don\'t match' : '' },
          },
        },
      }),
      form_values: form,
    });

    return error;
  }

  /**
    * Handle Form Submit
    */
  handleSubmit = () => {
    // Get new credentials and update
    const formData = this.form.getValue();

    // Check whether passwords match
    if (formData && formData.Password && formData.ConfirmPassword) {
      const passwordsDontMatch = this.passwordsMatch(formData);
      if (passwordsDontMatch) return false;
    }

    // Form is valid
    if (formData) {
      this.setState({ form_values: formData }, () => {
        this.setState({ resultMsg: { status: 'One moment...' } });

        // Scroll to top, to show message
        if (this.scrollView) this.scrollView.scrollTo({ y: 0 });

        if (this.props.submit) {
          this.props.submit(formData).then(() => {
            this.setState({
              resultMsg: { success: this.props.successMessage },
            }, () => {
              // If there's another function to fire on successful submit
              // eg. once signed up, let's log them in - pass the Login function
              // through as the onSuccessfulSubmit prop
              if (this.props.onSuccessfulSubmit) {
                return this.props.onSuccessfulSubmit(formData, true)
                  .then(() => {
                    Actions.app({ type: 'reset' });
                    Actions.pop();
                  }).catch(err => this.setState({ resultMsg: { error: err.message } }));
              }

              // Timeout to ensure success message is seen/read by user
              redirectTimeout = setTimeout(() => {
                Actions.app({ type: 'reset' });
                Actions.pop();
              }, 500);

              return true;
            });
          }).catch(err => this.setState({ resultMsg: { error: err.message } }));
        } else {
          this.setState({ resultMsg: { error: 'Submit function missing' } });
        }
      });
    }

    return true;
  }


  doNextStep = () => {

    const parentform = ((typeof this.props.mainform != 'undefined') ? this.props.mainform  : false)

    if(parentform)
      parentform.goNext

  }

  locationLoading = (doshow) => {
    this.setState({
      locationLoading: doshow
    })
  }

  disablenext = () => {
    //console.log("disalbe next button")
    this.setState({
      nextbtnenable: false
    })
  }

  enablenext = () => {
    //console.log("disalbe next button")
    this.setState({
      nextbtnenable: true
    })
  }

  signaturePad = () =>{

    if(this.state._mounted)
    {
      this.setState({
        status: !this.state.status
      })

      appvariables.signaturePad = true

    }
  }

  reviewForm = () =>{

    if(this.state._mounted)
    {
      this.setState({
        status: !this.state.status
      })

      appvariables.reviewScreen = true

    }
  }

  render = () => {
    const Form = FormValidation.form.Form;

    //console.log("Verification Form::.........")
    //console.log(this.props)


    var openstp = 0
    if(typeof this.props.openstep != 'undefined')
    {
      openstp = this.props.openstep
    }

    var customerinfo = (<View/>)

    const parentform = ((typeof this.props.mainform != 'undefined') ? this.props.mainform  : false)

    const nextdisalbed = ((typeof this.props.nexteisalbe != 'undefined') ? this.props.nexteisalbe : false)
    const onlynextdisalbed = ((this.state.nextbtnenable) ? !this.state.nextbtnenable : true)

    if(typeof this.props.applicantinfo != 'undefined')
    {
      //console.log(this.props.applicantinfo)

      customerinfo = (<View>
      <View><Text h3 style={[AppStyles.textCenterAligned]}>Applicant Information:</Text></View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>BCIL No:</Text>
        <Text style={[AppStyles.seventyper]}>{((this.props.applicantinfo.bcilno) ? this.props.applicantinfo.bcilno : "")}</Text>
      </View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>Reg No:</Text>
        <Text style={[AppStyles.seventyper]}>{((this.props.applicantinfo.regid) ? this.props.applicantinfo.regid : "")}</Text>
      </View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>Name:</Text>
        <Text style={[AppStyles.seventyper]}>{((this.props.applicantinfo.name) ? this.props.applicantinfo.name : "")}</Text>
      </View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>Phone#:</Text>
        <Text style={[AppStyles.seventyper]}>{((this.props.applicantinfo.phone) ? this.props.applicantinfo.phone : "")}</Text>
      </View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>Business Name:</Text>
        <Text style={[AppStyles.seventyper]}>{((this.props.applicantinfo.businessname) ? this.props.applicantinfo.businessname : "")}</Text>
      </View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>Address:</Text>
        <Text style={[AppStyles.seventyper]}>{((this.props.applicantinfo.residenceaddress) ? this.props.applicantinfo.residenceaddress : "")}</Text>
      </View>
      <View style={AppStyles.row}>
        <Text style={[AppStyles.thirtyper]}>Current Location:</Text>
        <Text style={[AppStyles.seventyper]}>{this.state.currentadd}</Text>
      </View>
      </View>)
    }

    if(appvariables.signaturePad)
    {
        return (<RNSignatureExample wrapperform={this} />)
    }
    else if(appvariables.reviewScreen)
    {
        return (<BIFReview allquestions={this.state.questions} wrapperform={this} />)
    }
    else
    {
      return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        ref={(a) => { this.scrollView = a; }}
      >
        <Card containerStyle={{margin: 0, padding:10}}>
          <Alerts
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error}
          />

          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.locationLoading} textContent={"Fetching Location..."} textStyle={AppStyles.locationolverlaymessage} overlayColor={'rgba(0, 0, 0, 0.6)'} />
          </View>

          {(!!this.props.introTitle || !!this.props.introText) &&
            <View>
              {!!this.props.introTitle &&
                <Text h1>{this.props.introTitle}</Text>
              }
              {!!this.props.introText &&
                <Text>{this.props.introText}</Text>
              }

              <Spacer size={10} />
            </View>
          }

          {customerinfo}

          { this.state.questions.length > 0 && (<Setp1 step={openstp} isNew={this.state.newbusiness} mainform={parentform} wrapperform={this} nextdisable={nextdisalbed} questionobj={this.state.questions[((openstp < 1) ? openstp : (openstp - 1) )]} />)}

          <Spacer size={20} />

          {(( openstp < this.state.questions.length ) ? (<View style={[AppStyles.row, {justifyContent: 'space-between'}]}><Button title="Previous" onPress={console.log("Testing")} /><Button disabled={((nextdisalbed) ? nextdisalbed : ((onlynextdisalbed) ? onlynextdisalbed : nextdisalbed ))} title={this.props.buttonTitle} onPress={((parentform) ? parentform.goNext :  console.log("Testing"))} /></View>) : (<Button title="Submit" onPress={Actions.viewJobs} />) )}

          <Spacer size={10} />

        </Card>
      </ScrollView>
    );
  }

    
  }
}

/* Export Component ==================================================================== */
export default BIFAuthForm;
