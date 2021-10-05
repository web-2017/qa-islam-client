import React from "react";
import {FlatList, Text, View, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import {filterReplaceStr} from "../utils/filters/filterReplaceStr";
import Colors from "../constants/Colors";

export default function ListItem({data, user, navigation, deletePost}) {

    const Item = ({item}) => {
        return  (
            <View style={styles.renderItemStyle}>
                <View key={item._id}>
                    {
                        user?._id &&
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Ionicons
                                onPress={() => navigation.navigate('Modal', {
                                    postId: item._id, userToken: user.token,
                                })}
                                name={'create-outline'} size={20}
                                style={{
                                    color: 'green',
                                    textAlign: 'right',
                                }}
                            />
                            <Ionicons
                                name={'trash-outline'} size={20}
                                style={{
                                    color: 'red',
                                    textAlign: 'right',
                                }}
                                onPress={() => deletePost(item._id)}
                            />
                        </View>
                    }
                    <Text style={[styles.text, styles.title]}>{item.question}{' '}?</Text>

                    <Text style={{fontWeight: '600'}} style={styles.label}>{filterReplaceStr(item?.sheikh)}</Text>
                    <Text style={styles.original}>{filterReplaceStr(item?.answer)}</Text>
                    {item?.extra ? <Text style={styles.extra}>{filterReplaceStr(item?.extra)}</Text> : null}
                </View>
            </View>
        )
    }

    const renderItem = ({ item }) => <Item item={item}/>
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            extraData={data}
        />
    )
}

const styles = StyleSheet.create({
    renderItemStyle: {
        color: '#000',
        marginBottom: 10,
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.light.blue,
        padding: 5,
        paddingBottom: 30

    },
    text: {
        paddingVertical: 3,
        fontSize: 18,
        fontWeight: '300',
    },
    title: {
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: '700',
    },
    label: {
        backgroundColor: '#444',
        color: '#fff',
        padding: 5,
        paddingLeft: 7,
        borderRadius: 5,
        overflow: "hidden",
        textTransform: 'capitalize'
    },
    original: {
        backgroundColor: '#ccc',
        padding: 10,
        fontSize: 16,
        marginVertical: 4,
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'justify',
    },
    extra: {
        backgroundColor: Colors.light.green,
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'justify',
    },
    content: {},
})
