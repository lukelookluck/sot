import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import PartBoard from '../../components/PartBoard/Box';
import FavBoardList from '../../components/FavBoardList';

import { CommonContext } from '../../context/CommonContext';

export default function Home({ navigation }) {
  const { serverUrl, user, setUser, articleStartIdx, setArticleStartIdx } = useContext(CommonContext);

  const [temp, setTemp] = useState(null);
  const [tempId, setTempId] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [myLoading, setMyloading] = useState(false);
  const [myLoading2, setMyloading2] = useState(false);

  const [boardList, setBoardList] = useState([]);

  // 전체게시글
  const [wholeArticleList, setwholeArticleList] = useState([]);
  // 특정게시글
  const [certainArticleList, setCertainArticleList] = useState([]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setTemp(null);
      setTempId(null);
      setPressed(false);
      setMyloading(false);
    });
    navigation.addListener('focus', () => {
      refreshFavBoardList();
      refreshWholeArticleList();
    });
  }, []);

  function moreArticles() {
    refreshWholeArticleList()
  }

  // 즐찾 게시판 리스트 불러오기
  function refreshFavBoardList() {
    console.log('user', user, articleStartIdx)
    axios
      .get(`${serverUrl}/board/fav?userId=${user.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
        // params: {
        //   id: user.schoolId, // user의 schoolId 받아서 넣기
        // },
      })
      .then((response) => {
        setBoardList([]);
        setBoardList(response.data);
        setMyloading2(true);
      })
      .catch((error) => {
        console.log('why???');
        console.log('123123123', error);
      });
  }

  // 전체 게시글 불러오기
  function refreshWholeArticleList() {
    console.log(articleStartIdx)

    axios
      .get(`${serverUrl}/scroll/board/all?amount=${articleStartIdx}&schoolId=${user.schoolId}&startIdx=${articleStartIdx - 5}`, {
        // headers: {
        //     Authorization: `JWT ${user.token}`,
        //   },
        params: {
          schoolId: user.schoolId, // user의 schoolId 받아서 넣기
        },
      })
      .then((res) => {
        console.log(articleStartIdx)
        console.log(res.data)
        setArticleStartIdx(articleStartIdx + 5)
        setwholeArticleList([]);
        setwholeArticleList(res.data);
        setMyloading(true);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  // 특정 게시판 게시글 불러오기
  function refreshCertainArticleList(data) {
    axios
      .get(`${serverUrl}/board/${data.id}/?userId=${user.id}`, {
        // headers: {
        //     Authorization: `JWT ${user.token}`,
        //   },
      })
      .then((res) => {
        // console.log(res.data)
        setCertainArticleList(res.data);
        setMyloading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function initHeader(data) {
    console.log(data, temp, tempId);
    if (temp === data.name) {
      setTemp(null);
      setTempId(null);
      setPressed(false);
      setMyloading(false);
      refreshWholeArticleList();
    } else {
      setTemp(data.name);
      setTempId(data.id);
      setPressed(true);
      setMyloading(false);
      refreshCertainArticleList(data);
    }
  }

  const [click, setClick] = useState(null);

  return (
    <View>
      {(temp === null,
        pressed === false && (
          <Header
            name={user.schoolName}
            pressed={pressed}
            navigation={navigation}
          />
        )) || (
          <Header
            name={temp}
            setClick={setClick}
            pressed={pressed}
            setTemp={setTemp}
            setPressed={setPressed}
            setMyloading={setMyloading}
            navigation={navigation}
            refreshWholeArticleList={refreshWholeArticleList}
          />
        )}

      {/* 무한스크롤 = Flatlist 인듯, 따라서 ScrollView를 Flatlist로 바꿔야함 */}
      <ScrollView
        style={{ marginBottom: 50 }}
        showsHorizontalScrollIndicator={false}>
        {(myLoading2 === true && (
          <ScrollView
            style={{ borderBottomWidth: 1, borderColor: '#dbdbdb' }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FavBoardList
              click={click}
              setClick={setClick}
              initHeader={initHeader}
              boardList={boardList}
            />
          </ScrollView>
        )) || (
            <View style={{ marginTop: 10, flex: 1, alignItems: 'center' }}>
              <Image
                source={require('../../components/PartBoard/Box/spiner.gif')}
                style={{ width: 50, height: 50 }}
              />
            </View>
          )}

        <View>
          {/* <PartBoard
            PartName="실시간 인기 글"
            pressed={pressed}
            myLoading={myLoading}
            setMyloading={setMyloading}
          /> */}
          {/* <PartBoard
            PartName="HOT 게시글"
            BoardId={tempId}
            pressed={true}
            myLoading={myLoading}
            setMyloading={setMyloading}
            wholeArticleList={wholeArticleList}
            certainArticleList={certainArticleList}
            navigation={navigation}
          /> */}
          <PartBoard
            PartName={temp}
            BoardId={tempId}
            pressed={pressed}
            myLoading={myLoading}
            setMyloading={setMyloading}
            wholeArticleList={wholeArticleList}
            certainArticleList={certainArticleList}
            navigation={navigation}
            refreshWholeArticleList={refreshWholeArticleList}
          />
          {/* <PartBoard PartName="즐겨찾는 게시판" /> */}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    margin: 3,
    borderRadius: 30,
    // paddingVertical: 10,
    backgroundColor: 'white',
  },
});
