import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axiosInstance from '../../helpers/axiosInstance';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ADD_COMMENT} from '../../constants/routeNames';
import {useIsFocused} from '@react-navigation/native';

const Item = ({
  image_url,
  username,
  profilePictureSRC,
  clickCount,
  setClickCount,
  likes,
  userId,
  likeAPost,
  owner,
  feedId,
  unlikeAPost,
  caption,
  navigation,
  comments,
}) => (
  <View style={styles.feed}>
    <View style={styles.cardHeader}>
      <Image
        source={{
          uri: profilePictureSRC,
        }}
        style={styles.profilePicture}
      />
      <Text style={styles.cardHeaderUsername}>{username}</Text>
    </View>
    <View style={styles.postWrapper}>
      {clickCount > 1 && (
        <Icon name="heart" size={100} style={styles.likeIcon} />
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          if (clickCount === 0) {
            setClickCount(1);
            setTimeout(() => {
              if (clickCount !== 2) {
                setClickCount(0);
              }
            }, 500);
          }

          if (clickCount === 1) {
            setClickCount(2);
            likeAPost(feedId, owner, userId);
            setTimeout(() => {
              setClickCount(0);
            }, 500);
          }
        }}>
        <Image
          source={{
            uri: image_url,
          }}
          style={styles.card_image}
        />
      </TouchableWithoutFeedback>
    </View>
    <View style={styles.cardFooter}>
      <View style={styles.cardFooterIcon}>
        {likes.includes(userId) ? (
          <TouchableWithoutFeedback
            onPress={() => {
              unlikeAPost(feedId, userId);
            }}>
            <Icon
              name="heart"
              size={25}
              style={styles.cardFooterIconStyleLike}
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              setClickCount(2);
              likeAPost(feedId, owner, userId);
              setTimeout(() => {
                setClickCount(0);
              }, 500);
            }}>
            <Icon
              name="heart-outline"
              size={25}
              style={styles.cardFooterIconStyle}
            />
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate(ADD_COMMENT, {
              profilePictureSRC,
              username,
              caption,
              comments,
              feedId,
            })
          }>
          <Icon
            name="chatbubble-outline"
            size={25}
            style={styles.cardFooterIconStyle}
          />
        </TouchableWithoutFeedback>

        <Icon
          name="paper-plane-outline"
          size={25}
          style={styles.cardFooterIconStyle}
        />
      </View>
      <View style={styles.cardFooterText}>
        {likes.length > 0 && (
          <Text style={styles.cardFooterTextLikes}>{likes.length} likes</Text>
        )}
        {caption !== '' && (
          <Text style={styles.cardFooterTextCaption}>
            <Text style={styles.cardFooterTextUsername}>{username}</Text>{' '}
            {caption}
          </Text>
        )}
        {comments.length > 0 && (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate(ADD_COMMENT, {
                profilePictureSRC,
                username,
                caption,
                comments,
                feedId,
              })
            }>
            <Text style={styles.cardFooterTextComments}>
              View all {comments.length} comments
            </Text>
          </TouchableWithoutFeedback>
        )}
        <Text style={styles.cardFooterTextTime}>1 day ago</Text>
      </View>
    </View>
  </View>
);

const Dashboard = () => {
  const [feedData, setFeedData] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [userId, setUserId] = useState(0);
  const [bearerToken, setBearerToken] = useState('');

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const decodeToken = async () => {
    const test = await AsyncStorage.getItem('token');
    console.log('token', test);

    setBearerToken(test);

    let decoded;
    try {
      decoded = jwtDecode(test);
    } catch (error) {
      decoded = error;
    }
    setUserId(decoded.id);
  };

  const fetchFeed = () => {
    axiosInstance.get('api/feeds').then(res => {
      console.log('feeds', res.data[0]);
      console.log('FETCH');
      setFeedData(res.data);
    });
  };

  const likeAPost = (feed_id, owner, user_id) => {
    axiosInstance.post('api/likes', {feed_id, owner, user_id}).then(res => {
      if (res.data.status === 'error') {
        return;
      } else {
        fetchFeed();
      }
    });
  };

  const unlikeAPost = (feed_id, user_id) => {
    axiosInstance.post('/api/likes/unlike', {feed_id, user_id}).then(res => {
      console.log(res.data);
      fetchFeed();
    });
  };

  useEffect(() => {
    if (isFocused) {
      decodeToken();
      fetchFeed();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <Item
      image_url={item.image_url}
      username={item.username}
      id={item.id}
      profilePictureSRC={item.profilePictureSRC}
      likes={item.likes}
      userId={userId}
      clickCount={clickCount}
      setClickCount={setClickCount}
      likeAPost={likeAPost}
      unlikeAPost={unlikeAPost}
      owner={item.user_id}
      feedId={item.id}
      caption={item.caption}
      navigation={navigation}
      comments={item.comments}
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
