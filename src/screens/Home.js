import {React, Component} from "react";
import { View, Text, Pressable } from 'react-native';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View>
                <Text> Hello World </Text>
                <Text> Mi primera app con React Native</Text>
                <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                <Text> Presionar </Text>
            </Pressable>
        </View>
        )
    }
};

export default Home;
