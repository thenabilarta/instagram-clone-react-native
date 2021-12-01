import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    // padding: 20,
  },
  feed: {
    backgroundColor: '#fefefe',
    borderRadius: 5,
    paddingTop: 10,
    marginBottom: 30,
  },
  card_image: {
    height: '100%',
    // width: '100%',
  },
  profilePicture: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postWrapper: {
    height: 300,
  },
  cardFooter: {
    height: 100,
  },
  cardFooterIcon: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardFooterIconStyle: {
    margin: 5,
  },
  cardFooterText: {
    marginHorizontal: 5,
  },
});
