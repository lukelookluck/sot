import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import Header from '../../components/Header';
import PartBoard from '../../components/PartBoard/Box'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


export default function Home() {
  const a = (
    <View>
      <TouchableHighlight
        onPress={() => { }}
        underlayColor='#dfdfdf'
        style={{
          // margin: 3,
          // borderRadius: 30,
          // paddingVertical: 10,
          // backgroundColor: 'white',
        }}
      >
        <View
          style={{
            margin: 7,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ff8000', '#ffff57']}
            style={{
              // marginLeft: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}
          >
            <Icon
              name="people-outline"
              color='#058AB3'
              style={{
                fontSize: 40,
                padding: 5,
                margin: 3,
                borderRadius: 30,
                // paddingVertical: 10,
                backgroundColor: 'white'
              }}
            ></Icon>


          </LinearGradient>

        </View>

      </TouchableHighlight>

      {/* <View style={{ marginLeft: 15, borderColor: '#ff8000', borderWidth: 3, borderRadius: 30 }}>
        <Icon
          name="people-outline"
          color='#058AB3'
          style={{ fontSize: 40, padding: 5 }}
        ></Icon>
      </View> */}
    </View>
  )

  return (
    <View>
      <Header
        name="경북대학교"
        style={{ position: 'absolute', top: 0, height: 30 }}
      />
      <ScrollView
        horizontal={true}
        style={{ marginLeft: 10 }}
      >
        <View style={{ flexDirection: 'row' }}>
          {a}{a}{a}{a}{a}{a}
        </View>

      </ScrollView>

      <View

      >
        <PartBoard PartName='즐겨찾는 게시판' />
        <PartBoard PartName='실시간 인기 글' />
        <PartBoard PartName='HOT 게시글' />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    margin: 3,
    borderRadius: 30,
    // paddingVertical: 10,
    backgroundColor: 'white',
  }
});