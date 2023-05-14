import { SafeAreaView, ScrollView, StyleSheet, Text, View, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import InputText from '../components/InputText'
import Button from '../components/Button'
import Loader from '../components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  const handleInputs = (text, input) => {
    setInputs((previousInput) => ({
      ...previousInput,
      [input]: text
    }))
  }

  const handleErrorMessage = (errorMessage, input) => {
    setErrors((previousValue) => ({
      ...previousValue,
      [input]: errorMessage
    }));
  }

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleErrorMessage('Please enter the email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleErrorMessage('Please enter the password', 'password');
      valid = false;
    }

    if (valid) {
      LogInUser();
    }

  }

  const LogInUser = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const userDataObject = JSON.parse(userData);
          if (inputs.email == userDataObject.email && inputs.password == userDataObject.password) {
            try {
              await AsyncStorage.setItem('user', JSON.stringify({ ...userDataObject, loggedIn: true }));
              navigation.navigate('Home');
            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'An error occurred');
            }
          } else {
            Alert.alert('Error', 'Invalid credentials');
          }
        } else {
          Alert.alert('Error', 'User does not exist');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.message);
      }

    }, 3000);
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <Loader visible={Loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 20 }}>
        <Text style={styles.loginText}>Log In</Text>
        <Text style={styles.subText}>Enter Your Log In Details</Text>
        <View style={{ marginVertical: 20 }}>

          <InputText
            iconName={'email-outline'}
            label={'Email'}
            placeholder={'Enter your email address'}
            keyboardType={'email-address'}
            value={inputs.email}
            onChangeText={(text) => handleInputs(text, 'email')}
            error={errors.email}
            onFocus={() => handleErrorMessage(null, 'email')}
          />

          <InputText
            iconName={'lock-outline'}
            label={'Password'}
            placeholder={'Enter your password'}
            password
            value={inputs.password}
            onChangeText={(text) => handleInputs(text, 'password')}
            error={errors.password}
            onFocus={() => handleErrorMessage(null, 'password')}
          />
          <Button title={'LogIn'} onPress={validate} />
          <Text
            style={styles.noAccountText}
            onPress={() => navigation.navigate('Register')}
          >
            I don't have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subText: {
    color: 'gray',
    fontSize: 18,
    marginVertical: 10
  },
  noAccountText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20
  }
})

export default LogIn
