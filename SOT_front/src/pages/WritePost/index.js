import React, {useState, useEffect} from 'react';
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

const WritePost = ({navigation, route}) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [userId, setUserId] = useState('');

  const titleHandler = (text) => {
    setTitle(text);
  }

  const contentHandler = (text) => {
    setContent(text);
  }

  const addPost = () => {

    axios.post(`http://10.0.2.2:8080/board/${route.params.boardid}`, {
        // boardId : route.params.boardid,
        content: content,
        title: title,
        userId: 3, // user의 id 받아서 넣기
    })
      .then((response) => {
        console.log(response.data);
        navigation.goBack();
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
          <TextInput placeholder="제목" onChangeText={titleHandler} value={title}></TextInput>
        </View>

        <View style={styles.detailbox}>
          <TextInput placeholder="내용" onChangeText={contentHandler} value={content}></TextInput>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={addPost} style={styles.btn}>
            <Text style={{fontSize: 18, color: 'white'}}>글 작성</Text>
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

export default WritePost;
