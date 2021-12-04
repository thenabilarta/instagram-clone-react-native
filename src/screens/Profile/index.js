import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import styles from './styles';

const Profile = () => {
  const [imageURI, setImageURI] = useState('');
  const [username, setUsername] = useState('');

  const {setOptions} = useNavigation();

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
      } catch (error) {
        decoded = error;
      }
    })();
  }, []);

  return (
    <View style={styles.profileWrapper}>
      <View style={styles.headerWrapper}>
        <View style={styles.profilePictureWrapper}>
          {imageURI !== '' && (
            <Image source={{uri: imageURI}} style={styles.profileImage} />
          )}
          <View style={styles.logoutButtonWrapper}>
            <TouchableOpacity>
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
    </View>
  );
};

export default Profile;
