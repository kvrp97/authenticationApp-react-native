import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LogIn = ({navigation}) => {
  return (
    <View>
      <Text onPress={()=> navigation.navigate('Register')} >LogIn</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default LogIn
