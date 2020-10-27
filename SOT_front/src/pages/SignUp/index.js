import React , { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const SignUp = ({navigation}) => {

    const [Search, setSearch] = useState("");

    const onSearchHandler = (Search) => {
        setSearch({Search});
    }

    return (
        <View>
            <Text>회원가입</Text>
            <TextInput placeholder="아이디"></TextInput>
            <TextInput placeholder="비밀번호" secureTextEntry={true}></TextInput>
            <SearchBar placeholder="학교명 검색" onChangeText={onSearchHandler} value={Search} lightTheme={true}></SearchBar>

            <Button title="메인으로" onPress={() => navigation.navigate('Start') }></Button>
        </View>
    );
};


export default SignUp;