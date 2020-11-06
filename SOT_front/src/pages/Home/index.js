import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import PartBoard from '../../components/PartBoard/Box';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {CommonContext} from '../../context/CommonContext';

export default function Home({navigation}) {
  const {serverUrl, user, setUser} = useContext(CommonContext);

  const [temp, setTemp] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [myLoading, setMyloading] = useState(false);

  const [boardList, setBoardList] = useState([]);

  // 전체게시글
  const [wholeArticleList, setwholeArticleList] = useState([]);
  // 특정게시글
  const [certainArticleList, setCertainArticleList] = useState([]);

  useEffect(() => {
    refreshBoardList();
    refreshWholeArticleList();
  }, []);

  // 게시판 리스트 불러오기
  function refreshBoardList() {
    axios
      .get(`${serverUrl}/boards`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
        params: {
          id: user.schoolId, // user의 schoolId 받아서 넣기
        },
      })
      .then((response) => {
        // console.log('here????');
        // console.log(response.data);
        setBoardList(response.data);
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
        console.log(res.data);
        setwholeArticleList(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  // 특정 게시판 게시글 불러오기
  function refreshCertainArticleList(data) {
    axios
      .get(`${serverUrl}/board/${data.id}`, {
        // headers: {
        //     Authorization: `JWT ${user.token}`,
        //   },
      })
      .then((res) => {
        // console.log(res.data);
        setCertainArticleList(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  function initHeader(data) {
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
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
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
      pressed === false && <Header name="경북대학교" pressed={pressed} />) || (
        <Header
          name={temp}
          pressed={pressed}
          setTemp={setTemp}
          setPressed={setPressed}
          setMyloading={setMyloading}
        />
      )}

      {/* 무한스크롤 = Flatlist 인듯, 따라서 ScrollView를 Flatlist로 바꿔야함 */}
      <ScrollView
        style={{marginBottom: 50}}
        showsHorizontalScrollIndicator={false}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>{a}</View>
        </ScrollView>

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
