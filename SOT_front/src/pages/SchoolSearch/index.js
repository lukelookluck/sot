import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {SearchBar, Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from '../../context/CommonContext';

const SchoolSearch = ({navigation}) => {
  const [key, setKey] = useState('');
  const [userSchoolId, setUserSchoolId] = useState('');
  const [searchList, setSearchList] = useState([]);

  const {serverUrl} = useContext(CommonContext);

  const onSearchHandler = (text) => {
    setKey(text);

    axios
      .get(`${serverUrl}/search`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
        params: {
          keyword: text,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSearchList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFE0',}}>
      <FlatList
        ListHeaderComponent={
          <View style={{marginTop: 40,}}>
            <SearchBar
              placeholder="학교명 검색"
              onChangeText={onSearchHandler}
              value={key}
              style={styles.searchbar}
              containerStyle={styles.search}
              inputContainerStyle={styles.search2}
              inputStyle={styles.search3}></SearchBar>
          </View>
        }
        style={styles.list}
        data={searchList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={styles.item} onPress={() => navigation.navigate("회원가입", {s_name: item.name, s_id: item.id})}>{item.name}</Text>
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    
  },

  page: {
    backgroundColor: '#FFFFE0',
    marginTop: 40,
    marginBottom: 40,
    // flex: 1,
  },
  screen: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    width: 180,
    height: 40,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  btntext: {
    fontSize: 20,
    color: 'white',
  },

  btnbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  box: {
    width: 320,
  },
  box2: {
    width: 300,
    marginTop: 20,
  },

  search: {
    backgroundColor: '#FFFFE0',
    borderWidth: 0,
    borderRadius: 5,
    borderColor: 'gray',
  },

  search2: {
    backgroundColor: '#FFFFE0',
  },

  search3: {
    backgroundColor: '#FFFFE0',
  },

  list: {},
});

export default SchoolSearch;
