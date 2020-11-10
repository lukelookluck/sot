import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import {CommonContext} from '../../context/CommonContext';

export default function ({route}) {
  const {serverUrl, user, setUser} = useContext(CommonContext);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticleInfo();
  }, []);

  function getArticleInfo() {
    axios
      .get(
        `${serverUrl}/board/${route.params.article.boardId}/${route.params.article.id}`,
      )
      .then((res) => {
        setArticle(res.data);
        // console.log(article);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  const comments = article.comments || [];
  console.log(article);

  function writeReply(data) {
    Alert.alert(
      '답글을 작성하시겠습니까?',
      '',
      [
        {
          text: '아니요',
        },
        {
          text: '네',
          onPress: () => {
            setModalVisible(true);
            setIsReply(true);
            setReplyId(data.id);
          },
        },
      ],
      {cancelable: true},
    );
  }

  const comments2 = comments.map((comment) => {
    return (
      <View
        key={comment.id}
        style={{
          paddingVertical: 5,
          borderBottomWidth: 2,
          borderBottomColor: '#dbdbdb',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Icon
              name="person-circle"
              style={{fontSize: 40, color: '#919191'}}
            />
            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 12,
                  color: '#5e5e5e',
                  paddingTop: 5,
                  paddingBottom: 2,
                }}>
                {comment.nickname}
              </Text>
              <Text style={{fontSize: 13}}>{comment.content}</Text>
              <View style={{flexDirection: 'row', paddingVertical: 5}}>
                <Text style={{fontSize: 12, color: '#5e5e5e'}}>
                  {getTime(comment.created_at)}
                </Text>

                <TouchableOpacity
                  style={{
                    marginLeft: 15,
                  }}
                  onPress={() => writeReply(comment)}
                  activeOpacity={1}>
                  <Text style={{fontSize: 12, color: '#5e5e5e'}}>
                    답글 달기..
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
        </View>
      </View>
    );
  });

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

  function goComment() {
    if (replyId) {
      axios
        .post(
          `${serverUrl}/board/${article.boardId}/${article.id}/${replyId}/?content=${textInput2}&userId=${user.id}`,
        )
        .then((res) => {
          console.log(res);
          setModalVisible(false);
          setIsReply(false);
          setTextInput2(null);
          setReplyId(null);
          getArticleInfo();
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .post(
        `${serverUrl}/board/${article.boardId}/${article.id}/?content=${textInput2}&userId=${user.id}`,
      )
      .then((res) => {
        console.log(res.data);
        setModalVisible(false);
        setIsReply(false);
        setTextInput2(null);
        getArticleInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replyId, setReplyId] = useState(null);

  const [textInput2, setTextInput2] = useState(null);
  let textInput = '';

  return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
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
          <TouchableHighlight
            style={{
              borderRadius: 20,
            }}
            onPress={() => onPress()}
            underlayColor="#dfdfdf">
            <Icon
              name="ellipsis-vertical"
              style={{fontSize: 22.5, paddingVertical: 4, paddingHorizontal: 5}}
            />
          </TouchableHighlight>
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
            borderBottomWidth: 2,
            borderBottomColor: '#dbdbdb',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="person-circle"
              style={{fontSize: 40, color: '#ff8000'}}
            />
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
              onModalShow={() => {
                textInput.focus();
              }}
              onBackdropPress={() => {
                setModalVisible(false);
                setIsReply(false);
                setTextInput2(null);
              }}
              onBackButtonPress={() => {
                setModalVisible(false);
                setIsReply(false);
                setTextInput2(null);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  // backgroundColor: 'rgba(52, 52, 52, 0.5)',
                }}>
                {isReply === true && (
                  <View
                    style={{
                      backgroundColor: '#b0b0b0',
                      padding: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 14, color: '#414141'}}>
                      답글 남기는 중...
                    </Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        setIsReply(false);
                        setModalVisible(false);
                        setTextInput2(null);
                      }}>
                      <Text style={{fontSize: 14, color: '#414141'}}>취소</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
                  {(isReply === false && (
                    <TextInput
                      multiline={true}
                      placeholder="댓글 작성하기.."
                      ref={(input) => {
                        textInput = input;
                      }}
                      style={{flex: 1, color: 'red', fontSize: 15}}
                      onChangeText={(text) => {
                        setTextInput2(text);
                      }}
                      value={textInput2}
                    />
                  )) || (
                    <TextInput
                      multiline={true}
                      placeholder="답글 작성하기.."
                      ref={(input) => {
                        textInput = input;
                      }}
                      style={{flex: 1, color: 'red', fontSize: 15}}
                      onChangeText={(text) => {
                        setTextInput2(text);
                      }}
                      value={textInput2}
                    />
                  )}
                  {(textInput2 && (
                    <TouchableHighlight
                      style={{
                        borderRadius: 20,
                      }}
                      onPress={() => goComment()}
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
                  )) || <Text></Text>}
                </View>
              </View>
            </Modal>
          </View>
        </View>
        {/* 댓글목록 파트 */}
        {comments2}
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   centeredView: {},
//   modalView: {
//     // alignItems: 'center',
//   },
// });
