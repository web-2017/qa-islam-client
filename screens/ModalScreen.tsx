import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';

import {BASE_URL} from "../api/API";
import Colors from "../constants/Colors";


export default function ModalScreen({route, navigation}: any) {
    const {postId, userToken} = route.params
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [sheikh, setSheikh] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [extra, setExtra] = useState('');
    const [token, setToken] = useState(userToken);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        getCurrentPost()
    }, [postId, token]);
    
    
    // read post
    const getCurrentPost = async () => {
        try {
            setIsLoading(true)
            const response  = await fetch(`${BASE_URL}/api/post/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            const post = await response.json()
            
            
            
            if(response.status == 200) {
                setQuestion(post.question)
                setAnswer(post.answer)
                setSheikh(post.sheikh)
                setExtra(post.extra)
                setIsLoading(false)
                setVideoLink(post.videoLink)
            }
            
        } catch (e) {
            console.error(e)
        }
    }
    
    // edit post
    const editPostHandler = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId: postId,
                    question,
                    answer,
                    sheikh,
                    extra,
                    videoLink
                })
            })
            
            const updatedPost = await response.json()
            
            if(response.status === 200) {
                setExtra('')
                setQuestion('')
                setSheikh('')
                setAnswer('')
                setVideoLink('')
                return navigation.navigate('Home')
            }
            
            response.status !== 200 && Alert.alert('Error', updatedPost.message)
        }catch (e) {
            console.error(e)
        }
    }
    
    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                <Text style={styles.title}>Only admin</Text>
                
                <Text style={styles.title}>Изменить пост</Text>
                {/*<Button onPress={() => navigation.goBack()} title="Go back home" />*/}
                {
                    isLoading ? <ActivityIndicator size="large" color={Colors.light.green} style={{flex: 1, justifyContent: 'center'}} />
                        :
                        
                    <>
                        <View>
                            <Text>Введите ваш вопрос</Text>
                            <TextInput
                                placeholder={'Вопрос'}
                                style={styles.input}
                                onChangeText={(value) => setQuestion(value)}
                                clearButtonMode={'always'}
                                multiline={true}
                                defaultValue={question}
                            />
                        </View>
                        <View>
                            <Text>Шейх</Text>
                            <TextInput
                                placeholder={'Шейх'}
                                onChangeText={(value) => setSheikh(value)}
                                style={styles.input}
                                clearButtonMode={'always'}
                                defaultValue={sheikh}
                            />
                        </View>
                        <View>
                            <Text>Ответ</Text>
                            <TextInput
                                placeholder={'answer'}
                                onChangeText={(value) => setAnswer(value)}
                                style={styles.input}
                                clearButtonMode={'always'}
                                multiline={true}
                                defaultValue={answer}
                            />
                        </View>
                        <View>
                            <Text>Дополнительно</Text>
                            <TextInput
                                placeholder={'Дополнительно'}
                                onChangeText={(value) => setExtra(value)}
                                style={styles.input}
                                clearButtonMode={'always'}
                                multiline={true}
                                defaultValue={extra}
                            />
                        </View>
                        <View>
                            <Text>Видео ссылка</Text>
                            <TextInput
                                placeholder={'Дополнительно'}
                                onChangeText={(value) => setVideoLink(value)}
                                style={styles.input}
                                clearButtonMode={'always'}
                                multiline={true}
                                defaultValue={videoLink}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => editPostHandler()}
                            style={styles.button}
                        >
                            <Text style={{color: '#fff'}}>Сохранить</Text>
                        </TouchableOpacity>
                    </>
                }

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 30,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        marginVertical: 3,
        borderColor: Colors.light.blue,
        padding: 5,
        minWidth: '90%',
        maxWidth: '90%',
        borderRadius: 6
    },
    button: {
        marginVertical: 20, backgroundColor: Colors.light.blue, padding: 15,
        borderRadius: 6
    }
});
