import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from '../../context/CommonContext';

// 회원가입
const SignUp = ({navigation, route}) => {
  const [userId, setUserId] = useState('');
  const [userNick, setUserNick] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userSchoolId, setUserSchoolId] = useState('');

  const {serverUrl, user, setUser} = useContext(CommonContext);

  const userIdHandler = (id) => {
    setUserId(id);
  };

  const userNickHandler = (nick) => {
    setUserNick(nick);
  };

  const userPwHandler = (pw) => {
    setUserPw(pw);
  };

  const userSchoolIdHandler = () => {
    setUserSchoolId(route.params.s_id);
  };

  const goSchoolSearch = () => {
    navigation.navigate('schoolsearch'); // 학교명 검색 화면으로
  };

  const signUpHandler = () => {
    axios
      .post(`${serverUrl}/user/`, {
        email: userId,
        nickname: userNick,
        password: userPw,
        schoolId: route.params.s_id,
      })
      .then(function (response) {
        console.log(response.data);
        setUser({...response.data});
        navigation.navigate('Main'); // 회원가입 성공 시 자동 로그인 후 메인화면으로
      })
      .catch(function (error) {
        alert('사용할 수 없는 아이디입니다.');
        setUserId('');
        console.log(error);
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#FFFFE0'}}>
      <KeyboardAwareScrollView
        style={styles.page}
        scrollEnabled={true}
        contentContainerStyle={styles.screen}>
        <View
          style={{
            flexDirection: 'row',
            width: 320,
            justifyContent: 'center',
          }}>
          {route.params.s_name == '' ? (
            <View style={styles.s_input}>
              <Input placeholder="학교를 검색해주세요" disabled={true}></Input>
            </View>
          ) : (
            <View style={styles.s_input}>
              <Input
                onChangeText={userSchoolIdHandler}
                placeholder={route.params.s_name}
                disabled={true}
                disabledInputStyle={{opacity: 1}}></Input>
            </View>
          )}

          <TouchableOpacity onPress={goSchoolSearch} style={styles.s_btn}>
            <Text style={{color: 'white', fontSize: 20}}>학교 찾기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Input
            placeholder="이메일"
            label="이메일을 입력해주세요"
            onChangeText={userIdHandler}
            value={userId}></Input>
          <Input
            placeholder="닉네임"
            label="닉네임을 입력해주세요"
            onChangeText={userNickHandler}
            value={userNick}></Input>
          <Input
            placeholder="비밀번호"
            label="비밀번호를 입력해주세요"
            secureTextEntry={true}
            onChangeText={userPwHandler}
            value={userPw}></Input>
        </View>

        <View style={styles.btnbox}>
          <TouchableOpacity style={styles.btn} onPress={signUpHandler}>
            <Text style={styles.btntext}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFE0',
    marginTop: 50,
    marginBottom: 40,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  s_input: {
    width: 220,
  },

  s_btn: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 100,
    height: 40,
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
    marginTop: 20,
  },

  box: {
    width: 320,
  },
});

export default SignUp;
