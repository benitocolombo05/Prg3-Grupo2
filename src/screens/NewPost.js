import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import DynamicForm from '../components/DynamicForm';

function NewPost() {
    return (
        <View>
            <Text>New Post </Text>
            <DynamicForm /> 
        </View>
    );
}
    

export default NewPost;