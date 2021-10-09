import React from "react";
import {View} from "react-native";
export const MainContainer = (props) => {
    return (
        <View style={[props.style, {marginHorizontal: 7, flex: 1}]}>
            {props.children}
        </View>
    )
}
