import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ff8000',
        borderBottomWidth: 1,
        borderBottomColor: '#df380f',
      }}>
      <View>
        <Text style={{fontSize: 12, color: 'white'}}>S.O.T</Text>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
          {props.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        <View style={{marginRight: 15}}>
          <TouchableHighlight onPress={() => {}} underlayColor="#dfdfdf">
            <Icon style={{color: 'white'}} name="search-outline" size={30} />
          </TouchableHighlight>
        </View>

        <View style={{}}>
          <TouchableHighlight onPress={() => {}} underlayColor="#dfdfdf">
            <Icon style={{color: 'white'}} name="person-outline" size={30} />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
