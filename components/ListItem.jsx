import React, {useCallback} from "react";
import {FlatList, ActivityIndicator} from "react-native";

import Colors from "../constants/Colors";
import {FlatListItem} from "./FlatListItem";

export default function ListItem({data, navigation, deletePost}) {
    const keyExtractor = useCallback(item => item?._id.toString(), [])

    const FlatListItemHandler = useCallback(({item}) =>
        <FlatListItem
            item={item}
            deletePost={deletePost}
            navigation={navigation}
        />, [])

    return (
        data ?
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                extraData={data}
                initialNumToRender={5}
                renderItem={FlatListItemHandler}
            />
            :
            <ActivityIndicator size="large" color={Colors.light.green} style={{flex: 1, justifyContent: 'center'}}/>
    )
}

