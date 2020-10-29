import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Start = ({navigation}) => {
  return (
    <KeyboardAwareScrollView
      style={styles.page}
      scrollEnabled={true}
      contentContainerStyle={styles.screen}>
      <View>
        <View style={styles.loginbox}>
          <Text style={styles.title}>SOT</Text>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.textinput}
              placeholder="아이디"></TextInput>
            <TextInput
              style={styles.textinput}
              placeholder="비밀번호"
              secureTextEntry={true}></TextInput>
          </View>

          <View style={styles.btnbox}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('회원가입')}>
              <Text style={styles.btntext}>회원가입</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Main')}>
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
    textShadowOffset: {width: 3, height: 3},
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
