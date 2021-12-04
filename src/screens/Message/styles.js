import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  userWrapper: {
    // marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  userMessage: {
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  userProfilePicture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  username: {
    fontSize: 16,
    marginLeft: 18,
  },
});
