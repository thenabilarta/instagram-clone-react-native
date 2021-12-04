import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  chatWrapper: {
    backgroundColor: '#fff',
  },
  spacer: {
    height: 20,
  },
  messageWrapper: {
    // height: 500,
    // backgroundColor: 'red',
    // height: 100,
    marginTop: 15,
  },
  messageWrapperChild: {
    // height: 500,
    // backgroundColor: 'red',
    // height: 100,
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
  },
  textWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 5,
    maxWidth: '50%',
  },
  textWrapperUser: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 5,
    maxWidth: '50%',
  },
  text: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#efefef',
  },
  textUser: {
    backgroundColor: '#efefef',
    padding: 10,
    borderRadius: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  textInput: {
    paddingHorizontal: 10,
    flex: 1,
  },
  sendButton: {
    paddingHorizontal: 10,
  },
});
