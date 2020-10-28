import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
      }}>
      <View>
        <Text style={{fontSize: 11}}>S.O.T</Text>
        <Text>{props.name}</Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        <Icon style={{marginRight: 15}} name="search-outline" size={30} />
        <Icon name="person-outline" size={30} />
      </View>
    </View>
  );
}
