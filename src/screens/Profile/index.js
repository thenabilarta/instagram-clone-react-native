import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import styles from './styles';
import logoutUser from '../../context/actions/auth/logoutUser';
import {GlobalContext} from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInstance';

const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const inlineStyles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    margin: 3,
  },
});

const Profile = () => {
  const [imageURI, setImageURI] = useState('');
  const [username, setUsername] = useState('');
  const [profileFeeds, setProfileFeeds] = useState([]);

  const {setOptions} = useNavigation();

  const {authDispatch} = useContext(GlobalContext);

  let decoded;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    (async function () {
      const test = await AsyncStorage.getItem('token');

      try {
        decoded = jwtDecode(test);
        console.log(decoded);
        setImageURI(decoded.profilePic);
        setUsername(decoded.username);
        setOptions({
          title: capitalizeFirstLetter(decoded.username),
        });

        axiosInstance.get(`api/feeds/${decoded.id}`).then(res => {
          console.log('FEEDS', res.data);
          setProfileFeeds(res.data);
        });
      } catch (error) {
        decoded = error;
      }
    })();
  }, []);

  const onLogout = () => {
    logoutUser()(authDispatch);
  };

  return (
    <View style={styles.profileWrapper}>
      <View style={styles.headerWrapper}>
        <View style={styles.profilePictureWrapper}>
          {imageURI !== '' && (
            <Image source={{uri: imageURI}} style={styles.profileImage} />
          )}
          <View style={styles.logoutButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                console.log('LOGOUT');
                onLogout();
              }}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerDescription}>
          <Text style={styles.headerUsername}>
            {capitalizeFirstLetter(username)}
          </Text>
          <Text>This is Description</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={profileFeeds}
          renderItem={({item}) => (
            <View style={inlineStyles.itemContainer}>
              <Image
                source={{
                  uri: item.image_url,
                }}
                style={inlineStyles.item}
              />
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};

export default Profile;
