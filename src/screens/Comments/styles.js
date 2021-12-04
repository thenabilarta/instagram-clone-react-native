import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  commentWrapper: {
    backgroundColor: '#fff',
  },
  captionWrapper: {
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  captionTextUsername: {
    fontWeight: 'bold',
  },
  profileImageWrapper: {
    paddingHorizontal: 10,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  captionTextWrapper: {
    maxWidth: '85%',
  },
  mainCommentWrapper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },

  textInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentTextInput: {
    padding: 10,
    flex: 1,
  },
  commentTextInputButton: {
    paddingHorizontal: 10,
  },
  commentTextInputButtonText: {
    color: 'rgb(0, 149, 246)',
  },
});
