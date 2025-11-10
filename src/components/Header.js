import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import { FontAwesome5 } from '@expo/vector-icons';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={{ height: 60, backgroundColor: '#ffffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' }}    >
                <FontAwesome5 name="suse" family="brands" size={44} color="black" />
            </View>
        );
    }
}
export default Header;