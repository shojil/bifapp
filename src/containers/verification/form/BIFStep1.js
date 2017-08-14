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
import TcombTextInput from '@components/tcomb/TextInput';
import Switch1 from 'react-native-customisable-switch'
import {Icon} from 'react-native-elements'
import Permissions from 'react-native-permissions'

/* Component ==================================================================== */
let redirectTimeout;
class BIFStep1 extends Component {
  static componentName = 'BIF Steps';

  constructor(props) {
    super(props);

    this.state = {
      questionstate:false,
      selectoption: '',
      initialPosition: 'unknown'
    };

    this.gprslocation.bind(this)
  }

  componentDidMount = async () => {
    
  }

  componentWillUnmount = () => clearTimeout(redirectTimeout);


  gprslocation = () => {

    console.log("get gprs location: ,...")

    if(typeof this.props.wrapperform != 'undefined' && this.props.wrapperform)
    {
      this.props.wrapperform.locationLoading(true)
    }

    Permissions.request('location')
      .then(response => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined' 
        //this.setState({ photoPermission: response })
        console.log("Location permission .......")
        console.log(response)

        if(response == "authorized")
        {
          navigator.geolocation.getCurrentPosition(
          (position) => {

            if(typeof this.props.wrapperform != 'undefined' && this.props.wrapperform)
            {
              this.props.wrapperform.locationLoading(false)
            }

            var initialPosition = JSON.stringify(position);

            //console.log(position)
            console.log(position.coords.longitude + ' , ' + position.coords.latitude)

            //console.log(position)

            this.setState({initialPosition});
          },
          (error) => {
            //var initialPosition = error.message
            //this.setState({initialPosition});

            if(typeof this.props.wrapperform != 'undefined' && this.props.wrapperform)
            {
              this.props.wrapperform.locationLoading(false)
            }

            console.log(error.message)

            this.setState({initialPosition:  'Location Not Found'});
          },
          {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000}
        );
        }
        else
        {
          if(typeof this.props.wrapperform != 'undefined' && this.props.wrapperform)
          {
            this.props.wrapperform.locationLoading(false)
          }
        }

      });

  }

  render = () => {



    var viewoption = (<Switch1 switchWidth={300} value={this.state.questionstate} onValueChange={(value) => this.setState({questionstate: value})} activeText={'Yes'} inactiveText={'No'} activeTextColor={'rgba(255, 255, 255, 1)'} inactiveTextColor={'rgba(255, 255, 255, 1)'} activeBackgroundColor={'rgba(50, 163, 50, 1)'} inactiveBackgroundColor={'rgba(137, 137, 137, 1)'} activeButtonBackgroundColor={'rgba(255, 255, 255, 1)'} inactiveButtonBackgroundColor={'rgba(255, 255, 255, 1)'} />)


    if(typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.type != 'undefined' && this.props.questionobj.type == 'detail')
    {
      viewoption = (<TextInput style={AppStyles.inputText} underlineColorAndroid="transparent" />)
    }
    else if(typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.type != 'undefined' && this.props.questionobj.type == 'selection')
    {
      viewoption = (<Picker style={AppStyles.businesstype} selectedValue={this.state.selectoption} onValueChange={(optval) => this.setState({selectoption: optval})}>
        
        {typeof this.props.questionobj.list != 'undefined' && this.props.questionobj.list.length && this.props.questionobj.list.map((itm, ind) => <Picker.Item key={ind} label={itm} value={itm} />)}

      </Picker>)
    }

    const parentform = ((typeof this.props.mainform != 'undefined') ? this.props.mainform  : false)

    if(typeof this.props.nextdisable != 'undefined' && this.props.nextdisable)
    {
      return (
        <View>
          <View style={AppStyles.questionsheading}><Text style={AppStyles.questionsheadingtext}>{((typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.text != 'undefined') ? this.props.questionobj.text : "Question ?")}</Text></View>
          <View style={[AppStyles.centerAligned, {marginTop:10}]}><Button title="Show Options..." onPress={((parentform) ? parentform.showOptions :  console.log("Testing"))} /></View>
        </View>
      );
    }
    else
    {
      if(typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.type != 'undefined' && this.props.questionobj.type == 'neighbourhood' && !this.props.isNew)
      {
        return (
          <View>
            <View style={AppStyles.questionsheading}><Text style={AppStyles.questionsheadingtext}>{((typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.text != 'undefined') ? this.props.questionobj.text : "Question ?")}</Text></View>
            <View><Text style={AppStyles.textRemarks}>Applicant is owner</Text></View>
            <View style={[AppStyles.centerAligned, {marginTop:10}]}>{viewoption}</View>
            <View><Text style={AppStyles.textRemarks}>Remarks</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
            <View><Text style={AppStyles.textRemarks}>Neighbour Name</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
            <View><Text style={AppStyles.textRemarks}>Neighbour cell phone</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
          </View>
        );
      }
      else if(typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.type != 'undefined' && this.props.questionobj.type == 'neighbourhood' && this.props.isNew)
      {
        return (
          <View>
            <View style={AppStyles.questionsheading}><Text style={AppStyles.questionsheadingtext}>{((typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.text != 'undefined') ? this.props.questionobj.text : "Question ?")}</Text></View>
            <View><Text style={AppStyles.textRemarks}>Applicant is owner</Text></View>
            <View style={[AppStyles.centerAligned, {marginTop:10}]}>{viewoption}</View>
            <View><Text style={AppStyles.textRemarks}>If no, who is real owner</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
            <View><Text style={AppStyles.textRemarks}>Resident since</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
            <View><Text style={AppStyles.textRemarks}>Applicant main occupation</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
            <View><Text style={AppStyles.textRemarks}>Neighbour Name</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
            <View><Text style={AppStyles.textRemarks}>Neighbour cell phone</Text></View>
            <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
          </View>
        );
      }
      else if(typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.type != 'undefined' && this.props.questionobj.type == 'location')
      {

        var getlatlong = this.state.initialPosition

        if(getlatlong != 'unknown' && getlatlong != '')
        {
          //console.log("Get following data: ")
          //console.log(getlatlong)
          try {
              getlatlong = JSON.parse(getlatlong);
          }
          catch(err) {
              getlatlong = "Location Not Found"
          }

          //getlatlong = JSON.parse(getlatlong)
        }


        if(getlatlong != 'unknown' && typeof getlatlong.coords != 'undefined' && typeof getlatlong.coords.latitude != 'undefined')
        {
          getlatlong = 'Latitude = ' + getlatlong.coords.latitude + "\n" + "Longitude = " + getlatlong.coords.longitude
        }

        return (
          <View>
            <View style={AppStyles.questionsheading}><Text style={AppStyles.questionsheadingtext}>{((typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.text != 'undefined') ? this.props.questionobj.text : "Question ?")}</Text></View>
            <View style={[AppStyles.centerAligned]}>{viewoption}</View>
            <View><Text style={AppStyles.textRemarks}>Remarks</Text></View>
            <View style={[{borderWidth:1, borderColor:AppColors.border, borderRadius:5, flexDirection:'row'}]}>
              {this.state.initialPosition != 'unknown' && (<Text style={{width:'70%', fontSize: ((getlatlong == "Location Not Found") ? 16 : 12), color: ((getlatlong == "Location Not Found") ? AppColors.locationiconcolor : AppColors.locationText)}}>{getlatlong}</Text>)}
              <View style={{width:'20%'}}><Icon name='room' color={AppColors.locationiconcolor} onPress={this.gprslocation} />
            </View>
            </View>
          </View>
        );
      }
      else
      {
        return (
        <View>
          <View style={AppStyles.questionsheading}><Text style={AppStyles.questionsheadingtext}>{((typeof this.props.questionobj != 'undefined' && typeof this.props.questionobj.text != 'undefined') ? this.props.questionobj.text : "Question ?")}</Text></View>
          <View style={[AppStyles.centerAligned, {marginTop:10}]}>{viewoption}</View>
          <View><Text style={AppStyles.textRemarks}>Remarks</Text></View>
          <View><TextInput multiline={true} style={AppStyles.inputTextarea} underlineColorAndroid="transparent" /></View>
        </View>
      );
      }
    }

    
  }
}

/* Export Component ==================================================================== */
export default BIFStep1;
