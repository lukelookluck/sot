import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import PartBoard from '../../components/PartBoard/Box';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function Home() {
  const [temp, setTemp] = useState(null);
  const [pressed, setPressed] = useState(false);

  const data = [
    {
      key: '1',
      name: '자유게시판',
    },
    {
      key: '2',
      name: '1학년 게시판',
    },
    {
      key: '3',
      name: '2학년 게시판',
    },
    {
      key: '4',
      name: '3학년 게시판',
    },
    {
      key: '5',
      name: '모의고사 게시판',
    },
  ];

  const a = data.map((data) => {
    return (
      <View key={data.key} style={{}}>
        <TouchableHighlight
          onPress={() => {
            alert(data.name);
            if (temp === data.name) {
              setTemp(null);
              setPressed(false);
            } else {
              setTemp(data.name);
              setPressed(true);
            }
          }}
          activeOpacity={0.6}
          underlayColor="#dfdfdf">
          <View
            style={{
              margin: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#ff8000', '#ffff57']}
              style={{
                borderRadius: 30,
              }}>
              <Icon
                name="people-outline"
                color="#058AB3"
                style={{
                  fontSize: 40,
                  padding: 5,
                  margin: 3,
                  borderRadius: 30,
                  // paddingVertical: 10,
                  backgroundColor: 'white',
                }}></Icon>
            </LinearGradient>
            {(data.name.length > 7 && (
              <Text
                style={{
                  fontSize: 12,
                }}>
                {data.name.substring(0, 6) + '..'}
              </Text>
            )) || (
              <Text
                style={{
                  fontSize: 12,
                }}>
                {data.name}
              </Text>
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  });

  return (
    <View>
      {(temp === null, pressed === false && <Header name="경북대학교" />) || (
        <Header name={temp} />
      )}

      {/* 무한스크롤 = Flatlist 인듯, 따라서 ScrollView를 Flatlist로 바꿔야함 */}
      <ScrollView
        style={{marginBottom: 50}}
        showsHorizontalScrollIndicator={false}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>{a}</View>
        </ScrollView>

        <View>
          <PartBoard PartName={temp} />
          <Text>{temp}</Text>
          {{temp} !== null && <Text>adas</Text>}
          <PartBoard PartName="즐겨찾는 게시판" />
          <PartBoard PartName="실시간 인기 글" />
          <PartBoard PartName="HOT 게시글" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    margin: 3,
    borderRadius: 30,
    // paddingVertical: 10,
    backgroundColor: 'white',
  },
});
