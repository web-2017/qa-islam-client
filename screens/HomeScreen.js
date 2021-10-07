import React, {useEffect, useState} from 'react';
import {Alert, Linking, SafeAreaView, StyleSheet, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '@react-navigation/native';

import {List} from '../components/List';
import {BASE_URL} from "../api/API";
import {Header} from "../components/Header";
import {MainContainer} from "../components/MainContainer";

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
      <MainContainer>
        <Header
            posts={posts}
            user={user}
            navigation={navigation}
            setSearchText={setSearchText}
            searchText={searchText}
            searchHandler={searchHandler}
            clearResults={clearResults}
        />
       <>
         <Text
             style={{marginTop:30}}
             onPress={() => {
               Linking.openURL(
                   // 'http://api.whatsapp.com/send?phone=1' + '8473125422' + '?text=11111',
                   `http://api.whatsapp.com/send?text=asdads`
               );
             }}>
           Send WhatsApp Message
         </Text>
         <Text
           style={{marginTop:30}}
           onPress={() => {
             Linking.openURL(
                 'sms: 8473125422',
                 'asdfasd'
             );
           }}>
         Send  Message
       </Text>
       </>
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
      </MainContainer>
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
