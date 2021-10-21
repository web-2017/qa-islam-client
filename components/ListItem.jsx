import React, {useCallback, useRef, useState} from "react";
import {FlatList, ActivityIndicator, StyleSheet, View} from "react-native";

import Colors from "../constants/Colors";
import {FlatListItem} from "./FlatListItem";
import { AntDesign } from '@expo/vector-icons';

export default function ListItem({data, navigation, deletePost}) {
    const keyExtractor = useCallback(item => item?._id.toString(), [])

    const listRef = useRef(null);
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 300;

    const FlatListItemHandler = useCallback(({item}) =>
        <FlatListItem
            item={item}
            deletePost={deletePost}
            navigation={navigation}
        />, [])

    return (
        data ?
            <>
                <FlatList
                    ref={listRef}
                    onScroll={event => {
                        setContentVerticalOffset(event.nativeEvent.contentOffset.y);
                    }}
                    data={data}
                    keyExtractor={keyExtractor}
                    extraData={data}
                    initialNumToRender={5}
                    renderItem={FlatListItemHandler}
                />
                {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
                    <View style={styles.scrollTopContainer}>
                        <AntDesign
                            name="arrowup" size={20}
                            color="black"
                            style={styles.scrollTopButton}
                            onPress={() => {
                                listRef.current.scrollToOffset({ offset: 0, animated: true });
                            }}
                        />
                    </View>
                )}
            </>
:
            <ActivityIndicator size="large" color={Colors.light.green} style={{flex: 1, justifyContent: 'center'}}/>
    )
}

const styles = StyleSheet.create({
    scrollTopContainer: {
        backgroundColor: Colors.light.red,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    scrollTopButton: {
        position: 'absolute',
        color: '#fff',
    },
});
