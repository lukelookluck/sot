import React, {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ({route}) {
  console.log('정보!!', route.params.article);
  const article = route.params.article;

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

  return (
    <View style={{backgroundColor: 'grey', paddingHorizontal: 10}}>
      {/* 게시글 상단 */}
      <View
        style={{
          backgroundColor: 'yellow',
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
            <Text style={{fontSize: 13, fontWeight: '500', color: '#6b6b6b'}}>
              {getTime(article.created_at)}
            </Text>
          </View>
        </View>
        <Icon name="ellipsis-vertical" style={{fontSize: 22.5}} />
      </View>
      {/* 게시글 중단(제목, 내용) */}
      <View style={{backgroundColor: 'green', paddingVertical: 10}}>
        <Text style={{fontSize: 17.5, fontWeight: '700', marginVertical: 10}}>
          {article.title}
        </Text>
        <Text style={{fontSize: 14}}>{article.content}</Text>
      </View>
      {/* 게시글 하단(좋아요, 댓글) */}
      <View
        style={{
          backgroundColor: 'skyblue',
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 7,
          }}>
          <Icon
            name="heart-outline"
            color="#ff8000"
            style={{
              fontSize: 25,
              marginHorizontal: 5,
            }}></Icon>
          <Text style={{fontSize: 17.5, color: '#ff8000'}}>
            {article.likesCnt}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Icon
            name="chatbubbles-outline"
            color="#058AB3"
            style={{fontSize: 25, marginHorizontal: 5}}></Icon>
          <Text style={{fontSize: 17.5, color: '#058AB3'}}>
            {article.commentsCnt}
          </Text>
        </View>
      </View>
      {/* 게시글 최하단(댓글) */}
      <View style={{backgroundColor: 'orange'}}>
        <Text>댓글</Text>
      </View>

      <Text>aa</Text>
    </View>
  );
}
