import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';

const Game = () => {
  return (
    <ScrollView style={styles.scroll}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.gameWindow}></View>

        <View style={styles.tableView}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Rank</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Score</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>1</DataTable.Cell>
              <DataTable.Cell>Yulha098</DataTable.Cell>
              <DataTable.Cell>2020000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>2</DataTable.Cell>
              <DataTable.Cell>hahaha</DataTable.Cell>
              <DataTable.Cell>2010000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>3</DataTable.Cell>
              <DataTable.Cell>lazysong</DataTable.Cell>
              <DataTable.Cell>2000000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>4</DataTable.Cell>
              <DataTable.Cell>dragons</DataTable.Cell>
              <DataTable.Cell>1990000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>5</DataTable.Cell>
              <DataTable.Cell>imagine</DataTable.Cell>
              <DataTable.Cell>1980000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>6</DataTable.Cell>
              <DataTable.Cell>help</DataTable.Cell>
              <DataTable.Cell>1970000</DataTable.Cell>
            </DataTable.Row>

            {/* <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => {
                console.log(page);
              }}
            /> */}
          </DataTable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  gameWindow: {
    width: 350,
    height: 250,
    backgroundColor: 'gray',
    marginTop: 50,
  },

  tableView: {
    width: 330,
  },
});

export default Game;
