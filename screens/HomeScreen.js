import React, {useContext, useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import {Title, Paragraph} from "react-native-paper";

import {Header} from "../components/Header";
import {MainContainer} from "../components/MainContainer";
import {List} from '../components/List';
import {BASE_URL} from "../api/API";
import {UserContext} from "../store/userContext";
import {CustomButton} from '../components/CustomButton.jsx'

export default function HomeScreen({navigation}) {

    const [stateUser, setStateUser] = useContext(UserContext);

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return navigation.addListener('focus', async () => {
            await getAllPosts()
        });
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
                {text: "OK", onPress: () => deletePost(id)}
            ],
        )
    }

    const deletePost = async id => {
        try {
            await fetch(`${BASE_URL}/api/post-delete/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${stateUser?.token}`,
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
                    navigation={navigation}
                    setSearchText={setSearchText}
                    searchText={searchText}
                    searchHandler={searchHandler}
                    clearResults={clearResults}
                />
                {
                    posts?.length ?
                        <List
                            data={posts}
                            navigation={navigation}
                            deletePost={isDeletedPost}
                            getAllPosts={getAllPosts}
                        /> :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Title>Подождите...</Title>
                            <Paragraph>Ответ не найдет, или соединение с интернетом прервано, пожалуйста повторите попытку</Paragraph>
                            <CustomButton onPress={() => {
                                getAllPosts()
                                setSearchText('')
                            }
                            } style={{marginVertical: 10}}>Обновить</CustomButton>
                        </View>
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
