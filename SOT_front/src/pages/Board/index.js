import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Board = ({navigation}) => {

  return (
    <ScrollView>
      <View>
        <Text>게시판</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('WritePost')}>
        <Text>글작성</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
});

export default Board;
