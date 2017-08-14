/**
 * Receipe Tabs Screen
 *  - Shows tabs, which contain receipe listings
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  InteractionManager,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

// Consts and Libs
import { AppColors, AppStyles, AppSizes } from '@theme/';

// Containers
import RecipeListing from '@containers/recipes/Listing/ListingContainer';

// Components
import { Text } from '@ui/';
import Loading from '@components/general/Loading';
import { Actions } from 'react-native-router-flux';

// Components
import {
  Alerts,
  DashBadge,
  Button,
  Card,
  Spacer,
  List,
  ListItem,
  FormInput,
  FormLabel,
} from '@components/ui/';

import { Icon, Grid, Col, Row } from 'react-native-elements';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Tab Styles
  tabContainerWrapper: {
    flex:1
  },
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom:12
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbarText: {
    color: '#FFF',
  },
  dashbadbox1:{
    width:'35%', marginLeft:'9%', marginRight:'4%'
  },
  dashbadbox2:{
    width:'35%', marginLeft:'5%', marginRight:'9%'
  }
});

/* Component ==================================================================== */
let loadingTimeout;
class RecipeTabs extends Component {
  static componentName = 'RecipeTabs';

  static propTypes = {
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
    meals: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      visitedRoutes: [],
    };
  }

  /**
    * Wait until any interactions are finished, before setting up tabs
    */
  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setTabs();
    });
  }

  componentWillUnmount = () => clearTimeout(loadingTimeout);

  /**
    * When meals are ready, populate tabs
    */
  setTabs = () => {
    const routes = [];
    let idx = 0;
    this.props.meals.forEach((meal) => {
      routes.push({
        key: idx.toString(),
        id: meal.id.toString(),
        title: meal.title,
      });

      idx += 1;
    });

    this.setState({
      navigation: {
        index: 0,
        routes,
      },
    }, () => {
      // Hack to prevent error showing
      loadingTimeout = setTimeout(() => {
        this.setState({ loading: false });
      }, 100);
    });
  }

  /**
    * On Change Tab
    */
  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  /**
    * Header Component
    */
  renderHeader = props => (
    <View />
  )

  /**
    * Which component to show
    */
  renderScene = ({ route }) => {
    // For performance, only render if it's this route, or I've visited before
    if (
      parseInt(route.key, 0) !== parseInt(this.state.navigation.index, 0) &&
      this.state.visitedRoutes.indexOf(route.key) < 0
    ) {
      return null;
    }

    // And Add this index to visited routes
    if (this.state.visitedRoutes.indexOf(this.state.navigation.index) < 0) {
      this.state.visitedRoutes.push(route.key);
    }

    const bgimg = require('@images/BIf_1.jpg')

    // Which component should be loaded?
    return (
      <Image  source={bgimg} style={[styles.tabContainerWrapper, {resizeMode:'cover', width:AppSizes.screen.width}]}>
      <ScrollView
              automaticallyAdjustContentInsets={false}
              style={[AppStyles.containertrans]}
            >
      <View style={[styles.tabContainer, {marginTop:20}]}>
      

          <View style={styles.dashbadbox1}>
          <DashBadge title="Verifications (10)" icon='directions-run' iconcolor='#FF0000' iconsize={80} handleClick={Actions.viewJobs} />
          </View>
          <View style={styles.dashbadbox2}>
          <DashBadge title="Income Estimation (2)" icon='wc' iconcolor='#87FB77' iconsize={80} />
          </View>
        </View>
        <View style={styles.tabContainer}>
          <View style={styles.dashbadbox1}>
          <DashBadge title="Assign Jobs" icon='assignment-turned-in' iconcolor='#89AEFC' iconsize={80} />
          </View>
          <View style={styles.dashbadbox2}>
          <DashBadge title="Testing4..." icon='ios-paper-outline' iconcolor='#FCA089' iconsize={80} icontype="ionicon" />
          </View>
      
      </View>
      </ScrollView>
      </Image>
    );
  }

  render = () => {
    if (this.state.loading || !this.state.navigation) return <Loading />;

    return (
      <TabViewAnimated
        style={[styles.tabContainer]}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        navigationState={this.state.navigation}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeTabs;
