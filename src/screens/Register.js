import { SafeAreaView, ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useState } from 'react'
import InputText from '../components/InputText'
import Button from '../components/Button'

const Register = ({ navigation }) => {

  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputs = (text, input) => {
    setInputs((previousInput) => ({
      ...previousInput,
      [input]: text
    }))
  }

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    const emailRegex = new RegExp("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/");
    const passwordRegex = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#&()])(?!.*\s).{8,}$/");

    if (!inputs.fullName) {
      handleErrorMessage('Please enter the name', 'fullName');
      valid = false;
    }

    if (!inputs.email) {
      handleErrorMessage('Please enter an email', 'email');
      valid = false;
    } else if (!emailRegex.test(inputs.email)) {
      handleErrorMessage('Please enter a valid email', 'email');
      valid = false;
    }

    if (!inputs.phoneNumber) {
      handleErrorMessage('Please enter the phone number', 'phoneNumber');
      valid = false;
    }

    if (!inputs.password) {
      handleErrorMessage('Please enter the password', 'password');
      valid = false;
    } else if (inputs.password.length < 8 ) {
      handleErrorMessage('Minimum password length is 8', 'password');
      valid = false;
    } else if(!passwordRegex.test(inputs.password)) {
      handleErrorMessage('Password must be contained upper/lower case, numbers, special characters', 'password');
      valid = false;
    }

  }

  const handleErrorMessage = (errorMessage, input) => {
    setErrors((previousValue) => ({
      ...previousValue,
      [input]: errorMessage
    }));
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.subText}>Enter Your Details to Register</Text>
        <View style={{ marginVertical: 20 }}>
          <InputText
            iconName={'account-outline'}
            label={'Full Name'}
            placeholder={'Enter your Name'}
            keyboardType={'default'}
            value={inputs.fullName}
            onChangeText={(text) => handleInputs(text, 'fullName')}
            error={errors.fullName}
            onFocus={() => handleErrorMessage(null, 'fullName')}
          />
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
            iconName={'phone-outline'}
            label={'Phone Number'}
            placeholder={'Enter your phone number'}
            keyboardType={'phone-pad'}
            value={inputs.phoneNumber}
            onChangeText={(text) => handleInputs(text, 'phoneNumber')}
            error={errors.phoneNumber}
            onFocus={() => handleErrorMessage(null, 'phoneNumber')}
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
          <Button title={'Register'} onPress={validate} />
          <Text
            style={styles.haveAccountText}
            onPress={() => navigation.navigate('LogIn')}
          >
            Already have an account? LogIn
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  registerText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subText: {
    color: 'gray',
    fontSize: 18,
    marginVertical: 10
  },
  haveAccountText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20
  }
})

export default Register
