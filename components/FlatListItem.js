import React from "react";
import {StyleSheet, View} from "react-native";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {Chip, Divider, Subheading, Title} from "react-native-paper";
import {filterReplaceStr} from "../utils/filters/filterReplaceStr";
import Colors from "../constants/Colors";

export const FlatListItem = ({item, deletePost, user, navigation}) => {
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
                <Title style={styles.title}>{filterReplaceStr(item.question)}{' '}?</Title>
                <Chip mode={'flat'} color="green">
                    <FontAwesome name="user-circle-o" size={20} color="green" />
                    {' '}{item?.sheikh}
                </Chip>

                <Subheading style={styles.original}>{filterReplaceStr(item?.answer)}</Subheading>
                {item?.extra ? <Subheading style={styles.extra}>{filterReplaceStr(item?.extra)}</Subheading> : null}
                <Divider style={{backgroundColor: Colors.light.lightBrown, marginVertical: 30, height: 1}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    renderItemStyle: {
        color: '#000',

    },
    title: {
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
        fontSize: 16,
        marginVertical: 5,
        padding: 15,
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'justify',
    },
    extra: {
        backgroundColor: Colors.light.green,
        color: '#fff',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        textAlign: 'justify',
    },
})
