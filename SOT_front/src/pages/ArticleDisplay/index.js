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
import CommentList from '../../components/CommentList';

export default function ({navigation, route}) {
  const {serverUrl, user, setUser} = useContext(CommonContext);
  const [article, setArticle] = useState(route.params.article);
  useEffect(() => {
    getArticleInfo();
  }, []);

  // 게시글 조회
  function getArticleInfo() {
    axios
      .get(
        `${serverUrl}/board/${route.params.article.boardId}/${route.params.article.id}?userId=${user.id}`,
      )
      .then((res) => {
        setArticle([]);
        setArticle(res.data);
      })
      .catch((err) => {
        // console.log(err.data);
      });
  }

  // 답글폼 띄우기
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

  const comments = article.comments || [];

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

  // 댓글 작성
  function goComment() {
    // 답글
    if (replyId) {
      axios
        .post(
          `${serverUrl}/board/${article.boardId}/${article.id}/${replyId}/?content=${textInput2}&userId=${user.id}`,
        )
        .then((res) => {
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
        setModalVisible(false);
        setIsReply(false);
        setTextInput2(null);
        getArticleInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 게시글 좋아요
  function likeArticle(data) {
    axios
      .post(
        `${serverUrl}/board/${article.boardId}/${data.id}/like?userId=${user.id}`,
      )
      .then((res) => {
        // console.log(res)
        if (data.isLiked === true) {
          setArticle({
            ...data,
            likesCnt: data.likesCnt - 1,
            isLiked: !data.isLiked,
          });
        } else {
          setArticle({
            ...data,
            likesCnt: data.likesCnt + 1,
            isLiked: !data.isLiked,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 게시글 삭제
  function deleteArticle(data) {
    setModalVisible2(false);
    Alert.alert(
      '삭제 확인',
      '해당 게시글이 삭제됩니다.',
      [
        {
          text: '취소',
        },
        {
          text: '삭제',
          onPress: () => {
            navigation.goBack();
            // console.log(data)
            axios
              .delete(`${serverUrl}/board/${data.boardId}/${data.id}`)
              .then((res) => {})
              .catch((err) => {});
          },
        },
      ],
      {cancelable: true},
    );
  }

  function reviseArticle(data) {
    console.log(data);
    setModalVisible2(false);

    navigation.navigate('WritePost', {
      boardname: route.params.article.boardName,
      boardid: data.boardId,
      articleId: data.id,
      content: data.content,
      title: data.title,
    });
  }

  // 댓글작성폼 관련
  const [modalVisible, setModalVisible] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replyId, setReplyId] = useState(null);
  const [textInput2, setTextInput2] = useState(null);
  let textInput = '';

  // 게시글 수정/삭제 모달 관련
  const [modalVisible2, setModalVisible2] = useState(false);

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
          {article.userId === user.id && (
            <TouchableHighlight
              style={{
                borderRadius: 20,
              }}
              onPress={() => setModalVisible2(true)}
              underlayColor="#dfdfdf">
              <Icon
                name="ellipsis-vertical"
                style={{
                  fontSize: 22.5,
                  paddingVertical: 4,
                  paddingHorizontal: 5,
                }}
              />
            </TouchableHighlight>
          )}
          {/* 수정/삭제 모달 */}
          <Modal
            style={{
              margin: 0,
            }}
            animationIn="slideInUp"
            animationInTiming={500}
            animationOut="fadeOut"
            animationOutTiming={500}
            isVisible={modalVisible2}
            useNativeDriver={true}
            // hideModalContentWhileAnimating={true}
            // onModalShow={() => {
            //   textInput.focus();
            // }}
            onBackdropPress={() => {
              setModalVisible2(false);
            }}
            onBackButtonPress={() => {
              setModalVisible2(false);
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
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                <TouchableHighlight
                  onPress={() => {
                    reviseArticle(article);
                  }}
                  underlayColor="#dfdfdf"
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: 15,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Icon
                      name="build"
                      color="#ff8000"
                      style={{
                        fontSize: 27.5,
                        marginVertical: 5,
                        marginLeft: 10,
                        marginRight: 25,
                        borderRadius: 20,
                      }}
                    />
                    <Text style={{fontSize: 19.5, color: 'black'}}>수정</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    deleteArticle(article);
                  }}
                  underlayColor="#dfdfdf"
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: 15,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Icon
                      name="trash"
                      color="#ff8000"
                      style={{
                        fontSize: 27.5,
                        marginVertical: 5,
                        marginLeft: 10,
                        marginRight: 25,
                        borderRadius: 20,
                      }}
                    />
                    <Text style={{fontSize: 19.5, color: 'black'}}>삭제</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
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
            {(article.isLiked === false && (
              <TouchableHighlight
                style={{
                  borderRadius: 20,
                }}
                onPress={() => {
                  likeArticle(article);
                }}
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
            )) || (
              <TouchableHighlight
                style={{
                  borderRadius: 20,
                }}
                onPress={() => likeArticle(article)}
                underlayColor="#dfdfdf">
                <Icon
                  name="heart"
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
            )}
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
                      style={{flex: 1, color: 'black', fontSize: 15}}
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
        <CommentList
          comments={comments}
          boardId={article.boardId}
          writeReply={writeReply}
        />
      </View>
    </ScrollView>
  );
}
