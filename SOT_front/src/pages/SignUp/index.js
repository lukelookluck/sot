import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUp = ({navigation}) => {
  const [Search, setSearch] = useState('');

  const onSearchHandler = (text) => {
    setSearch(text);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.page}
      scrollEnabled={true}
      contentContainerStyle={styles.screen}>
      <View style={styles.box}>
        <View>
          <Input placeholder="아이디"></Input>
          <Input placeholder="비밀번호" secureTextEntry={true}></Input>
          <Input placeholder="비밀번호 확인" secureTextEntry={true}></Input>
        </View>

        <SearchBar
          placeholder="학교명 검색"
          onChangeText={onSearchHandler}
          value={Search}
          lightTheme={true}></SearchBar>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Start')}>
          <Text style={styles.btntext}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFE0',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    width: 180,
    height: 40,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  btntext: {
    fontSize: 20,
    color: 'white',
  },

  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFA',
    width: 350,
  },

  box: {
    width: 350
  },

});

export default SignUp;
