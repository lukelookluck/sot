import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  View,
  Alert,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import SingleArticle from '../../components/PartBoard/SingleArticle';

import {CommonContext} from '../../context/CommonContext';
import AsyncStorage from '@react-native-community/async-storage';

export default function ({navigation, route}) {
  const {serverUrl, user, setUser} = useContext(CommonContext);
  const [searchTextInput, setSearchTextInput] = useState('');
  let textInput = '';
  const [loading, serLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [searchedList, setSearchedList] = useState([]);

  function searchArticle() {
    if (searchTextInput.length < 2) {
      Alert.alert(
        '검색어 확인',
        '두 글자 이상 입력해주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              textInput.focus();
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      setSearchedList([]);
      serLoading(true);
      axios
        .get(
          `${serverUrl}/searchtitlecontent?keyword=${searchTextInput}&schoolId=${user.schoolId}`,
        )
        .then((res) => {
          setDone(true);
          serLoading(false);
          console.log(res.data);
          setSearchedList(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            AsyncStorage.clear();
            alert('잘못된 요청입니다.');
          }
        });
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ff8000',
          borderBottomWidth: 1,
          borderBottomColor: '#df380f',
          height: 56,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 6.5,
          }}>
          <TouchableHighlight
            style={{padding: 3.5, borderRadius: 25}}
            onPress={() => navigation.goBack()}
            underlayColor="#dfdfdf">
            <Icon
              name="arrow-back-circle-outline"
              style={{color: 'white'}}
              size={32.5}
            />
          </TouchableHighlight>
          <TextInput
            placeholder="검색하기.."
            placeholderTextColor="white"
            style={{flex: 1, color: 'white', fontSize: 16}}
            autoFocus={true}
            returnKeyType="search"
            ref={(input) => {
              textInput = input;
            }}
            onChangeText={(text) => {
              setSearchTextInput(text);
            }}
            value={searchTextInput}
            onSubmitEditing={() => searchArticle()}
          />
          {searchTextInput.length > 0 && (
            <Icon
              name="close-outline"
              style={{color: 'white', padding: 10}}
              size={27.5}
              onPress={() => {
                textInput.clear();
                setSearchTextInput('');
                setSearchedList([]);
                setDone(false);
              }}
            />
          )}
        </View>
      </View>
      {(loading === true && (
        <View
          style={{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginTop: 5,
              color: '#858585',
              textAlign: 'center',
              fontSize: 15,
            }}>
            검색중...
          </Text>
          <Image
            source={require('../../components/PartBoard/Box/spiner.gif')}
            style={{width: 30, height: 30}}
          />
        </View>
      )) ||
        (searchedList.length > 0 &&
          searchedList.map((item, index) => (
            <View
              key={index}
              style={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
              <SingleArticle
                idx={index}
                article={item}
                navigation={navigation}></SingleArticle>
            </View>
          ))) ||
        (done === false && (
          <TouchableOpacity
            style={{
              paddingVertical: 90,
            }}
            activeOpacity={1}
            onPress={() => {
              textInput.blur();
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Icon
                name="search-outline"
                style={{color: '#858585', paddingVertical: 10}}
                size={100}
              />
              <Text
                style={{color: '#858585', textAlign: 'center', fontSize: 20}}>
                게시글을 검색ㅎr세요
              </Text>
            </View>
          </TouchableOpacity>
        )) || (
          <TouchableOpacity
            style={{
              paddingVertical: 90,
            }}
            activeOpacity={1}
            onPress={() => {
              textInput.blur();
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Icon
                name="sad-outline"
                style={{color: '#858585', paddingVertical: 10}}
                size={100}
              />
              <Text
                style={{color: '#858585', textAlign: 'center', fontSize: 20}}>
                검색 결과가 없습니다.
              </Text>
            </View>
          </TouchableOpacity>
        )}
    </ScrollView>
  );
}
