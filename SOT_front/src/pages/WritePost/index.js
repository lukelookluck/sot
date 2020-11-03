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

const WritePost = ({navigation}) => {
  const addPost = () => {};

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.screen}>
        <View>
          <TextInput placeholder="제목"></TextInput>
        </View>

        <View style={styles.detailbox}>
          <TextInput placeholder="내용"></TextInput>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={addPost} style={styles.btn}>
            <Text style={{fontSize: 18, color: 'white'}}>글 작성</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  detailbox: {
    height: 300,
  },

  btn: {
    width: 90,
    height: 40,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});

export default WritePost;
