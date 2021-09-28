import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert} from 'react-native';

import InputSearch from '../components/InputSearch';
import RenderItems from '../components/RenderItems';
import Colors from '../constants/Colors';
import constants from "../constants/constants";
import {BASE_URL} from "../api/API";

export default function TabOneScreen({ navigation }) {

  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    (async ()=> {
      try {
        const response = await fetch(`${BASE_URL}/api/posts`)
        const data = await response.json()
        setData(data)
      } catch (e) {
        console.error(e)
        Alert.alert('Error', 'Ошибка соединения с интернетом, попробуйте позже')
      }

    })()
  }, [])

  const searchHandler = () => {

    const filteredPost = data.filter((elem) => {
      return elem.question.toLowerCase().includes(searchText.toLowerCase())
    })

    setData(filteredPost)
  }

  const clearResults = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/posts`)
      const data = await response.json()
      setData(data)
    } catch (e) {
      console.error(e)
      Alert.alert('Error', 'Ошибка соединения с интернетом, попробуйте позже')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchTitle}>{new Date().toLocaleString()}</Text>
          <Text style={styles.searchTitle}>{constants.GREETING}</Text>
          <Text style={styles.searchTitle}>{constants.SHAHADA}</Text>
          <InputSearch setSearchText={setSearchText} searchText={searchText} />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={searchHandler}
            >
              <Text style={{textAlign: 'center', color: '#fff'}}>Найти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={searchHandler}
            >
              <Text style={{textAlign: 'center', color: '#fff'}}
                onPress={clearResults}
              >Сбросить</Text>
            </TouchableOpacity>
          </View>
        </View>

        {data ? <RenderItems data={data}/>: (
            <TouchableOpacity
                style={styles.button}
                onPress={clearResults}
            >
              <Text style={{textAlign: 'center', color: '#fff'}}
                    onPress={clearResults}
              >Похоже у вас нет соединения с интернетом, Повторите запрос</Text>
            </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff'
  },
  searchContainer: {
    paddingVertical: 50,
  },
  searchTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.light.blue,
    padding: 10,
    flex: 1,
    marginRight: 3,
    marginLeft: 3
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
