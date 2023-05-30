import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import AdminScreen from '../screens/AdminScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { GetUser } from '../api/UserApi';

export default AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState('Loading');

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await GetUser();
      if (userResponse.success) {
        if (userResponse.user.is_admin) {
          setInitialRoute('Admin');
        } else {
          setInitialRoute('Services');
        }
      } else {
        setInitialRoute('Login');
      }
    };
    fetchData();
  }, []);

  if (initialRoute == 'Loading') {
    return <LoadingScreen />
  } else {
    return Pages(initialRoute);
  }
};

const Stack = createNativeStackNavigator();

const Pages = (initialRoute) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(16,12,12)' // Arka plan rengi
          },
          headerTintColor: 'white' // Yazı rengi
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Giriş', headerLeft: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Kayıt Ol' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
        <Stack.Screen
          name="Services"
          component={ServicesScreen}
          options={{ title: 'Servisler', headerLeft: () => null }}
        />
        <Stack.Screen
          name="ServiceDetail"
          component={ServiceDetailScreen}
          options={{ title: 'Hizmet Detayı' }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ title: 'Admin Dashboard', headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}