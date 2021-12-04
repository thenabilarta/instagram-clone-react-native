import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import axiosInstance from '../../helpers/axiosInstance';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Comments = ({route}) => {
  const [commentText, setCommentText] = useState('');

  const navigation = useNavigation();

  const createComment = () => {
    axiosInstance
      .post('api/comments', {text: commentText, post_id: route.params.feedId})
      .then(res => {
        console.log(res.data);
        navigation.goBack();
        // setComment("");
        // fetchFeed();
      });
  };

  return (
    <View style={styles.commentWrapper}>
      <View style={styles.captionWrapper}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri: route.params.profilePictureSRC,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.captionTextWrapper}>
          <Text>
            <Text style={styles.captionTextUsername}>
              {route.params.username}
            </Text>{' '}
            {route.params.caption}
          </Text>
        </View>
      </View>
      {route.params.comments.map(c => (
        <View style={styles.mainCommentWrapper} key={c.id}>
          <Text>
            <Text style={styles.captionTextUsername}>{c.username}</Text>{' '}
            {c.text}
          </Text>
        </View>
      ))}
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Add Comment"
          style={styles.commentTextInput}
          onChangeText={e => {
            setCommentText(e);
          }}
        />
        <TouchableOpacity
          style={styles.commentTextInputButton}
          onPress={createComment}>
          <Text style={styles.commentTextInputButtonText}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
