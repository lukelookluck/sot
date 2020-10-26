import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

const SignUp = ({navigation}) => {
    return (
        <View>
            <Text>회원가입 화면</Text>
            <Button title="메인으로" onPress={() => navigation.navigate('Start') }></Button>
        </View>
    );
};


export default SignUp;