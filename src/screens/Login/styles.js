import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
// import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  logoImage: {
    height: 100,
    width: 300,
    alignSelf: 'center',
    marginTop: 100,
  },

  title: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: '500',
  },

  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },

  form: {
    paddingTop: 20,
  },

  createSection: {
    flexDirection: 'row',
  },
  linkBtn: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },

  infoText: {
    fontSize: 17,
  },
});
