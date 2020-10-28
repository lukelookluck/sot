import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/Header';

export default function Home() {
  return (
    <View>
      <Header
        name="경북대학교"
        style={{position: 'absolute', top: 0, height: 30}}
      />
      <View style={{marginTop: 30}}>
        <Text>아아아아아asdasd</Text>
      </View>
    </View>
  );
}
