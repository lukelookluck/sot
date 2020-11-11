import React, { useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SingleArticle(props) {
  function onPress() {
    props.navigation.navigate('ArticleDisplay', {
      article: props.article,
      idx: props.idx,
    });
  }

  const [article, setArticle] = useState(props.article);

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
    <TouchableHighlight onPress={onPress} underlayColor="#dfdfdf">
      <View
        style={{
          // flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 7.5,
          paddingHorizontal: 10,
        }}>
        {/* top */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Icon
              style={{ fontSize: 18, marginRight: 5 }}
              name="person"
              color="#77a6b7"
            />
            <Text style={{ fontSize: 13, fontWeight: '700' }}>
              {article.nickname}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#9f9f9f' }}>
            {getTime(article.created_at)}
          </Text>
        </View>

        {/* mid */}
        <View style={{ marginBottom: 0 }}>
          <Text style={{ fontSize: 13, fontWeight: '700' }}>{article.title}</Text>
          <Text style={{ fontSize: 12 }}>{article.content}</Text>
        </View>

        {/* bottom */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#9f9f9f',
              fontSize: 11,
              fontWeight: '700',
            }}>
            {props.pressed === false && article.boardName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 7,
              }}>
              <Icon
                name="heart-outline"
                color="#ff8000"
                style={{ fontSize: 15, marginRight: 2 }}></Icon>
              <Text style={{ fontSize: 11, color: '#ff8000' }}>
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
                style={{ fontSize: 15, marginRight: 2 }}></Icon>
              <Text style={{ fontSize: 11, color: '#058AB3' }}>
                {article.commentsCnt}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
