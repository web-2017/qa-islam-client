import React from 'react'
import { TextInput } from 'react-native-paper';

export default function InputSearch({searchText, setSearchText}: {searchText: string, setSearchText: Function}) {
  
  return (
    <>
      {/* input */}
        <TextInput
            label="Поиск"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            dense
            clearButtonMode={'always'}
        />
    </>
   
  )
}
