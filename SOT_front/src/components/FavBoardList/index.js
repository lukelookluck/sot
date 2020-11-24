import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function (props) {
  const favBoardList = props.favBoardList.map((data, idx) => {
    const [bg, setBg] = useState(false);

    function boardClick() {
      if (props.click === idx) {
        props.setClick(null);
        setBg(true);
      } else {
        props.setClick(idx);
        setBg(true);
      }
    }
    return (
      <View key={data.id}>
        <TouchableHighlight
          onPress={(e) => {
            props.initHeader(data);
            boardClick();
          }}
          activeOpacity={0.6}
          underlayColor="#dfdfdf">
          <View
            style={{
              padding: 7,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                props.click === idx && bg === true ? '#FACA0F' : null,
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#ff8000', '#ffff57']}
              style={{
                borderRadius: 30,
              }}>
              <Icon
                name="star-outline"
                color="#058AB3"
                style={{
                  fontSize: 40,
                  paddingHorizontal: 5,
                  paddingVertical: 2.5,
                  margin: 3,
                  borderRadius: 30,
                  // paddingVertical: 10,
                  backgroundColor: 'white',
                }}
              />
            </LinearGradient>
            {(data.name.length > 7 && (
              <Text
                style={{
                  fontSize: 12,
                }}>
                {data.name.substring(0, 6) + '..'}
              </Text>
            )) || (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight:
                    props.click === idx && bg === true ? '700' : '400',
                }}>
                {data.name}
              </Text>
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  });

  return (
    <View style={{flexDirection: 'row', paddingLeft: 10}}>{favBoardList}</View>
  );
}
