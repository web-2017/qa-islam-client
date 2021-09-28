import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert} from 'react-native';

import InputSearch from '../components/InputSearch';
import RenderItems from '../components/RenderItems';
import Colors from '../constants/Colors';
import constants from "../constants/constants";
import {BASE_URL} from "../api/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen({ navigation }) {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getAllPosts()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const isUser = await AsyncStorage.getItem('user')

      if(typeof isUser === 'string') {
        const parseIsUser = await JSON.parse(isUser)
        setUser(parseIsUser)
      }
    })()
  }, [navigation]);

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/posts`)
      const data = await response.json()
      setPosts(data)
    } catch (e) {
      console.error(e)
      Alert.alert('Error', 'Ошибка соединения с интернетом, попробуйте позже')
    }
  }
  const searchHandler = () => {

    const filteredPost = posts.filter((elem) => {
      return elem.question.toLowerCase().includes(searchText.toLowerCase())
    })

    setPosts(filteredPost)
  }

  const clearResults = async () => {
    await getAllPosts()
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

        {posts ? <RenderItems
            data={posts}
            user={user}
            navigation={navigation}
            />
              :
            (
              <TouchableOpacity
                  style={styles.button}
                  onPress={clearResults}
              >
                <Text style={{textAlign: 'center', color: '#fff'}}
                      onPress={clearResults}
                >Похоже у вас нет соединения с интернетом, Повторите запрос</Text>
              </TouchableOpacity>
            )
        }
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
    fontSize: 14,
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
});
