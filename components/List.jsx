import React from 'react'
import ListItem from "./ListItem";


export const List = ({data, user, navigation, deletePost}) => (
     <ListItem data={data} user={user} deletePost={deletePost} navigation={navigation}/>
  )


