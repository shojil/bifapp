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
  Dimensions,
  ListView,
  AsyncStorage
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';

// Consts and Libs
import { AppConfig } from '@constants/';

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

const dummyData2 = [
  {
    title: 'BCIL-EB-885 - Imran Ahmad Memon',
    role: '96 Memon MOHALLAH MALL ROAD KHAIRPUR MEMON MOHALLAH KHAIRPUR',
    phone: '00923224434435',
    isNew: 'No',
    bcilno:'BCIL-EB-885',
    name:'Imran Ahmad Memon',
    residenceaddress:'96 Memon MOHALLAH MALL ROAD KHAIRPUR MEMON MOHALLAH KHAIRPUR',
    regid:'0019NPM000058',
    businessname:'Graint Heights'
  },
  {
    title: 'BCIL-NB-2102 - Usman Malik',
    role: 'Office no 23 Street 44 Gulistan-e-Johr Lahore',
    phone: '00923224434435',
    isNew: 'Yes',
    bcilno:'BCIL-NB-2102',
    name:'Usman Malik',
    residenceaddress:'Office no 23 Street 44 Gulistan-e-Johr Lahore',
    regid:'0019NPM000012',
    businessname:'Wholesale Dailer'
  },
  {
    title: 'BCIL-NB-2103 - Asad Malik',
    role: 'Office no 234 Street 44 Gulistan-e-Johr Lahore',
    phone: '00923224434435',
    isNew: 'Yes',
    bcilno:'BCIL-NB-2103',
    name:'Asad Malik',
    residenceaddress:'Office no 234 Street 44 Gulistan-e-Johr Lahore',
    regid:'0019NPM000111',
    businessname:'Super Store'
  },
  {
    title: 'BCIL-NB-2104 - Asad Kamran',
    role: 'Office no 234 Street 44 Gulistan-e-Johr Lahore',
    phone: '00923224434435',
    isNew: 'Yes',
    bcilno:'BCIL-NB-2104',
    name:'Asad Kamran',
    residenceaddress:'Office no 234 Street 44 Gulistan-e-Johr Lahore',
    regid:'0019NPM000013',
    businessname:'Vegitable Shop'
  },
  {
    title: 'BCIL-EB-2105 - Aslam Kamran',
    role: 'Office no 234 Street 44 Gulistan-e-Johr Lahore',
    phone: '00923224434435',
    isNew: 'No',
    bcilno:'BCIL-EB-2105',
    name:'Aslam Kamran',
    residenceaddress:'Office no 234 Street 44 Gulistan-e-Johr Lahore',
    regid:'0019NPM003453',
    businessname:'Super Store'
  },
  {
    title: 'BCIL-EB-2106 - Aslam Kamran',
    role: 'Office no 234 Street 44 Muslim Town Lahore',
    phone: '00923224434435',
    isNew: 'No',
    bcilno:'BCIL-EB-2106',
    name:'Aslam Kamran',
    residenceaddress:'Office no 234 Street 44 Muslim Town Lahore',
    regid:'0019NPM000253',
    businessname:'Factory'
  },
  {
    title: 'BCIL-NB-2104 - Usman Saleem',
    role: 'Office no 234 Street 44 Muslim Town Lahore',
    phone: '00923224434435',
    isNew: 'Yes',
    bcilno:'BCIL-NB-2104',
    name:'Usman Saleem',
    residenceaddress:'Office no 234 Street 44 Muslim Town Lahore',
    regid:'0019NPM000313',
    businessname:'Juice Shop'
  },
  {
    title: 'BCIL-NB-2109 - Jim Collins',
    role: 'Office no 234 Street 44 Muslim Town Lahore',
    phone: '00923224434435',
    isNew: 'Yes',
    bcilno:'BCIL-NB-2109',
    name:'Jim Collins',
    residenceaddress:'Office no 234 Street 44 Muslim Town Lahore',
    regid:'0019NPM000313',
    businessname:'Boutique'
  },
  {
    title: 'BCIL-EB-2109 - Jim Collins',
    role: 'Office no 2 Muslim Town Lahore',
    phone: '00923224434435',
    isNew: 'No',
    bcilno:'BCIL-EB-2109',
    name:'Jim Collins',
    residenceaddress:'Office no 2 Muslim Town Lahore',
    regid:'0019NPM000313',
    businessname:'Boutique'
  },
  {
    title: 'BCIL-EB-2110 - Anwar Ali',
    role: 'Office no 234 Street 44 Muslim Town Lahore',
    phone: '00923224434435',
    isNew: 'No',
    bcilno:'BCIL-EB-2110',
    name:'Anwar Ali',
    residenceaddress:'Office no 234 Street 44 Muslim Town Lahore',
    regid:'0019NPM000113',
    businessname:'Grammer School'
  }
];

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

    const ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      loading: true,
      visitedRoutes: [],
      dataSource2: ds2.cloneWithRows(dummyData2)
    };

    this.openForm = this.openForm.bind(this)
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

  openForm = () => {
    console.log("Testing ..... OpenForm clicked....")
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
    * Each List Item
    */
  renderRow = (data, sectionID) => (
    <View>
    <Text h5 style={{marginLeft:30}}>{data.title}</Text>
    <ListItem
      key={`list-row-${sectionID}`}
      onPress={()=>Actions.verificationform({data: data})}
      title={data.phone}
      subtitle={data.role || null}
      leftIcon={data.icon ? { name: data.icon } : null}
      avatar={data.avatar ? { uri: data.avatar } : null}
      roundAvatar={!!data.avatar}
    />
    </View>
  )

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

    // Which component should be loaded?
    return (
      <View style={styles.tabContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={[AppStyles.container]}
        >
          <View style={[AppStyles.paddingHorizontal]}>
            <Spacer size={15} />
            <Text h2>List Rows</Text>
            <Spacer size={-10} />
          </View>
          <List>
            <ListView
              renderRow={this.renderRow}
              dataSource={this.state.dataSource2}
            />
          </List>
        </ScrollView>
      </View>
    );
  }

  /**
  * Save Form Step to AsyncStorage
  */
  setFormStep = async(setp) =>  {
    if(typeof AppConfig.localstoragekeys != 'undefined' && typeof AppConfig.localstoragekeys.fromstep != 'undefined')
    {
      await AsyncStorage.setItem(AppConfig.localstoragekeys.fromstep, step);
    }
  }

  render = () => {
    if (this.state.loading || !this.state.navigation) return <Loading />;
    this.setFormStep(0)


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
