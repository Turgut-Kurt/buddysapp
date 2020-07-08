import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const packageProps = {
  justifyContent: 'space-around',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 30,
  alignSelf: 'center',
  margin: 10,
  backgroundColor: 'transparent',
};

const packageImageProps = {
  width: '100%',
  overflow: 'hidden',
  borderRadius: 20,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const packageTitleProps = {
  width: '100%',
  borderTopWidth: 1,
  borderColor: 'black',
  borderRadius: 0,
  padding: 5,
  paddingTop: 10,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles: any = StyleSheet.create({
  package: {
    minWidth: deviceWidth / 3 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: 'black',
    marginVertical: 20,
    marginHorizontal: 5,
  },
  packageSelected: {
    minWidth: deviceWidth / 3 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginVertical: 20,
    marginHorizontal: 5,
  },
  productContainer: {
    flex: 1,
  },
  packageContainer: {
    ...packageProps,
  },
  packageImageContainer: {
    ...packageImageProps,
  },
  productTitleContainer: {
    ...packageTitleProps,
  },
  packageTitleText: {
    fontSize: 13,
    fontWeight: '200',
    textAlign: 'center',
    color: '#F51C44',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  icon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  priceContainer: {
    backgroundColor: '#523A8E',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 0,
    padding: 4,
  },
  priceText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
