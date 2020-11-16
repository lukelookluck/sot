import React, { useState, useEffect, useContext } from 'react';
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

// 게시글 작성 화면
const WritePost = ({ navigation, route }) => {
  const { serverUrl, user, setUser } = useContext(CommonContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [articleId, setArticleId] = useState(null)

  console.log(route.params, 'dasndjas')

  function refreshList() {
    if (route.params.articleId) {
      setArticleId(route.params.articleId)
      setTitle(route.params.title)
      setContent(route.params.content)
    }
  }

  useEffect(() => {
    refreshList();
  }, []);


  const titleHandler = (text) => {
    setTitle(text);
  }

  const contentHandler = (text) => {
    setContent(text);
  }

  const addPost = () => {
    if (articleId) {
      axios
        .put(`${serverUrl}/board/${route.params.boardid}/${articleId}`, {
          content: content,
          title: title,
          userId: user.id,
        })
        .then((response) => {
          console.log(response.data);
          navigation.navigate('Board', { name: route.params.boardname, id: route.params.boardid, isRe: 'yes' });
        })
        .catch((error) => {
          console.log(error);
        });
      return
    }
    axios.post(`${serverUrl}/board/${route.params.boardid}`, {
      content: content,
      title: title,
      userId: user.id,
    })
      .then((response) => {
        console.log(response.data);
        navigation.navigate('Board', { name: route.params.boardname, id: route.params.boardid, isRe: 'yes' });
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

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={addPost} style={styles.btn}>
            <Text style={{ fontSize: 18, color: 'white' }}>글 작성</Text>
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
