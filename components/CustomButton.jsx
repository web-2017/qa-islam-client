import * as React from "react";
import {Button} from "react-native-paper";

export const CustomButton = (props) => {
    console.log(props)
    return (
         <Button
             {...props}
             compact
             mode={props.mode ? props.mode : 'contained'}
             icon={props.icon ? props.icon : null}
             style={[props.style, { fontFamily: 'space-mono' }]}
         >
             {props.children}
         </Button>
    )
}
