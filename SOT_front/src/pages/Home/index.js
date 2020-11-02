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
  const [temp, setTemp] = useState('게시판1');

  function a(data) {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            alert(data);
            setTemp(data);
          }}
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
            <Text
              style={{
                fontSize: 12,
              }}>
              {data}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View>
      <Header name="경북대학교" />

      {/* 무한스크롤 = Flatlist 인듯, 따라서 ScrollView를 Flatlist로 바꿔야함 */}
      <ScrollView
        style={{marginBottom: 50}}
        showsHorizontalScrollIndicator={false}>
        <ScrollView
          horizontal={true}
          style={{marginLeft: 10}}
          showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {a('게시판1')}
            {a('게시판2')}
            {a('게시판3')}
            {a('게시판4')}
            {a('게시판5')}
            {a('게시판6')}
          </View>
        </ScrollView>

        <View>
          <PartBoard PartName={temp} />
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
