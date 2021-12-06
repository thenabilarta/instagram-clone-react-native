import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileWrapper: {
    backgroundColor: '#fff',
    height: '100%',
  },
  headerWrapper: {
    paddingBottom: 20,
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 1,
  },
  profilePictureWrapper: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  logoutButtonWrapper: {
    marginRight: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#1890ff',
    fontWeight: 'bold',
  },
  headerDescription: {
    marginHorizontal: 20,
  },
  headerUsername: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  feedImage: {
    height: 100,
    width: 100,
  },
});
