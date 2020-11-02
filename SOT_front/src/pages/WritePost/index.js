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

        <View>
          <TextInput placeholder="내용"></TextInput>
        </View>

        <View>
          <TouchableOpacity onPress={addPost}>
            <Text>글 작성</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({


});

export default WritePost;
