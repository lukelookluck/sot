import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  View,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import {CommonContext} from '../../context/CommonContext';
import ReplyList from '../../components/ReplyList';

export default function (props) {
  const {serverUrl, user, setUser} = useContext(CommonContext);
  useEffect(() => {
    getArticleInfo();
  }, []);

  if (props.rFCmt === true) {
    getArticleInfo()
  }

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

  const [bC,setBC] = useState(props.comments)

  function getArticleInfo() {
    axios
      .get(
        `${serverUrl}/board/${props.article.boardId}/${props.article.id}?userId=${user.id}`,
      )
      .then((res) => {
        props.setRFCmt(false)
        setBC([]);
        setBC(res.data.comments);
      })
      .catch((err) => {
        // console.log(err.data);
      });
  }




  const comments = bC.map((comment, idx) => {

    function likeComment(data) {
      axios
        .post(
          `${serverUrl}/board/${props.boardId}/${data.articleId}/${data.id}/like?userId=${user.id}`,
        )
        .then((res) => {
          if (comment.isLiked === true) {
            // setLike(false);
            // setLikeCnt(likeCnt - 1);
            bC[idx] = {...bC[idx], isLiked: !bC[idx].isLiked, likesCnt: bC[idx].likesCnt -1}
            setBC([])
            setBC(bC)

          } else {
            // setLike(true);
            // setLikeCnt(likeCnt + 1);
            bC[idx] = {...bC[idx], isLiked: !bC[idx].isLiked, likesCnt: bC[idx].likesCnt +1}
            setBC([])
            setBC(bC)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
      <View
        key={comment.id}
        style={{
          paddingTop: 5,
          borderBottomWidth: 2,
          borderBottomColor: '#dbdbdb',
        }}>
        <Pressable
          onLongPress={() => {
            props.setModalVisible3(true);
            props.setMyComment(comment);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'red'
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            <Icon
              name="person-circle"
              style={{fontSize: 40, color: '#919191'}}
            />
            <View style={{flexDirection: 'column', marginLeft: 5, flex: 1}}>
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
                {(comment.likesCnt > 0 && (
                  <Text
                    style={{marginRight: 10, fontSize: 12, color: '#5e5e5e'}}>
                    좋아요 {comment.likesCnt}개
                  </Text>
                )) || <Text></Text>}
                <Text style={{fontSize: 12, color: '#5e5e5e'}}>
                  {getTime(comment.created_at)}
                </Text>

                <TouchableOpacity
                  style={{
                    marginLeft: 15,
                  }}
                  onPress={() => props.writeReply(comment)}
                  activeOpacity={1}>
                  <Text style={{fontSize: 12, color: '#5e5e5e'}}>
                    답글 달기..
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {(comment.isLiked === false && (
            <TouchableHighlight
              style={{
                borderRadius: 20,
              }}
              onPress={() => {
                likeComment(comment);
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
              onPress={() => likeComment(comment)}
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
        </Pressable>
        <ReplyList
          comment={comment.replies}
          boardId={props.boardId}
          modalVisible3={props.modalVisible3}
          setModalVisible3={props.setModalVisible3}
          setMyComment={props.setMyComment}
        />
      </View>
    );
  });
  // }

  return <View>{comments}</View>;
}
