import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert, Platform, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from "../api/API";
import {storeData} from "../config/storage";
import Colors from "../constants/Colors";


export default function LogInScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState('eye-off');

    useEffect(() => {

        (async () => {
            try {
                const isUserExist = await AsyncStorage.getItem('user')

                if(isUserExist) {

                    const parseUserData = await JSON.parse(isUserExist)

                    if(parseUserData?.user?.role === 'USER') {
                        navigation.navigate('Home', { name: 'Home' })
                    }
                }
            } catch (e) {
                console.error(e)
            }
        })();

    }, []);

    const logInHandler = async () => {
        try {
            const response  = await fetch(
                 `${BASE_URL}/api/signin`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await response.json()

            if(response.status === 200) {
                await storeData(data, 'user')
                navigation.navigate('Home')
            } else {
                Alert.alert(
                    "Ошибка входа",
                    `${data.message}`,
                );
            }
        } catch (e) {
            console.error(e)

            Alert.alert(
                "Ошибка входа",
                `${e}`,
            );
        }
    }

    const changeIcon = () => {
        const isIcon = isShowPassword === 'eye-off' ? 'eye' :  'eye-off'
        setIsShowPassword(isIcon)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                <Text style={styles.title}>Only admin</Text>
                <TextInput
                    style={styles.input}
                    label='email'
                    onChangeText={email => setEmail(email)}
                    defaultValue={email.toLocaleLowerCase()}
                    autoCompleteType={'email'}
                    autoCapitalize={'none'}
                />
                <TextInput
                    style={styles.input}
                    label='password'
                    onChangeText={p => setPassword(p)}
                    defaultValue={password}
                    autoCompleteType={'password'}
                    autoCapitalize={'none'}
                    secureTextEntry={isShowPassword === 'eye-off'}
                    right={<TextInput.Icon name={isShowPassword} onPress={() => changeIcon()} />}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={logInHandler}
                >
                    <Text style={{textAlign: 'center',color: '#fff' }}>войти</Text>
                </TouchableOpacity>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: Colors.light.blue,
        // padding: 5,
        // minWidth: '90%',
        marginVertical: 5
    },
    button: {
        backgroundColor: Colors.light.blue,
        padding: 15,
        borderRadius: 6,
        width: '40%'

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
