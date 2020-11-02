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
        <Input placeholder="ex) sot2020" label="아이디를 입력해주세요"></Input>
        <Input placeholder="비밀번호" label="비밀번호를 입력해주세요" secureTextEntry={true}></Input>
        <Input placeholder="비밀번호 확인" label="비밀번호를 다시 입력해주세요" secureTextEntry={true}></Input>
      </View>

      <View style={styles.box2}>
        <SearchBar
          placeholder="학교명 검색"
          onChangeText={onSearchHandler}
          value={Search}
          style={styles.searchbar}
          containerStyle={styles.search}
          inputContainerStyle={styles.search2}
          inputStyle={styles.search3}
          ></SearchBar>

        <View style={styles.btnbox}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Start')}>
            <Text style={styles.btntext}>회원가입</Text>
          </TouchableOpacity>
        </View>
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

  btnbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  box: {
    width: 320,
  },
  box2: {
    width: 300,
    marginTop: 20,
  },

  search: {
    backgroundColor: '#FFFFE0',
    borderWidth: 0,
    borderRadius: 5,
    borderColor: 'gray'
  },

  search2: {
    backgroundColor: '#FFFFE0',
  },

  search3: {
    backgroundColor: '#FFFFE0',
  },



});

export default SignUp;
