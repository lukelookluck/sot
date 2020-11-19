import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CommonContext } from '../../context/CommonContext';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

// 시작화면
const Start = ({ navigation }) => {
  const { serverUrl, user, setUser, articleStartIdx, setArticleStartIdx } = useContext(CommonContext);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => {

    navigation.addListener('focus', () => {
      AsyncStorage.getItem('testToken', (err, result) => {
        const UserInfo = JSON.parse(result);
        if (result !== null) {
          setUser(UserInfo);
          // navigation.navigate('Main');
          console.log('닉네임 : ' + UserInfo.nickname);
          console.log('토큰 : ' + UserInfo.token);

        }
      });
    })
  }, []);

  const emailHandler = (text) => {
    setEmail(text);
  };

  const pwHandler = (text) => {
    setPw(text);
  };

  const loginHandler = () => {
    axios
      .get(`${serverUrl}/user/login`, {
        headers: {
          Authorization: `JWT ${user.token}`,
        },
        params: {
          email: email,
          password: pw,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser({ ...response.data });
        setArticleStartIdx(5);

        AsyncStorage.setItem('testToken', JSON.stringify(response.data), () => {
          console.log('테스트 저장 완료');
        });

        navigation.navigate('Main'); // 로그인 성공시 메인화면으로
      })
      .catch((error) => {
        alert('이메일과 비밀번호를 확인해주세요!');
        setEmail('');
        setPw('');
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.page}
      scrollEnabled={true}
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps={'handled'}
    >
      <View>
        <View style={styles.loginbox}>
          <Text style={styles.title}>SOT</Text>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.textinput}
              placeholder="이메일"
              onChangeText={emailHandler}
              value={email}></TextInput>
            <TextInput
              style={styles.textinput}
              placeholder="비밀번호"
              secureTextEntry={true}
              onChangeText={pwHandler}
              value={pw}></TextInput>
          </View>

          <View style={styles.btnbox}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('회원가입', { s_name: '', s_id: '' })
              }>
              <Text style={styles.btntext}>회원가입</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={loginHandler}>
              <Text style={styles.btntext}>로그인</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    color: '#FACA0F',
    textAlign: 'center',
    fontSize: 85,
    marginBottom: 30,
    fontFamily: 'Lemonada-SemiBold',
    textShadowColor: '#F14E23',
    textShadowRadius: 1,
    textShadowOffset: { width: 3, height: 3 },
  },
  loginbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputbox: {
    width: 280,
    marginBottom: 10,
  },

  textinput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFA',
  },

  btnbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    marginTop: 20,
    marginBottom: 10,
  },

  btn: {
    width: 120,
    height: 40,
    backgroundColor: '#F14E23',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  btntext: {
    fontSize: 20,
    color: 'white',
  },
});

export default Start;
