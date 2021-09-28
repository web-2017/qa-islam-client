import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, Platform} from "react-native";
import Colors from "../constants/Colors";
import {BASE_URL} from "../api/API";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from 'react-native-picker-select';
import SHEIKH_NAMES from "../constants/names";
import {Ionicons} from "@expo/vector-icons";

export default function CreatePostScreen({navigation}) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [sheikh, setSheikh] = useState('');
    const [extra, setExtra] = useState('');
    const [token, setToken] = useState(null);
    const [names, setNames] = useState([
        {label: SHEIKH_NAMES.AbuUmarSositlinskiy, value: SHEIKH_NAMES.AbuUmarSositlinskiy},
        {label: SHEIKH_NAMES.AbdullahKostekskiy, value: SHEIKH_NAMES.AbdullahKostekskiy},
    ]);

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

    const Dropdown = () => {
        return (
            <RNPickerSelect
                placeholder={{
                    label: 'Выберите шейха из списка...',
                    value: null,
                    color: 'red',
                }}
                style={{
                    iconContainer: {
                        top: -3,
                        right: -25,
                    },
                    placeholder: {
                        color: 'purple',
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    viewContainer: {...styles.inputIOS}
                }}
                Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="purple" />;
                }}
                blurOnSubmit={false}
                onValueChange={(value) => setSheikh(value)}
                items={names}
            />
        );
    };

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
                <Dropdown/>
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
    },
    inputIOS: {
        fontSize: 22,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        minWidth: '90%',
        maxWidth: '90%',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginVertical: 5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 22,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
