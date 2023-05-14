import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputText = ({ label, iconName, error, password, onFocus = () => { }, ...props }) => {

  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor: error ? 'red' : isFocused ? 'darkblue' : 'lightgray' }]}>
        <Icon name={iconName} style={styles.iconStyle} />
        <TextInput
          style={styles.textInputStyle}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            style={{ fontSize: 22, color: 'darkblue' }}
          />
        )}
      </View>
      {error && (<Text style={styles.errorText}>{error}</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  labelStyle: {
    marginVertical: 1,
    fontSize: 14,
    color: 'gray'
  },
  inputContainer: {
    height: 55,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 22,
    color: 'darkblue',
    marginRight: 10
  },
  textInputStyle: {
    color: 'darkblue',
    fontSize: 15,
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 1
  }
})

export default InputText