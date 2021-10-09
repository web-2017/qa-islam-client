import React from 'react'
import { TextInput } from 'react-native-paper';
import Colors from "../constants/Colors";

export default function InputSearch({searchText, setSearchText}: {searchText: string, setSearchText: Function}) {
  
  return (
    <>
      {/* input */}
        <TextInput
            label="Введите ваш вопрос"
            mode={'outlined'}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            // dense
            clearButtonMode={'always'}
            selectionColor={Colors.light.blue}
        />
    </>
   
  )
}
