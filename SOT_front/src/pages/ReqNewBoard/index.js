import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from "../../context/CommonContext";

const ReqNewBoard = ({navigation, route}) => {

  const { serverUrl, user, setUser } = useContext(CommonContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleHandler = (text) => {
    setTitle(text);
  }

  const contentHandler = (text) => {
    setContent(text);
  }

  const addPost = () => {

    axios.post(`${serverUrl}/board`, {
        name: title,
        description: content,
        userId: user.id,
        schoolId: user.schoolId,
    })
      .then((response) => {
        console.log(response.data);
        navigation.navigate("게시판 목록", {isRef: 'yes', help: "kill"});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.screen}>
        <View style={styles.titlebox}>
          <TextInput placeholder="게시판 이름" onChangeText={titleHandler} value={title}></TextInput>
        </View>

        <View style={styles.detailbox}>
          <TextInput placeholder="신청 사유" onChangeText={contentHandler} value={content}></TextInput>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={addPost} style={styles.btn}>
            <Text style={{fontSize: 18, color: 'white'}}>신청하기</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  titlebox: {
    marginTop: 30,
    marginBottom: 30,
    width: "90%",
    borderColor: 'gray',
    borderStyle: "solid",
    borderWidth: 1,
  },

  detailbox: {
    height: 300,
    width: "90%",
    borderColor: 'gray',
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 30,
  },

  btn: {
    width: 90,
    height: 40,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});

export default ReqNewBoard;
