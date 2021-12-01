import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axiosInstance from '../../helpers/axiosInstance';

const Item = ({image_url, username, profilePictureSRC}) => (
  <View style={styles.feed}>
    <View style={styles.cardHeader}>
      <Image
        source={{
          uri: profilePictureSRC,
        }}
        style={styles.profilePicture}
      />
      <Text>{username}</Text>
    </View>
    <View style={styles.postWrapper}>
      <Image
        source={{
          uri: image_url,
        }}
        style={styles.card_image}
      />
    </View>
    <View style={styles.cardFooter}>
      <View style={styles.cardFooterIcon}>
        <Icon
          name="heart-outline"
          size={25}
          style={styles.cardFooterIconStyle}
        />
        <Icon
          name="chatbubble-outline"
          size={25}
          style={styles.cardFooterIconStyle}
        />
        <Icon
          name="paper-plane-outline"
          size={25}
          style={styles.cardFooterIconStyle}
        />
      </View>
      <View style={styles.cardFooterText}>
        <Text>19 likes</Text>
        <Text>Test</Text>
      </View>
    </View>
  </View>
);

const Dashboard = () => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    axiosInstance.get('api/feeds').then(res => {
      // console.log('feeds', res.data);
      console.log('FETCH');
      setFeedData(res.data);
    });
  }, []);

  const renderItem = ({item}) => (
    <Item
      image_url={item.image_url}
      username={item.username}
      id={item.id}
      profilePictureSRC={item.profilePictureSRC}
    />
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Dashboard;
