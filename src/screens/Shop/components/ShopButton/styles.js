import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const buttonContainerProps = {
  width:deviceWidth*0.80,
  height:60,
  justifyContent:'space-around',
  flexDirection:'row',
  alignItems:'center',
  borderRadius:30,
  alignSelf:'center',
  margin:10
};


const buttonContainerImageProps = {
  width:30,
  height:30,
  overflow:'hidden',
};


const styles : any = StyleSheet.create({
  scrollViewContentContainer:{
    width:deviceWidth
  },
  buttonContainer:{
    ...buttonContainerProps
  },
  buttonContainerImageContainer:{
    ...buttonContainerImageProps
  },
  buttonContainerTitleText:{
    fontSize:20,
    fontWeight:'bold'
  },
  icon:{
    resizeMode:'cover',
    width:'100%',
    height:'100%'
  }
});

export default styles;
