import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../../helpers/axiosInstance';
import {DASHBOARD} from '../../constants/routeNames';

const AddFeed = ({route}) => {
  const {setOptions, navigate} = useNavigation();

  const [captionText, setCaptionText] = useState('');

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            const formData = new FormData();
            formData.append('files', route.params.imageData[0]);
            formData.append('caption', captionText);

            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };

            axiosInstance.post('api/feeds', formData, config).then(res => {
              navigate(DASHBOARD);
            });
          }}>
          <Icon
            style={styles.headerCheckIcon}
            name="checkmark-sharp"
            size={28}
          />
        </TouchableOpacity>
      ),
    });
  }, [captionText]);

  return (
    <View style={styles.addFeedWrapper}>
      <View style={styles.feedWrapper}>
        <Image
          style={styles.feedImage}
          source={{
            uri: route.params.imageData[0].uri,
          }}
        />
      </View>
      <View style={styles.captionWrapper}>
        <Image
          style={styles.captionImage}
          source={{
            uri: 'https://www.gravatar.com/avatar/1637508787?d=identicon',
          }}
        />
        <TextInput
          placeholder="Insert a caption.."
          style={styles.captionTextInput}
          multiline={true}
          value={captionText}
          onChangeText={e => {
            setCaptionText(e);
          }}
        />
      </View>
    </View>
  );
};

export default AddFeed;
