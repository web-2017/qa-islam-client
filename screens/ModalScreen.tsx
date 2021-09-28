import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../components/Themed';
import {BASE_URL} from "../api/API";
import {storeData} from "../config/storage";


export default function ModalScreen({navigation}) {
    console.log(navigation)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
    useEffect(() => {
        
        // Если в уже есть пользователь то идем на страницу создания
        (async () => {
    
            const isUserExist = await AsyncStorage.getItem('user')
            
            if(isUserExist) {
    
                const parseUserData = await JSON.parse(isUserExist)
    
                if(parseUserData.user.role === 'ADMIN') {
                    console.log(11)
                    navigation.navigate('Create', { name: 'ScreenCreate' })
                }
            }
        })()
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
    
        console.log(data)
        console.log('saveInStorage', readStorageData)
        
        
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={styles.title}>Only admin</Text>
      <TextInput
          placeholder='email'
          onChangeText={email => setEmail(email)}
          defaultValue={email.toLocaleLowerCase()}
          autoCompleteType={'email'}
      />
      <TextInput
          placeholder='password'
          onChangeText={p => setPassword(p)}
          defaultValue={password}
          autoCompleteType={'password'}
      />
      <TouchableOpacity
          style={styles.button}
          onPress={logInHandler}
      >
        <Text style={{textAlign: 'center', }}>войти</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {},
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
