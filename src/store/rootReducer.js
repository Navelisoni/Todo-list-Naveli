// ... existing code ...
import { combineReducers } from 'redux';
import asideReducer from './slice/asideSlice.js'; // Import the aside slice
import taskReducer from './slice/taskSlice.js'; // Import the aside slice
import authReducer from './slice/authSlice.js'; // Import the aside slice
import themeReducer from './slice/themeSlice.js'; // Import the aside slice

const rootReducer = combineReducers({
  aside: asideReducer, 
  task: taskReducer,
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;