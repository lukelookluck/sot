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
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { CommonContext } from '../../context/CommonContext';
import SingleArticle from '../../components/PartBoard/SingleArticle';


export default function Home({ navigation }) {
  const { serverUrl, user, setUser } = useContext(CommonContext);

  const [temp, setTemp] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [myLoading, setMyloading] = useState(false);
  const [myLoading2, setMyloading2] = useState(false);


  const [boardList, setBoardList] = useState([]);

  // 전체게시글
  const [wholeArticleList, setwholeArticleList] = useState([]);
  // 특정게시글
  const [certainArticleList, setCertainArticleList] = useState([]);


  useEffect(() => {
    refreshFavBoardList();
    refreshWholeArticleList();
    navigation.addListener('focus', () => {
      refreshFavBoardList();
      refreshWholeArticleList();
    });
  }, []);

  // 즐찾 게시판 리스트 불러오기
  function refreshFavBoardList() {
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
        setBoardList(response.data);
        setMyloading2(true);

      })
      .catch((error) => {
        console.log('why???');
        console.log(error);
      });
  }

  // 전체 게시글 불러오기
  function refreshWholeArticleList() {
    axios
      .get(`${serverUrl}/board/all`, {
        // headers: {
        //     Authorization: `JWT ${user.token}`,
        //   },
        params: {
          schoolId: user.schoolId, // user의 schoolId 받아서 넣기
        },
      })
      .then((res) => {
        setwholeArticleList([])
        console.log("전체 새로고침", res.data);
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
        console.log(res.data)
        setCertainArticleList(res.data);
        setMyloading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function initHeader(data) {
    console.log(data)
    if (temp === data.name) {
      setTemp(null);
      setPressed(false);
      setMyloading(false);
      refreshWholeArticleList();
    } else {
      setTemp(data.name);
      setPressed(true);
      setMyloading(false);
      refreshCertainArticleList(data);
    }
  }

  const a = boardList.map((data) => {
    return (
      <View key={data.id} style={{}}>
        <TouchableHighlight
          onPress={() => {
            initHeader(data);
          }}
          activeOpacity={0.6}
          underlayColor="#dfdfdf">
          <View
            style={{
              margin: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#ff8000', '#ffff57']}
              style={{
                borderRadius: 30,
              }}>
              <Icon
                name="star-outline"
                color="#058AB3"
                style={{
                  fontSize: 40,
                  paddingHorizontal: 5,
                  paddingVertical: 2.5,
                  margin: 3,
                  borderRadius: 30,
                  // paddingVertical: 10,
                  backgroundColor: 'white',
                }}></Icon>
            </LinearGradient>
            {(data.name.length > 7 && (
              <Text
                style={{
                  fontSize: 12,
                }}>
                {data.name.substring(0, 6) + '..'}
              </Text>
            )) || (
                <Text
                  style={{
                    fontSize: 12,
                  }}>
                  {data.name}
                </Text>
              )}
          </View>
        </TouchableHighlight>
      </View>
    );
  });

  return (
    <View>
      {(temp === null,
        pressed === false && <Header name={user.schoolName} pressed={pressed} navigation={navigation} />) || (
          <Header
            name={temp}
            pressed={pressed}
            setTemp={setTemp}
            setPressed={setPressed}
            setMyloading={setMyloading}
            navigation={navigation}
          />
        )}

      {/* 무한스크롤 = Flatlist 인듯, 따라서 ScrollView를 Flatlist로 바꿔야함 */}
      <ScrollView
        style={{ marginBottom: 50 }}
        showsHorizontalScrollIndicator={false}>
        {(myLoading2 === true && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>{a}</View>
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
          />
          <PartBoard
            PartName="HOT 게시글"
            pressed={pressed}
            myLoading={myLoading}
            setMyloading={setMyloading}
          /> */}
          <PartBoard
            PartName={temp}
            pressed={pressed}
            myLoading={myLoading}
            setMyloading={setMyloading}
            wholeArticleList={wholeArticleList}
            certainArticleList={certainArticleList}
            navigation={navigation}
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
