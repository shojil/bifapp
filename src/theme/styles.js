/**
 * App Styles
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';

export default {
  appContainer: {
    backgroundColor: '#000',
  },

  // Default
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  containertrans: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },

  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },

  // Text Styles
  baseText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  p: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    fontWeight: '300',
    marginBottom: 8,
  },
  h1: {
    fontFamily: Fonts.h1.family,
    fontSize: Fonts.h1.size,
    lineHeight: Fonts.h1.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h2: {
    fontFamily: Fonts.h2.family,
    fontSize: Fonts.h2.size,
    lineHeight: Fonts.h2.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h3: {
    fontFamily: Fonts.h3.family,
    fontSize: Fonts.h3.size,
    lineHeight: Fonts.h3.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '500',
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h4: {
    fontFamily: Fonts.h4.family,
    fontSize: Fonts.h4.size,
    lineHeight: Fonts.h4.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h5: {
    fontFamily: Fonts.h5.family,
    fontSize: Fonts.h5.size,
    lineHeight: Fonts.h5.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  strong: {
    fontWeight: '900',
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand.primary,
  },
  subtext: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size * 0.8,
    lineHeight: parseInt(Fonts.base.lineHeight * 0.8, 10),
    color: Colors.textSecondary,
    fontWeight: '500',
  },

  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },

  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    paddingVertical: Sizes.paddingSml,
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },

  // General HTML-like Elements
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: Sizes.padding,
    marginBottom: Sizes.padding,
  },

  // Grid
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },

  // Navbar
  navbar: {
    backgroundColor: Colors.brand.primary,
    borderBottomWidth: 0,
  },
  navbarTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
  },
  navbarButton: {
    tintColor: '#ffffff',
  },

  // TabBar
  tabbar: {
    backgroundColor: Colors.tabbar.background,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },

  //percentage width
  thirtyper:{
    width:'30%',
    fontSize:10
  },
  seventyper:{
    width:'70%',
    fontSize:10
  },

  // text input class
  inputText:{
    height: 40,
    width:'100%',
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:5
  },

  inputTextarea:{
    height: 40,
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:5
  },

  //question style
  questionsheading: {
    backgroundColor:Colors.brand.primary
  },
  questionsheadingtext: {
    color:'#fff',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10
  },
  businesstype:{
    width:200, 
    height:30
  },
  textRemarks:{
    color: Colors.textLabel
  },
  locationolverlaymessage:{
    color: Colors.locationiconcolor, 
    backgroundColor:Colors.tabbar.background, 
    paddingTop:5, 
    paddingLeft:5, 
    paddingRight:5,
    borderRadius:5
  },
  signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
};
