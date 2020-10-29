import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SingleArticle(props) {
  const onPress = () => console.log('1');
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor='#dfdfdf'>
      <View style={{
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
            marginVertical: 5
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Icon
              style={{ fontSize: 18, marginRight: 5 }}
              name="person"
              color='#77a6b7'
            />
            <Text style={{ fontSize: 13, fontWeight: '700' }}>유저명</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#9f9f9f', }}>날짜</Text>
        </View>

        {/* mid */}
        <View style={{ marginBottom: 0 }}>
          <Text style={{ fontSize: 13, fontWeight: "700" }}>게시글 제목</Text>
          <Text style={{ fontSize: 12 }}>게시글 내용</Text>
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
              fontWeight: '700'
            }}>
            게시판이름
        </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 7
              }}>
              <Icon
                name="heart-outline"
                color='#ff8000'
                style={{ fontSize: 15, marginRight: 2 }}
              ></Icon>
              <Text style={{ fontSize: 11, color: '#ff8000' }}>개수</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                name="chatbubbles-outline"
                color='#058AB3'
                style={{ fontSize: 15, marginRight: 2 }}
              ></Icon>
              <Text style={{ fontSize: 11, color: '#058AB3' }}>개수</Text>
            </View>

          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}




