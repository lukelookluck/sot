import React, { useContext } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonContext } from "../../context/CommonContext";

export default function Header(props) {

  const { serverUrl, user, setUser } = useContext(CommonContext);


  const onPress = () => {
    props.setPressed(false);
    props.setMyloading(false);
    props.setTemp(null);
    props.refreshWholeArticleList()
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        backgroundColor: '#ff8000',
        borderBottomWidth: 1,
        borderBottomColor: '#df380f',
        height: 56,
      }}>
      <View>
        {(props.pressed === true && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 6.5,
            }}>
            <TouchableHighlight
              style={{ padding: 3.5, borderRadius: 25 }}
              onPress={onPress}
              underlayColor="#dfdfdf">
              <Icon
                name="arrow-back-circle-outline"
                style={{ color: 'white' }}
                size={30}
              />
            </TouchableHighlight>
            <Text
              style={{
                paddingLeft: 5,
                color: 'white',
                fontWeight: '700',
                fontSize: 18,
              }}>
              {props.name}
            </Text>
          </View>
        )) || (
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'white' }}>SOT</Text>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>
                {props.name}
              </Text>
            </View>
          )}
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 5 }}>
        <View style={{ marginRight: 15 }}>
          <TouchableHighlight onPress={() => { }} underlayColor="#dfdfdf">
            <Icon style={{ color: 'white' }} name="search-outline" size={30} />
          </TouchableHighlight>
        </View>

        <View style={{}}>
          <TouchableHighlight onPress={() => props.navigation.navigate('MyPage')} underlayColor="#dfdfdf">
            <Icon style={{ color: 'white' }} name="person-outline" size={30} />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
