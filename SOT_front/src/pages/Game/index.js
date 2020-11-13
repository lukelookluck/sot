import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { CommonContext } from "../../context/CommonContext";

// 게임 탭 화면 - 아직 게임 개발이 진행중이라 우선은 랜덤하게 오늘의 간식을 추천함. 
const Game = () => {

  const { serverUrl, user, setUser } = useContext(CommonContext);
  const snackList = [
    "칸쵸", "프링글스", "초코송이", "스윙칩", "프리츠", "양갱", "맛동산", "전병", "쌀과자", "한과",
    "브이콘", "피크닉", "초코에몽", "허니버터칩", "쁘띠첼", "월드콘",
    "뿌셔뿌셔", "불벅", "누네띠네", "코코볼", "씬피자", "소세지빵",
    "미닛메이드오렌지", "마운틴듀", "스프라이트", "코카콜라", "펩시",
    "새우깡", "꼬깔콘", "맥콜", "데자와", "아침햇살", "솔의눈"
  ];

  const [snack, setSnack] = useState("");

  const random_re = () => {
    setSnack(snackList[Math.floor(Math.random() * (snackList.length - 0))]);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={{backgroundColor: '#ff8000', paddingLeft: 15, borderBottomWidth: 1,
        borderBottomColor: '#df380f', height: 56, justifyContent: 'center'}}>
        <Text style={{fontSize: 12, color: 'white'}}>SOT</Text>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
          {user.schoolName}
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        
        <Text style={styles.snack}>오늘의 간식</Text>
        
        {snack === ""
          ? (
            <View style={styles.snackbox}>
              <Text style={styles.rd_snack}>?</Text>
            </View>
          )
          : (
            <View style={styles.snackbox}>
              <Text style={styles.rd_snack}>{snack}</Text>
            </View>)
        }

        { snack === ""
          ? (
          <TouchableOpacity style={styles.re_btn} onPress={random_re}>
            <Text style={styles.btn_text}>추천해줘</Text>
          </TouchableOpacity>) 
          : (
          <TouchableOpacity style={styles.re_btn} onPress={random_re}>
            <Text style={styles.btn_text}>다시 추천해줘</Text>
          </TouchableOpacity>)
        }

      </View>

      <View style={styles.game}>
        <View style={styles.game2}>
          <Text style={styles.game_text}>게임 업데이트 예정</Text>
          <Text style={styles.game_text2}>Coming soon!</Text>
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  snack: {
    marginTop: 60,
    fontSize: 25,
    marginBottom: 20
  },

  rd_snack: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20,
  },

  snackbox: {
    width: 300,
    height: 100,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  re_btn: {
    width: 150,
    height: 40,
    backgroundColor: '#F14E23',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  btn_text: {
    color: 'white',
    fontSize: 20
  },

  game: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },

  game2: {
    height: 120,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  game_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FACA0F',
    shadowColor: '#F14E23',
    textShadowRadius: 1,
    textShadowOffset: { width: 2, height: 2 },
  },

  game_text2: {
    fontSize: 23,
    color: '#FACA0F',
    shadowColor: '#F14E23',
    textShadowRadius: 1,
    textShadowOffset: { width: 2, height: 2 },
  },

});

export default Game;
