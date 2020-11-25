import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const useLocalStorageSetState = (initialValue, name) => {
  if (!name) {
    throw new Error('Name must be provided to persist to localStorage');
  }
  let actualInitialValue = false;
  // const actualInitialValue =
  //   AsyncStorage.getItem(name) !== undefined ? AsyncStorage.getItem(name) : initialValue;
  const [value, setValue] = useState(actualInitialValue);

  const fetch = async () => {
    actualInitialValue =
      await AsyncStorage.getItem(name) !== undefined ? AsyncStorage.getItem(name) : initialValue;
  }

  useEffect(() => {
    fetch();
    AsyncStorage.setItem(name, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

