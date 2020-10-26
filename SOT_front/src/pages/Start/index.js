import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import 'react-native-gesture-handler';

const Start = ({navigation}) => {
    return (
        <View>
            <Text>시작 화면</Text>
            <Button title="회원가입화면으로" onPress={ () => navigation.navigate('SignUp') }></Button>
        </View>
    );
};


export default Start;