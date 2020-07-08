

import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;



const tipProps = {
  width: deviceWidth * 0.50,
  height: deviceWidth * 0.40,
  borderRadius:20,
  justifyContent:'center',
  alignItems:'center'
};

const tipImageProps = {
  width:'50%',
  height:'50%',
  backgroundColor:'white',
  overflow:'hidden',
  borderRadius:20,
  padding:0

};



const styles : any = StyleSheet.create({
  container:{
    ...tipProps
  },
  imageContainer:{
    ...tipImageProps
  },
  image:{
    resizeMode:'contain',
    width:'100%',
    height:'100%'
  },
  title:{
    paddingHorizontal:35,
    fontSize:20,
    color:'#523A8E',
    fontWeight:'bold',
    textAlign: 'center',

  },
});

export default styles;
