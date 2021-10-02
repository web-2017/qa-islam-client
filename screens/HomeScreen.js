import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputSearch from '../components/InputSearch';
import RenderItems from '../components/RenderItems';
import Colors from '../constants/Colors';
import constants from "../constants/constants";
import {BASE_URL} from "../api/API";

export default function HomeScreen({ navigation }) {

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
      // return elem.question.toLowerCase().startsWith((searchText.toLowerCase()))
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
        <View style={styles.searchContainer}>
            <Text style={{fontSize: 10}}>{posts?.length} posts</Text>
            <Text style={styles.searchTitle}>{new Date().toLocaleString()}</Text>
            {
              user?._id && user?.user?.role === 'ADMIN' ? <Button title={'выйти'} onPress={() => {
                AsyncStorage.removeItem('user')
                navigation.navigate('Home')
              }}/>
                  : null
            }
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
              onPress={clearResults}
            >
              <Text style={{textAlign: 'center', color: '#fff'}}
              >Сбросить</Text>
            </TouchableOpacity>
          </View>
        </View>
      {
            posts.length ?
            <RenderItems
                data={posts}
                user={user}
                navigation={navigation}
                deletePost={isDeletedPost}
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
  searchContainer: {
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
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
    marginLeft: 3,
  },
});
