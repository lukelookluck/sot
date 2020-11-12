import React, {useState, useEffect, useContext} from 'react';
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
import 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonContext} from '../../context/CommonContext';
import {color} from 'react-native-reanimated';
import SingleArticle from '../../components/PartBoard/SingleArticle'


const Board = ({navigation, route}) => {
  const {serverUrl, user, setUser, fav, setFav} = useContext(CommonContext);
  const [postList, setPostList] = useState([]);
  const [msg, setMsg] = useState('no');
  // const [fav, setFav] = useState(false);

  useEffect(() => {
    refreshList();
    refreshFav();
    navigation.addListener('focus', () => {
      refreshList();
      refreshFav();
    })
  }, []);

  const gotoWrite = () => {
    navigation.navigate('WritePost', {
      boardname: route.params.name,
      boardid: route.params.id,
    });
  };

  function reLoad() {
    refreshList();
    route.params.isRe = 'no';
    console.log(route.params.isRe);
  }

  function refreshFav() {
    axios
      .get(`${serverUrl}/board/${route.params.id}/isfaved?userId=${user.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
      })
      .then((response) => {
        console.log(response.data);
        setFav(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function refreshList() {
    axios
      .get(`${serverUrl}/board/${route.params.id}`, {
        // headers: {
        //   Authorization: `JWT ${user.token}`,
        // },
      })
      .then((response) => {
        console.log('here????');
        setPostList([]);
        console.log(response.data);
        setPostList(response.data);
      })
      .catch((error) => {
        console.log('why???');
        console.log(error);
      });
  }

  function noLoad() {
    console.log('아니야');
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        {msg === 'no' && route.params.isRe && route.params.isRe === 'yes' && (reLoad()) || (noLoad())}
        {
          postList.length === 0
          ? (<View style={{justifyContent: 'center', alignItems: 'center', flex: 1,}}>
              <Text style={{fontSize: 25, marginTop: 70,}}>게시글이 없습니다</Text>
            </View>)
          : (<></>) 
        }
        {
          postList.map((item, index) => (
            <View key={index} style={{borderBottomWidth: 0.5, borderBottomColor: "gray"}}>
              <SingleArticle
              idx={index}
              article={item}
              navigation={navigation}
              ></SingleArticle>
            </View>
          ))
        }
      </ScrollView>
      <TouchableOpacity style={styles.writeBtn} onPress={gotoWrite}>
        <Text style={{color: 'white', fontSize: 15}}>글작성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },

  container: {
    
  },

  writeBtn: {
    width: 70,
    height: 30,
    backgroundColor: '#F14E23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    left: 160,
  },
});

export default Board;
