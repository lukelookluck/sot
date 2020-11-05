import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SearchBar, Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { CommonContext } from "../../context/CommonContext";

const SignUp = ({navigation}) => {
  const [Search, setSearch] = useState('');
  const [userId, setUserId] = useState('');
  const [userNick, setUserNick] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userSchoolId, setUserSchoolId] = useState('');
  const { serverUrl } = useContext(CommonContext);
  // const [userConPw, setUserConPw] = useState('');

  const userIdHandler = (id) => {
    setUserId(id);
  }

  const userNickHandler = (nick) => {
    setUserNick(nick);
  }

  const userPwHandler = (pw) => {
    setUserPw(pw);
  }

  const onSearchHandler = (text) => {
    setSearch(text);

    axios.get(`${serverUrl}/search`, {
      headers: {
        Authorization: `JWT ${user.token}`,
      },
      params: {
        email : email,
        password : pw,
      },
    })
      .then((response) => {
        console.log(response.data);
        navigation.navigate('Main');
      })
      .catch((error) => {
        alert("아이디와 비밀번호를 확인해주세요!");
        setEmail("");
        setPw("");
        console.log(error);
      });

  };

  const signUpHandler = () => {

    console.log("클릭했어요!!!");

    axios.post(`${serverUrl}/user/register/`, {
      email: userId,
      nickname: userNick,
      password: userPw,
      schoolId: userSchoolId,
    })
    .then(function (response) {
      console.log("제대로간겨??");
      console.log(response);
      navigation.navigate('Start');
    })
    .catch(function (error) {
      console.log("에러난겨??");
      console.log(error);
    });

  }


  return (
    <ScrollView style={{backgroundColor: '#FFFFE0'}}>

        <KeyboardAwareScrollView
          style={styles.page}
          scrollEnabled={true}
          contentContainerStyle={styles.screen}>
          
          <View style={styles.box}>
            <Input placeholder="아이디" label="아이디를 입력해주세요" onChangeText={userIdHandler} value={userId}></Input>
            <Input placeholder="닉네임" label="닉네임을 입력해주세요" onChangeText={userNickHandler} value={userNick}></Input>
            <Input placeholder="비밀번호" label="비밀번호를 입력해주세요" secureTextEntry={true} onChangeText={userPwHandler} value={userPw}></Input>
            {/* <Input placeholder="비밀번호 확인" label="비밀번호를 다시 입력해주세요" secureTextEntry={true}></Input> */}
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
                onPress={signUpHandler}>
                <Text style={styles.btntext}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFE0',
    marginTop: 40,
    marginBottom: 40,
    // flex: 1,
  },
  screen: {
    // flex: 1,
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
