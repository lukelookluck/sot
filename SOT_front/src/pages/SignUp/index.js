import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {SearchBar, Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from '../../context/CommonContext';

const SignUp = ({navigation, route}) => {
  const [key, setKey] = useState('');
  const [userId, setUserId] = useState('');
  const [userNick, setUserNick] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userSchoolId, setUserSchoolId] = useState('');

  const {serverUrl, user, setUser} = useContext(CommonContext);
  // const [userConPw, setUserConPw] = useState('');

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
    navigation.navigate('schoolsearch');
  };

  const signUpHandler = () => {
    console.log('클릭했어요!!!');

    axios
      .post(`${serverUrl}/user/`, {
        email: userId,
        nickname: userNick,
        password: userPw,
        schoolId: route.params.s_id,
      })
      .then(function (response) {
        console.log('제대로간겨??');
        console.log(response.data);
        setUser({...response.data});
        navigation.navigate('Main');
      })
      .catch(function (error) {
        console.log('에러난겨??');
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
              <Input placeholder="학교를 검색해주세요" disabled="true"></Input>
            </View>
          ) : (
            <View style={styles.s_input}>
              <Input onChangeText={userSchoolIdHandler} placeholder={route.params.s_name} disabled="true" disabledInputStyle={{opacity: 1}}></Input>
            </View>
          )}

          <TouchableOpacity onPress={goSchoolSearch} style={styles.s_btn}>
            <Text style={{color: 'white', fontSize: 20}}>학교 찾기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Input
            placeholder="아이디"
            label="아이디를 입력해주세요"
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
          {/* <Input placeholder="비밀번호 확인" label="비밀번호를 다시 입력해주세요" secureTextEntry={true}></Input> */}
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

  s_text: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderBottomWidth: 1.2,
    borderBottomColor: 'lightslategray',
    fontSize: 20,
    textAlignVertical: 'center',
    // marginRight: 5,
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

  search: {
    backgroundColor: '#FFFFE0',
    borderWidth: 0,
    borderRadius: 5,
    borderColor: 'gray',
  },

  search2: {
    backgroundColor: '#FFFFE0',
  },

  search3: {
    backgroundColor: '#FFFFE0',
  },
});

export default SignUp;
