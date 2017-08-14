/**
 * App Navigation
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
import Drawer from '@containers/ui/DrawerContainer';

// Scenes
import AppLaunch from '@containers/Launch/LaunchContainer';
import Placeholder from '@components/general/Placeholder';
import joblists from '@containers/verification/joblist/BrowseContainer';
import verificationform from '@containers/verification/form/BIFVerificationForms';
import AuthScenes from './auth';
import TabsScenes from './tabs';
import BIFTabsScenes from './BIFtabs';

/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
    <Scene
      hideNavBar
      key={'splash'}
      component={AppLaunch}
      analyticsDesc={'AppLaunch: Launching App'}
    />

    {/* Auth */}
    {AuthScenes}

    {/* Main App */}
    <Scene key={'app'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.RESET}>
      {/* Drawer Side Menu */}
      <Scene key={'home'} component={Drawer} initial={'tabBar'}>
        {/* Tabbar */}
        {/*TabsScenes*/}
        {BIFTabsScenes}
      </Scene>

      {/* General */}
      <Scene
        clone
        key={'comingSoon'}
        title={'Coming Soon'}
        component={Placeholder}
        analyticsDesc={'Placeholder: Coming Soon'}
      />
      <Scene
        clone
        key={'viewJobs'}
        title={'Verification Jobs'}
        component={joblists}
        analyticsDesc={'joblists: Jobs'}
      />
      <Scene
        clone
        key={'verificationform'}
        title={'Verification Portal'}
        component={verificationform}
        analyticsDesc={'form: Verification'}
      />
    </Scene>
  </Scene>,
);
