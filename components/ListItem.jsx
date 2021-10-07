import React from "react";
import {FlatList, ActivityIndicator} from "react-native";

import Colors from "../constants/Colors";
import {FlatListItem} from "./FlatListItem";

export default function ListItem({data, user, navigation, deletePost}) {
    return (
        data ?
        <FlatList
            data={data}
            keyExtractor={item => item._id}
            extraData={data}
            initialNumToRender={5}
            renderItem={({ item }) =>
                <FlatListItem
                    item={item}
                    user={user}
                    deletePost={deletePost}
                    navigation={navigation}
                />
            }
        />
            :
            <ActivityIndicator size="large" color={Colors.light.green} style={{flex: 1, justifyContent: 'center'}} />
    )
}

