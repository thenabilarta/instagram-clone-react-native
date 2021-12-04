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
  cardHeaderUsername: {
    fontWeight: 'bold',
  },
  postWrapper: {
    height: 300,
    position: 'relative',
  },
  likeIcon: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    color: 'red',
    left: '50%',
    transform: [
      {
        translateX: -50,
      },
      {
        translateY: -50,
      },
    ],
  },
  cardFooter: {
    // height: 100,
    paddingBottom: 10,
  },
  cardFooterIcon: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardFooterIconStyle: {
    margin: 5,
  },
  cardFooterIconStyleLike: {
    margin: 5,
    color: 'red',
  },
  cardFooterText: {
    marginHorizontal: 10,
  },
  cardFooterTextCaption: {
    marginBottom: 3,
  },
  cardFooterTextUsername: {
    fontWeight: 'bold',
  },
  cardFooterTextLikes: {
    marginBottom: 3,
  },
  cardFooterTextComments: {
    fontWeight: '300',
    marginBottom: 3,
  },
  cardFooterTextTime: {
    fontSize: 12,
    marginBottom: 3,
  },
});
