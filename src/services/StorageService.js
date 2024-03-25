import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const mystorage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,
  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage
  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,
  // cache data in the memory. default is true.
  enableCache: true,
  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});

const storage = {
  save: async (key, data, expires = null) => {
    try {
      console.log("\nStorage save", key)
      await mystorage.save({ key, data, expires })
      return true;
    } catch (e) {
      console.log(key, ' saved error ', e);
      return false;
    }
  },
  getKeyData: async key => {
    console.log("\nStorage getkeydata ", key);
    try {
      const data = await mystorage.load({ key });
      console.log("data ", data)
      // const data = await AsyncStorage.getItem(key);
      return data;
    } catch (e) {
      console.log(key, ' saved error ', e);
      return false;
    }
  },
  removeItem: async (key) => {
    try {
      await mystorage.remove({ key })
      // await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.log(key, ' remove error ', e);
      return false;
    }

  },
  clear: async () => {
    console.log("\nStorage clear");
    await mystorage.clearMap();
  }
};
export default storage;
