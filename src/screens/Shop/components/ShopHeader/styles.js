import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const headerSectionProps = {
  width:deviceWidth,
  height:70,
  justifyContent:'space-around',
  flexDirection:'row',
  alignItems:'center'
};


const headerSectionImageProps = {
  width:70,
  height:70,
  overflow:'hidden',
  borderRadius:10
};


const styles : any = StyleSheet.create({
  scrollViewContentContainer:{
    width:deviceWidth
  },
  headerSection:{
    ...headerSectionProps
  },
  headerSectionImageContainer:{
    ...headerSectionImageProps
  },
  headerSectionTitleText:{
    fontSize:35,
    fontWeight:'bold'
  },
  icon:{
    resizeMode:'cover',
    width:'100%',
    height:'100%'
  }
});

export default styles;
