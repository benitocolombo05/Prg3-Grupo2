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
                <Text> Home </Text>
                <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                <Text> login? </Text>
            </Pressable>
        </View>
        )
    }
};

export default Home;
