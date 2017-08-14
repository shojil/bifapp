/**
 * DashBadge - Title/Icon
 *
    <DashBadge
      title={'Badge Text'}
      icon={'g-translate'}
      iconcolor={'#FF0000'}
      iconsize={30}
    />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

// Components
import { Spacer } from '@ui/';
import { Icon } from 'react-native-elements';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  textstyle:{
    fontSize:10,
    textAlign:'center'
  }
});

/* Component ==================================================================== */
const DashBadge = ({ title, icon, iconcolor, iconsize, icontype, handleClick }) => {
  //console.log("DashBadge this = ")
  //console.log("Type of handleClick = " + typeof handleClick)
  return (
  <TouchableOpacity style={{backgroundColor:'#ffffff', width:'100%', height:'100%', alignItems:'center', justifyContent: 'center', paddingBottom:10, borderRadius:10}} onPress={((typeof handleClick == 'function') ? handleClick : function(){})}>
        <Icon
          name={((icon) ? icon : 'g-translate')}
          color={((iconcolor) ? iconcolor : '#000')}
          size={((iconsize) ? iconsize : 26)}
          type={((icontype) ? icontype : '')}
           />
          {((title) ? <Text style={styles.textstyle}>{title}</Text> : false)}
      </TouchableOpacity>
)};

DashBadge.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  iconcolor: PropTypes.string,
  iconsize: PropTypes.number,
  icontype: PropTypes.string,
  handleClick: PropTypes.func
};

DashBadge.defaultProps = {
  title: '',
  icon: 'g-translate',
  iconcolor: '#000',
  iconsize: 26,
  icontype: '',
  handleClick: null
};

DashBadge.componentName = 'DashBadge';

/* Export Component ==================================================================== */
export default DashBadge;
