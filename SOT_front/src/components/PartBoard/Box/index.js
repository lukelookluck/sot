import React, {useState} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import PartBoardSingle from '../Single';
import SingleArticle from '../SingleArticle';

export default function PartBoard(props) {
  const onPress = () => console.log('1');

  // if (props.pressed === true) {
  //   setMyloading(
  //     <View>
  //       <Image
  //         source={require('./spiner.gif')}
  //         style={{width: 100, height: 100}}
  //       />
  //     </View>,
  //   );
  // }

  const myarticle = (
    <View
      style={{
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#dbdbdb',
        borderRadius: 8,
      }}>
      <View>
        {props.pressed === true && (
          <TouchableHighlight onPress={onPress} underlayColor="#dfdfdf">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                {props.PartName}
              </Text>
              <Text style={{color: '#ff8000'}}>더 보기</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>

      {(props.PartName === '즐겨찾는 게시판' && (
        <View>
          <PartBoardSingle BoardName="자유게시판" />
          <PartBoardSingle BoardName="비밀게시판" />
          <PartBoardSingle BoardName="졸업생게시판" />
          <PartBoardSingle BoardName="정보게시판" />
        </View>
      )) || (
        <View>
          <SingleArticle />
          <SingleArticle />
          <SingleArticle />
          <SingleArticle />
          <SingleArticle />
          <SingleArticle />
        </View>
      )}
    </View>
  );

  setTimeout(() => {
    props.setMyloading(true);
  }, 2000);
  return (
    <View>
      {(props.myLoading === true && <View>{myarticle}</View>) || (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('./spiner.gif')}
            style={{width: 100, height: 100}}
          />
        </View>
      )}
    </View>
  );
}
