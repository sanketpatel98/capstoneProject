import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      // paddingTop:10,
      // flex: 1,
      // backgroundColor: "#9AB8BA",
      // alignItems: 'center',
      // justifyContent: 'center',
      height: '100%',
      width: '100%'
    },
    webViewContainer: {
      flex:1,
      // flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: "#9AB8BA",
      width: Dimensions.get('window').width,
    },
  });

export default styles;