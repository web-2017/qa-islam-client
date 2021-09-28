import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert,} from "react-native";
import Colors from "../constants/Colors";
import {BASE_URL} from "../api/API";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreatePostScreen({navigation}) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [sheikh, setSheikh] = useState('');
    const [extra, setExtra] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async () => {
            const storageToken = await AsyncStorage.getItem('user')
            if( typeof storageToken === 'string') {
                const parseData =  JSON.parse(storageToken)
                setToken(parseData?.token)
            }  else {
                Alert.alert('Error Token', 'Вы не вошли');
                setToken(null)
                navigation.navigate('LogIn', {name: 'LogIn'});
            }
        })()
    }, []);

    const createPostHandler = async () => {
        if(!question || !answer || !sheikh) {
            return Alert.alert('Error', 'Все поля обязательны для заполнения')
        }

        try {
            const response = await fetch(`${BASE_URL}/api/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({question, answer, sheikh, extra})
            })

            const data = await response.json()

            if(response.status === 200) {
                setExtra('')
                setQuestion('')
                setSheikh('')
                setAnswer('')
                return navigation.navigate('Home', {name: 'Home'})
            }

            response.status !== 200 && Alert.alert('Error', data.message)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <Text style={styles.title}>Создать запись</Text>
            {/*<Button onPress={() => navigation.goBack()} title="Go back home" />*/}

            <View>
                <Text>Введите ваш вопрос</Text>
                <TextInput
                    placeholder={'Вопрос'}
                    style={styles.input}
                    onChangeText={(value) => setQuestion(value)}
                    clearButtonMode={'always'}
                    multiline={true}
                />
            </View>
            <View>
                <Text>Шейх</Text>
                <TextInput
                    placeholder={'Шейх'}
                    onChangeText={(value) => setSheikh(value)}
                    style={styles.input}
                    clearButtonMode={'always'}
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
                />
            </View>
            <TouchableOpacity
                onPress={createPostHandler}
                style={styles.button}
            >
                <Text>Создать</Text>
            </TouchableOpacity>
        </ScrollView>
    )
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
