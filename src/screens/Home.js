import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

const Home = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUserDetails(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const logOut = () => {
    AsyncStorage.setItem('user', JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate('LogIn');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {userDetails?.fullName}</Text>
      <Button title={'LogOut'} onPress={logOut} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  }
})


export default Home
