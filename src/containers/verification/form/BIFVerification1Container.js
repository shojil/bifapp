/**
 * BIF Login Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// The component we're mapping to
import BIFFormRender from './BIFFormView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
  formType: 'verification',
  formFields: ['Username', 'Password'],
  buttonTitle: 'Next',
  successMessage: 'Awesome, Form is now saved',
});

// Any actions to map to the component?
const mapDispatchToProps = {
  submit: UserActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(BIFFormRender);
