import React, {useContext} from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import constants from "../constants/constants";
import InputSearch from "./InputSearch";
import Colors from "../constants/Colors";
import {UserContext} from "../store/userContext";

export const Header = ({posts, navigation, setSearchText, searchText, searchHandler, clearResults}) => {
    const [stateUser, setStateUser] = useContext(UserContext);
    return (

        <View style={styles.searchContainer}>
            <Text style={{fontSize: 10}}>{posts?.length} posts</Text>
            <Text style={styles.searchTitle}>{new Date().toLocaleString()}</Text>

            {
                stateUser?._id && stateUser?.user?.role === 'ADMIN' ? <Button title={'выйти'} onPress={() => {
                        setStateUser(null)
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
                    onPress={() => searchHandler()}
                >
                    <Text style={{textAlign: 'center', color: '#fff'}}>Найти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => clearResults()}
                >
                    <Text style={{textAlign: 'center', color: '#fff'}}
                    >Сбросить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
