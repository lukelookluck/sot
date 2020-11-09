import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import {CommonContext} from '../../context/CommonContext';

export default function ({route}) {
  const {serverUrl, user, setUser} = useContext(CommonContext);
  const [article2, setArticle2] = useState([]);

  useEffect(() => {
    getArticleInfo();
  }, []);

  function getArticleInfo() {
    axios
      .get(
        `${serverUrl}/board/${route.params.article.boardId}/${route.params.article.id}`,
      )
      .then((res) => {
        setArticle2(res.data);
        console.log('??', res.data);
        // console.log(article);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  const article = route.params.article;
  const comments = article2.comments;

  function getTime(myTime) {
    let theTime = null;

    const now = new Date();
    const old = new Date(myTime);
    const gap = now - old;
    const sec_gap = Math.floor(gap / 1000);
    const min_gap = Math.floor(sec_gap / 60);
    const hour_gap = Math.floor(min_gap / 60);
    const day_gap = Math.floor(hour_gap / 24);
    const mon_gap = Math.floor(day_gap / 12);

    if (mon_gap >= 1) {
      theTime = mon_gap + '월 전';
    } else {
      if (day_gap >= 1) {
        theTime = day_gap + '일 전';
      } else {
        if (hour_gap >= 1) {
          theTime = hour_gap + '시간 전';
        } else {
          if (min_gap >= 1) {
            theTime = min_gap + '분 전';
          } else {
            if (sec_gap >= 1) {
              theTime = sec_gap + '초 전';
            } else {
              theTime = '등록 중';
            }
          }
        }
      }
    }
    return theTime;
  }

  function onPress() {
    console.log('좋아요1!');
    console.log('댓글', comments);
  }
  const [modalVisible, setModalVisible] = useState(false);
  let textInput = '';

  return (
    <View
      style={{
        paddingHorizontal: 10,
        // backgroundColor: 'white'
      }}>
      {/* 게시글 상단 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="person-circle" style={{fontSize: 40}} />
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: '700'}}>
              {article.nickname}
            </Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: '#5e5e5e'}}>
              {getTime(article.created_at)}
            </Text>
          </View>
        </View>
        <Icon name="ellipsis-vertical" style={{fontSize: 22.5}} />
      </View>
      {/* 게시글 중단(제목, 내용) */}
      <View style={{paddingVertical: 10}}>
        <Text style={{fontSize: 17.5, fontWeight: '700', marginVertical: 10}}>
          {article.title}
        </Text>
        <Text style={{fontSize: 14}}>{article.content}</Text>
      </View>
      {/* 게시글 하단(좋아요, 댓글) */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 2.5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 2,
          }}>
          <TouchableHighlight
            style={{
              borderRadius: 20,
            }}
            onPress={() => onPress()}
            underlayColor="#dfdfdf">
            <Icon
              name="heart-outline"
              color="#ff8000"
              style={{
                fontSize: 22.5,
                paddingVertical: 5,
                paddingHorizontal: 6,
                // backgroundColor: 'white',
                borderRadius: 20,
              }}
            />
          </TouchableHighlight>
          <Text
            style={{
              fontSize: 18,
              color: '#ff8000',
            }}>
            {article.likesCnt}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 2,
          }}>
          <TouchableHighlight
            style={{
              borderRadius: 20,
            }}
            onPress={() => onPress()}
            underlayColor="#dfdfdf">
            <Icon
              name="chatbubbles-outline"
              color="#058AB3"
              style={{
                fontSize: 22.5,
                paddingVertical: 5,
                paddingHorizontal: 6,
                // backgroundColor: 'white',
                borderRadius: 20,
              }}
            />
          </TouchableHighlight>
          <Text
            style={{
              fontSize: 18,
              color: '#058AB3',
            }}>
            {article.commentsCnt}
          </Text>
        </View>
      </View>
      {/* 게시글 최하단(댓글) */}
      <View style={{paddingVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
            }}>
            댓글
          </Text>
          <Text style={{fontSize: 15, marginHorizontal: 7}}>
            {article.commentsCnt}
          </Text>
        </View>
      </View>
      {/* 댓글 작성폼 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="person-circle" style={{fontSize: 40, color: '#ff8000'}} />
          <View
            style={{
              marginHorizontal: 5,
              flex: 1,
              flexDirection: 'column',
            }}>
            <Text
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                flex: 1,
                textAlignVertical: 'center',
                color: '#5e5e5e',
              }}>
              댓글 작성하기..
            </Text>
          </View>
          <Modal
            style={{
              margin: 0,
            }}
            animationIn="slideInUp"
            animationInTiming={500}
            animationOut="fadeOut"
            animationOutTiming={500}
            isVisible={modalVisible}
            useNativeDriver={true}
            // hideModalContentWhileAnimating={true}
            onShow={() => {
              textInput.focus();
            }}
            onBackdropPress={() => {
              setModalVisible(!modalVisible);
            }}
            onBackButtonPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                // backgroundColor: 'rgba(52, 52, 52, 0.5)',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Icon
                  name="person-circle"
                  style={{
                    fontSize: 40,
                    color: '#ff8000',
                  }}
                />
                <TextInput
                  multiline={true}
                  placeholder="댓글 작성하기.."
                  ref={(input) => {
                    textInput = input;
                  }}
                  blurOnSubmit={false}
                  style={{flex: 1, color: 'red', fontSize: 15}}
                />
                <TouchableHighlight
                  style={{
                    borderRadius: 20,
                  }}
                  onPress={() => onPress()}
                  underlayColor="#dfdfdf">
                  <Icon
                    name="paper-plane-outline"
                    color="#058AB3"
                    style={{
                      fontSize: 30,
                      paddingVertical: 5,
                      paddingHorizontal: 6,
                      // backgroundColor: 'white',
                      borderRadius: 20,
                    }}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      {/* 댓글목록 파트 */}
      <Text>댓글목록</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   centeredView: {},
//   modalView: {
//     // alignItems: 'center',
//   },
// });
