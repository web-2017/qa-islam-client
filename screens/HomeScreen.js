import React, {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '@react-navigation/native';

import InputSearch from '../components/InputSearch';
import {List} from '../components/List';
import Colors from '../constants/Colors';
import constants from "../constants/constants";
import {BASE_URL} from "../api/API";
import {Header} from "../components/Header";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return navigation.addListener('focus', async () => {
      await getAllPosts()
    });
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
    console.log(1)
    try {
      const response = await fetch( `${BASE_URL}/api/posts`)
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
    setSearchText('')
    await getAllPosts()
  }

  const isDeletedPost = id => {
    Alert.alert(
        'Удаление поста',
    'Вы уверены что хотите удалить статью?',
        [
            {
              text: "Отмена",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => deletePost(id) }
          ],
        )
  }

  const deletePost = async id => {
    try {
      await fetch(`${BASE_URL}/api/post-delete/${id}`,{
        method: 'delete',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
          .then((msg) => {
            Alert.alert('Success')
            getAllPosts()
          })
          .catch(err => Alert.alert('Error', err))
    } catch (e) {
      Alert.alert('Error delete', e.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
          posts={posts}
          user={user}
          navigation={navigation}
          setSearchText={setSearchText}
          searchText={searchText}
          searchHandler={searchHandler}
          clearResults={clearResults}
      />
      {
            posts.length ?
            <List
                data={posts}
                user={user}
                navigation={navigation}
                deletePost={isDeletedPost}
                getAllPosts={getAllPosts}
            /> : null
          }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff'
  },
});
