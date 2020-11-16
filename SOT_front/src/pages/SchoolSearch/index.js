import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import 'react-native-gesture-handler';
import {CommonContext} from '../../context/CommonContext';

// 학교명 검색
const SchoolSearch = ({navigation}) => {
  const [key, setKey] = useState('');
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
    <View style={{flex: 1, backgroundColor: '#FFFFE0', alignItems: 'center'}}>
      <FlatList
        ListHeaderComponent={
          <View style={{marginTop: 40,}}>
            <SearchBar
              placeholder="학교명 검색"
              onChangeText={onSearchHandler}
              value={key}
              containerStyle={styles.search}
              inputContainerStyle={styles.search2}
            ></SearchBar>
          </View>
        }
        data={searchList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.s_box}>
            <Text style={styles.sido}>{item.sido}</Text>
            <Text style={styles.item} onPress={() => navigation.navigate("회원가입", {s_name: item.name, s_id: item.id})}>{item.name}</Text>
          </View>
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#FFFFE0',
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    borderTopColor: 'darkgray',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: "darkgray",
    borderRightWidth: 1,
    borderRightColor: "darkgray",
    width: 320,
  },

  search2: {
    backgroundColor: '#FFFFE0',
  },

  search3: {
    backgroundColor: '#FFFFE0',
  },

  item: {
    fontSize: 20,
    marginLeft: 10,
  },
  
  sido: {
    fontSize: 15,
    marginLeft: 10,
  },

  s_box : {
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    borderLeftWidth: 1,
    borderLeftColor: "silver",
    borderRightColor: "silver",
    borderRightWidth: 1,
    backgroundColor: 'white',
  }
});

export default SchoolSearch;
