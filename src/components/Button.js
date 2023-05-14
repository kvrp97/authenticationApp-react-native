import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 55,
        width: '100%',
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default Button
