import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
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
import {CommonContext} from "../../context/CommonContext";

const MyPage = (navigation) => {

  const { serverUrl, user, setUser } = useContext(CommonContext);

  

  return (
    <ScrollView>
      <View>
        <Text>살려줘요</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({


});

export default MyPage;
