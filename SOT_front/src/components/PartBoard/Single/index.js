import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Single(props) {
  const onPress = () => console.log('1');
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor='#dfdfdf'>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 7.5,
        paddingHorizontal: 10,
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 13, marginRight: 10, fontWeight: "700" }}>{props.BoardName}</Text>
          <Text style={{ fontSize: 13 }}>게시글 OOO</Text>
        </View>
        <View>
          <Text style={{ backgroundColor: '#ff8000', color: '#ffffff', paddingHorizontal: 3.5, borderRadius: 4, fontSize: 10, fontWeight: '700' }}>
            N
        </Text>
        </View>
      </View>

    </TouchableHighlight>
  );
}




