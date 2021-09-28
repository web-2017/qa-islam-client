import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert, Platform, StyleSheet, TextInput, TouchableOpacity, Text, View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from "../api/API";
import {storeData} from "../config/storage";
import Colors from "../constants/Colors";


export default function LogInScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    useEffect(() => {

        (async () => {
            try {
                const isUserExist = await AsyncStorage.getItem('user')

                if(isUserExist) {

                    const parseUserData = await JSON.parse(isUserExist)

                    if(parseUserData?.user?.role === 'ADMIN') {
                        navigation.navigate('Create', { name: 'ScreenCreate' })
                    }
                }
            } catch (e) {
                console.error(e)
            }
        })();

    }, []);

    const logInHandler = async () => {
        try {
            const response  = await fetch(`${BASE_URL}/api/signin`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await response.json()

            const saveInStorage = await storeData(data, 'user')
            const readStorageData = await AsyncStorage.getItem('user')

            console.log('saveInStorage', readStorageData)
            console.log(response.status)

            if(response.status === 200) {
                navigation.navigate('Create', {name: 'Create'})
            }


        } catch (e) {
            console.error(e)

            Alert.alert(
                "Ошибка входа",
                `${e}`,
            );
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                <Text style={styles.title}>Only admin</Text>
                <TextInput
                    style={styles.input}
                    placeholder='email'
                    onChangeText={email => setEmail(email)}
                    defaultValue={email.toLocaleLowerCase()}
                    autoCompleteType={'email'}
                />
                <TextInput
                    style={styles.input}
                    placeholder='password'
                    onChangeText={p => setPassword(p)}
                    defaultValue={password}
                    autoCompleteType={'password'}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.light.blue,
        padding: 5,
        minWidth: '90%',
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
