import React, { useState, useEffect, useContext } from 'react';
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
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import { CommonContext } from '../../context/CommonContext';
import CommentList from '../../components/CommentList'

export default function ({ navigation, route }) {
  const { serverUrl, user, setUser } = useContext(CommonContext);



  return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
      <View
        style={{
          paddingHorizontal: 10,
          // backgroundColor: 'white'
        }}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}>
          <Text>고백</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

