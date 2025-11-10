import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import DynamicForm from '../components/DynamicForm';
import Header from "../components/Header";

function NewPost() {
    return (
        <View>
            <Header />
            <DynamicForm /> 
        </View>
    );
}
    

export default NewPost;