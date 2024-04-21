import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';


import Home from './src/components/Home';
import SplashScreen from './src/components/SplashScreen';
import Appointment from './src/components/Appointment';
import Payment from './src/components/Payment';
import Profile from './src/components/Profile';
import Ledger from './src/components/Ledger';
import Signin from './src/components/Signin';
import Signup from './src/components/Signup';
import Verify from './src/components/Verify';

// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeicon from 'react-native-vector-icons/FontAwesome';
import DoctorSearch from './src/components/DoctorSearch';
import { store } from './src/store/Store';
import FindDoctor from './src/components/FindDoctor';
import { PaperProvider } from 'react-native-paper';
import storage from './src/services/StorageService';
import { View, Text } from 'react-native';
import AccountVerified from './src/components/AccountVerified';
import ProviderDetails from './src/components/ProviderDetails';
import AppointmentPayment from './src/components/AppointmentPayment';
import ConfirmAppointment from './src/components/ConfirmAppointment';
import StripePayment from './src/components/StripePayment';
import ForgotPassword from './src/components/ForgotPassword';
import WebViewTest from './src/components/WebviewTest';
import OpenTok from './src/components/OpenTok';
import VideoCall from './src/components/VideoCall';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();


const BottomNav = () => {
  return <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
    tabBarActiveBackgroundColor: "#5e8df7",
    tabBarInactiveBackgroundColor: "#5e8df7",
    tabBarLabel: ({ focused, color, size }) => {
      let label = route.name;

      if (route.name === 'DoctorSearch') {
        label = 'Telemedicine';
      }

      if (route.name === 'Payment') {
        label = 'Ledger';
      }

      return <Text
        style={{
          fontSize: 10,
          color: color,
          textAlign: "center"
        }}
      >{label}</Text>

    },
    tabBarIcon: ({ focused, color, size }) => {

      let iconName;
      let isIonIcon = true;

      if (route.name === 'Home') {
        iconName = 'home';
        isIonIcon = true;
      } else if (route.name === 'Appointment') {
        iconName = 'calendar';
        isIonIcon = true;
      } else if (route.name === 'Payment') {
        iconName = 'dollar';
        isIonIcon = false;
      } else if (route.name === 'DoctorSearch') {
        iconName = 'stethoscope';
        isIonIcon = false;
      } else if (route.name === 'Profile') {
        iconName = 'user';
        isIonIcon = false;
      }

      // You can return any component that you like here!
      return isIonIcon ? <Ionicons name={iconName} size={size} color={color} /> : <FontAwesomeicon name={iconName} size={size} color={color} />;

    },
    tabBarActiveTintColor: '#FFF',
    tabBarInactiveTintColor: '#CCC',
  })}>
    <Tab.Screen options={{
      headerShown: false
    }} name="Home" component={Home} />
    <Tab.Screen name="Appointment" component={Appointment} options={{
      headerShown: false
    }} />
    <Tab.Screen name="Payment" component={Payment} options={{
      headerShown: false
    }} />
    <Tab.Screen name="DoctorSearch" component={DoctorSearch} options={{
      headerShown: false
    }} />
    <Tab.Screen name="Profile" component={Profile} options={{
      headerShown: false
    }} />
  </Tab.Navigator>
}



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [saveUserExist, setSaveUserExist] = useState(false);

  useEffect(() => {
    store.subscribe(() => {
      console.log('state changed');
      const storeUser = store.getState().user;
      console.log(storeUser.auth);
      if (storeUser.auth) setIsAuth(true);
      else setIsAuth(false);

      const splash = store.getState().splash;
      if (splash.isLoading)
        setIsLoading(true);
      else
        setIsLoading(false);
    });
  }, [])




  return (
    <PaperProvider>

      <Provider store={store}>
        {
          isLoading ?
            <SplashScreen /> :
            <NavigationContainer>
              {
                isAuth ?
                  <Stack.Navigator>
                    <Stack.Screen options={{ title: '', headerShown: false }} name='DrawerNav' component={BottomNav} />
                    <Stack.Screen name="Ledger" component={Ledger} />
                    <Stack.Screen options={{ headerShown: false, }} name="find-doctor-auth" component={FindDoctor} />
                    <Stack.Screen options={{ headerShown: false, }} name="provider-details-auth" component={ProviderDetails} />
                    <Stack.Screen options={{ headerShown: false, }} name="appointment-payment-auth" component={AppointmentPayment} />
                    <Stack.Screen options={{ headerShown: false, }} name="confirm-appointment-auth" component={ConfirmAppointment} />
                    <Stack.Screen options={{ headerShown: true, title: "" }} name="video-call" component={VideoCall} />
                  </Stack.Navigator>
                  :
                  <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false }} name="find-doctor" component={FindDoctor} />
                    <Stack.Screen options={{ headerShown: false }} name="signin" component={Signin} />
                    <Stack.Screen options={{ headerShown: false }} name="signup" component={Signup} />
                    <Stack.Screen options={{ headerShown: false }} name="forgot-password" component={ForgotPassword} />
                    <Stack.Screen options={{ headerShown: false }} name="open-tok" component={OpenTok} />
                    <Stack.Screen options={{ headerShown: false }} name="verify" component={Verify} />
                    <Stack.Screen options={{ headerShown: false }} name="account-verified" component={AccountVerified} />
                    <Stack.Screen options={{ headerShown: false, }} name="provider-details" component={ProviderDetails} />
                    <Stack.Screen options={{ headerShown: false, }} name="appointment-payment" component={AppointmentPayment} />
                    <Stack.Screen options={{ headerShown: false, }} name="confirm-appointment" component={ConfirmAppointment} />
                    <Stack.Screen options={{ headerShown: false, }} name="stripe-payment" component={StripePayment} />


                  </Stack.Navigator>
              }
            </NavigationContainer>

        }
      </Provider>
    </PaperProvider>
  );
}

export default App;
