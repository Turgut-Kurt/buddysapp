import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import Profile from '../component/profile2';
import { connect } from 'react-redux';
import { LikedMe } from '../../store/Actions/LikedMe';
import { ILiked } from '../../store/Actions/ILiked';
import { Icon } from 'native-base';
import { axiosInstance } from '../../utils/Api';
const screenWidth = Dimensions.get('window').width;
import { axiosInstance as api } from '../../utils/Api';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      list: [1, 2, 3, 4, 5],
      isVip: false
    };
  }
  componentDidMount = () => {
    this.props.LikedMe(false, null);
    this.props.ILiked(false, null);
  };

  pageChange = async index => {
    await this.setState({ pageIndex: index });
    await this._scrollView.scrollTo({ x: screenWidth * index });
    if (this.state.pageIndex === 0) {
      this.props.LikedMe(false, null);
    } else {
      this.props.ILiked(false, null);
    }
  };

  renderFlatList = (loading, error, data, isBlur) => {
    if (loading) {
      return <ActivityIndicator size={40} />;
    }
    if (error) {
      return <Text>Bir Hata Oluştu.</Text>;
    }
    if (data) {
      console.log(data)
      console.log('data')
      if (data.count > 0) {
        return (
          <FlatList
            style={{ width: '100%', paddingLeft: 10 }}
            data={data.results}
            renderItem={({ item, index }) => (
              <Profile key={`${item.id}_${index}`} {...item} isBlur={isBlur} />
            )}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
          />
        );
      } else {
        return (
          <Text style={{ paddingLeft: 10 }}>Maalesef hiç veri bulunamadı.</Text>
        );
      }
    }
  };
  async componentWillMount() {
    const { userId } = this.props.SignInReducer;
    const user = await axiosInstance.get(`api/users/${userId}/`)
    console.log(user.data.is_vip)
    console.log(user.data)
    this.setState({ isVip: user.data.is_vip })
    this.state.isVip
  }
  render() {
    const { loading: l1, error: e1, data: d1 } = this.props.LikedMeReducer;
    const { loading: l2, error: e2, data: d2 } = this.props.ILikedReducer;
    return (
      <View style={styles.backgroundView}>
        <View style={styles.topView}>
          <ImageBackground
            resizeMethod="scale"
            resizeMode="stretch"
            style={styles.imageBackgroundView}
            source={require('../../assets/images/likeTop.png')}>
            <TouchableOpacity
              style={styles.tabView1}
              onPress={() => {
                this.pageChange(0);
              }}>
              <Text
                style={
                  this.state.pageIndex === 0
                    ? styles.tabTextSelected
                    : styles.tabText
                }>
                Beğenenler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabView2}
              onPress={() => {
                this.pageChange(1);
              }}>
              <Text
                style={
                  this.state.pageIndex === 1
                    ? styles.tabTextSelected
                    : styles.tabText
                }>
                Beğendiklerim
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={elem => {
            let info = elem.nativeEvent.contentOffset.x;
            const index = Math.round(info / screenWidth);
            this.setState({ pageIndex: index });
          }}
          ref={node => (this._scrollView = node)}>
          <ScrollView style={styles.tabPage}>
            <View style={styles.groupView}>
              <View style={styles.groupViewHeader}>
                {d1 ? d1.previous ? <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => {
                  this.props.LikedMe(true, d1.previous)
                }}>
                  <Icon type="FontAwesome5" name="chevron-left" />
                </TouchableOpacity> : null : null}
                <Text style={styles.headerText}>En İyi Eşleşme</Text>
                {d1 ? d1.next ? <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => {
                  d1.next ? this.props.LikedMe(true, d1.next) : null;
                }}>
                  <Icon type="FontAwesome5" name="chevron-right" />
                </TouchableOpacity> : null : null}
              </View>
              {this.renderFlatList(l1, e1, d1, !this.state.isVip)}
            </View>

            <View style={[styles.groupView, { display: 'none' ,borderWidth:3}]}>
              <View style={styles.groupViewHeader}>
                <Image
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require('../../assets/images/premium.png')}
                />
                <Text style={styles.headerText}>Konuma Göre Eşleşme</Text>
              </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.tabPage}>
            <View style={styles.groupView}>
              <View style={styles.groupViewHeader}>
                {d2 ? d2.previous ? <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => {
                  this.props.ILiked(true, d2.previous)
                }}>
                  <Icon type="FontAwesome5" name="chevron-left" />
                </TouchableOpacity> : null : null}
                <Text style={styles.headerText}>En İyi Eşleşme</Text>
                {d2 ? d2.next ? <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'center' }} onPress={() => {
                  d2.next ? this.props.ILiked(true, d2.next) : null;
                }}>
                  <Icon type="FontAwesome5" name="chevron-right" />
                </TouchableOpacity> : null : null}
              </View>
              {this.renderFlatList(l2, e2, d2, false)}
            </View>
            <View style={[styles.groupView, { display: 'none' }]}>
              <View style={styles.groupViewHeader}>
                <Image
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require('../../assets/images/premium.png')}
                />
                <Text style={styles.headerText}>Konuma Göre Eşleşme</Text>
              </View>
              <FlatList
                style={{ width: '100%', paddingLeft: 10 }}
                data={this.state.list}
                renderItem={item => <Profile />}
                numColumns={3}
                keyExtractor={item => {
                  item;
                }}
              />
            </View>
          </ScrollView>
        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    LikedMeReducer: state.LikedMeReducer,
    ILikedReducer: state.ILikedReducer,
    SignInReducer: state.SignInReducer,
  };
};

const mapDispatchToProps = {
  LikedMe,
  ILiked,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Like);
