import React from 'react'
import ListItem from "./ListItem";


export const List = ({data, user, navigation, deletePost, getAllPosts}) => (
     <ListItem data={data} user={user} getAllPosts={getAllPosts} deletePost={deletePost} navigation={navigation}/>
  )


