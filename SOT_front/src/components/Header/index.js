import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home(props) {
  return (
    <View>
      <Text>S.O.T</Text>
      <Text>{props.name}</Text>
      <Icon name="ios-search-outline" size={30} />
    </View>
  );
}
