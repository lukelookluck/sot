import React, { useState, useEffect, useContext } from 'react';
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

import Icon from 'react-native-vector-icons/Ionicons';

export default function (props) {
  const [replyWord, setReplyWord] = useState(false)
  const [myIndex, setMyIndex] = useState(2);
  const [showReplysBool, setshowReplysBool] = useState(false);

  function moreComment() {
    setMyIndex(myIndex + 2);
    console.log(myIndex);
  }

  function switcher() {
    setshowReplysBool(!showReplysBool);
    console.log(showReplysBool);
  }

  let showReplys = null;
  if (!replyWord) {
    // console.log("폴스!!");
    if (myIndex < props.comment.length && props.comment.length > 2) {
      showReplys = (
        <TouchableHighlight
          style={{
            paddingVertical: 10,
            paddingLeft: 50
          }}
          onPress={() => moreComment()}
          underlayColor="#dfdfdf">
          <Text >
            이전 답글 {props.comment.length - myIndex}개 보기
        </Text>
        </TouchableHighlight>
      );
    }
    if (props.comment.length > 2 && myIndex >= props.comment.length) {
      // console.log("숨기기");
      showReplys = (
        <TouchableHighlight
          style={{
            paddingVertical: 10,
            paddingLeft: 50
          }}
          onPress={() => switcher()}
          underlayColor="#dfdfdf">
          <Text >
            답글 숨기기
          </Text>
        </TouchableHighlight>
      );
    }
  } else {
    console.log("트루");
    showReplys = (
      <TouchableHighlight
        style={{
          paddingVertical: 10,
          paddingLeft: 50
        }}
        onPress={() => switcher()}
        underlayColor="#dfdfdf">
        <Text onPress={() => switcher()}>
          답글 {props.comment.length}개 보기
      </Text>
      </TouchableHighlight>
    );
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



  let replys = props.comment.map((reply, idx) => {
    if (showReplysBool === false && idx < myIndex) {
      return (
        <View
          key={reply.id}
          style={{
            paddingVertical: 5,
            borderBottomWidth: 2,
            borderBottomColor: '#dbdbdb',
          }}>
          <View
            style={{
              paddingLeft: 50,
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
                style={{ fontSize: 40, color: '#919191' }}
              />
              <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 12,
                    color: '#5e5e5e',
                    paddingTop: 5,
                    paddingBottom: 2,
                  }}>
                  {reply.nickname}
                </Text>
                <Text style={{ fontSize: 13 }}>{reply.content}</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                  <Text style={{ fontSize: 12, color: '#5e5e5e' }}>
                    {getTime(reply.created_at)}
                  </Text>
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
      )
    }
  })




  return (
    <View>
      {/* <Text>11</Text> */}
      {/* {replyWord} */}
      {showReplys}
      {replys}
      {replyWord === true && (
        <View>
          <TouchableHighlight
            style={{
              paddingVertical: 10,
              paddingLeft: 50
            }}
            onPress={() => setReplyWord(!replyWord)}
            underlayColor="#dfdfdf">
            <Text>답글 숨기기..</Text>
          </TouchableHighlight>
          {/* {replys(props.comment)} */}
        </View>
      ) || (
          <TouchableHighlight
            style={{
              paddingVertical: 10
            }}
            onPress={() => setReplyWord(!replyWord)}
            underlayColor="#dfdfdf">
            <Text>답글  보기..</Text>

          </TouchableHighlight>
        )}
    </View>
  )
}