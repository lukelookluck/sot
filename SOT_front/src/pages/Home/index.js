import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import PartBoard from '../../components/PartBoard/Box'

export default function Home() {
  return (
    <View>
      <Header
        name="경북대학교"
        style={{ position: 'absolute', top: 0, height: 30 }}
      />
      <View style={{ marginTop: 30 }}>
        <Text>키킼ㅋ키키키키aa킼ㅋ</Text>
      </View>
      <View

      >
        <PartBoard PartName='즐겨찾는 게시판' />
        <PartBoard PartName='실시간 인기 글' />
        <PartBoard PartName='HOT 게시글' />

      </View>
    </View>
  );
}
