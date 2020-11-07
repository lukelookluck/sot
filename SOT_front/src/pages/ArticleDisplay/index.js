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
    <View style={{backgroundColor: 'grey'}}>
      <View style={{backgroundColor: 'yellow'}}>
        <Icon name="person-circle" style={{fontSize: 30}} />
        <Text>{article.nickname}</Text>
        <Text>{getTime(article.created_at)}</Text>
      </View>
      <View style={{backgroundColor: 'green'}}>
        <Text>{article.title}</Text>
        <Text>{article.content}</Text>
      </View>
      <View style={{backgroundColor: 'skyblue', flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 7,
          }}>
          <Icon
            name="heart-outline"
            color="#ff8000"
            style={{fontSize: 15, marginRight: 2}}></Icon>
          <Text style={{fontSize: 11, color: '#ff8000'}}>
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
            style={{fontSize: 15, marginRight: 2}}></Icon>
          <Text style={{fontSize: 11, color: '#058AB3'}}>
            {article.commentsCnt}
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: 'orange'}}>
        <Text>댓글</Text>
      </View>

      <Text>aa</Text>
    </View>
  );
}
