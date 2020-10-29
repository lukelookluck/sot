import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

const Start = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.top}></View>
      <View style={styles.box}>
        <View style={styles.verti}></View>

        <View style={styles.loginbox}>
          <Text style={styles.title}>SOT</Text>

          <View style={styles.inputbox}>
            <TextInput placeholder="아이디"></TextInput>
            <TextInput placeholder="비밀번호" secureTextEntry={true}></TextInput>
          </View>
          <View>
            <Button
              title="회원가입"
              onPress={() => navigation.navigate('SignUp')}></Button>
            <Button
              title="로그인"
              onPress={() => navigation.navigate('Main')}></Button>
          </View>
        </View>
    
        <View style={styles.verti}></View>
      </View>
      <View style={styles.top}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FACA0F',
  },
  title: {
    color: '#FACA0F',
    textAlign: 'center',
    fontSize: 85,
    marginTop: 55,
    fontFamily: 'Lemonada-SemiBold',
  },
  box: {
    flex: 1,
    flexDirection: 'row',
  },
  verti: {
    flex: 1,
    backgroundColor: '#FACA0F',
  },
  loginbox: {
    flex: 10,
  },

  inputbox: {

  }
  
});

export default Start;
