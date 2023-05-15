import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import LogIn from './src/screens/LogIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    setTimeout(authUser, 2000)
  }, [])

  const authUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const userDataObject = JSON.parse(userData);
        if (userDataObject.loggedIn) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('LogIn');
        }
      } else {
        setInitialRoute('Register');
      }
    } catch (error) {
      setInitialRoute('Register');
    }
  }

  return (
    <NavigationContainer>
      {initialRoute == '' ? <Loader visible={true}/> :
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})