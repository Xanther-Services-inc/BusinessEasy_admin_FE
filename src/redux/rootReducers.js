import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { teamReducer, teamDetailsReducer } from './team/reducers';
import { userReducer } from './users/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import ordersReducer from './orders/reducers';
import { emailReducer, SingleEmailReducer, allIssueReducer } from './email/reducers';
import { ProductsReducer, productDetailsReducer } from './product/reducers';
import Profile from './profile/reducers';

const rootReducers = combineReducers({
 
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  orders: ordersReducer,
  users: userReducer,
  // userGroup: userGroupReducer,
  team: teamReducer,
  teamDetails: teamDetailsReducer,
  auth: authReducer,
  email: emailReducer,
  emailSingle: SingleEmailReducer,
  allIssues: allIssueReducer,
  products: ProductsReducer,
  productDetail: productDetailsReducer,
  ChangeLayoutMode,
  Profile,

});

export default rootReducers;
