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
            <View>
                <Text>SOT</Text>
            </View>
            <View>
                <TextInput placeholder="아이디"></TextInput>
                <TextInput placeholder="비밀번호" secureTextEntry={true}></TextInput>
            </View>
            <View>
                <Button title="회원가입" onPress={ () => navigation.navigate('SignUp') }></Button>
                <Button title="로그인" onPress={ () => navigation.navigate('Main') }></Button>
            </View>
            
        </View>
    );
};


export default Start;