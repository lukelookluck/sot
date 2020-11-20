import React, {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import PartBoardSingle from '../Single';
import SingleArticle from '../SingleArticle';
import {CommonContext} from '../../../context/CommonContext';

export default function PartBoard(props) {
  const {
    serverUrl,
    user,
    setUser,
    articleStartIdx,
    setArticleStartIdx,
  } = useContext(CommonContext);

  function onPress() {
    props.setClick(null);
    props.navigation.navigate('Board', {
      name: props.PartName,
      id: props.BoardId,
      u_id: user.id,
      isRe: 'no',
    });
  }

  return (
    <View>
      {(props.myLoading === true && (
        <View>
          <View
            style={{
              justifyContent: 'center',
              margin: 10,
              paddingVertical: 10,
              borderWidth: 2,
              borderColor: '#dbdbdb',
              borderRadius: 8,
            }}>
            {(props.pressed === true && (
              <View>
                <TouchableHighlight
                  onPress={() => onPress()}
                  underlayColor="#dfdfdf">
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      {props.PartName}
                    </Text>
                    <Text style={{color: '#ff8000'}}>더 보기</Text>
                  </View>
                </TouchableHighlight>
                {props.certainArticleList.map((article, idx) => (
                  <View key={idx}>
                    <SingleArticle
                      idx={idx}
                      article={article}
                      pressed={props.pressed}
                      navigation={props.navigation}
                    />
                  </View>
                ))}
              </View>
            )) || (
              <View>
                {props.wholeArticleList.map((article, idx) => (
                  <View key={article.id}>
                    <SingleArticle
                      idx={idx}
                      article={article}
                      pressed={props.pressed}
                      navigation={props.navigation}
                    />
                  </View>
                ))}
                {(props.moreLoading === true && (
                  <TouchableHighlight
                    onPress={() => {
                      props.moreArticles(articleStartIdx + 10);
                      props.setMoreloading(false);
                    }}
                    underlayColor="#dfdfdf">
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 20,
                        paddingHorizontal: 10,
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        {props.PartName}
                      </Text>
                      <Text style={{color: '#ff8000'}}>게시글 더 보기</Text>
                    </View>
                  </TouchableHighlight>
                )) ||
                  (props.moreLoading === false && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('./spiner.gif')}
                        style={{width: 70, height: 70}}
                      />
                    </View>
                  )) || (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 40,
                      }}>
                      <Text
                        style={{
                          fontSize: 14.5,
                          color: '#414141',
                        }}>
                        게시글이 없어요..ㅠ
                      </Text>
                    </View>
                  )}
              </View>
            )}
          </View>
        </View>
      )) || (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('./spiner.gif')}
            style={{width: 100, height: 100}}
          />
        </View>
      )}
    </View>
  );
}
