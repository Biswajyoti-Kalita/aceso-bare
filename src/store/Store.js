import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './SnackbarMessage';
import userReducer from './User';
import splashReducer from './Splash';
import drawerReducer from './Drawer';

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    user: userReducer,
    splash: splashReducer,
    drawer: drawerReducer
  },
});
