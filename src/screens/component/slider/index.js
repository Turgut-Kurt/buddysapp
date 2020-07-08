import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
let index = 0;

export default class ZeyTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      drag: true,
    };
    this.pageChange = this.pageChange.bind(this);
  }

  componentDidMount() {
    this.installPage();
  }

  pageChange(i) {
    this.scrollStart();
    index = i;
    let copy = this.state.pages;

    copy[index].status = true;
    this.setState({pages: copy});
    this.scrollView.scrollTo({x: screenWidth * index});
    this.props.getIndex(index);
  }

  scrollStart = () => {
    let copy = [];
    this.state.pages.map((elem, i) => {
      let editValue = elem;
      editValue.status = false;
      copy.push(editValue);
    });
    this.setState({pages: copy});
  };

  next = () => {
    index = index === this.state.pages.length - 1 ? index : index + 1;
    this.pageChange(index);
  };
  previos = () => {
    index = index === 0 ? index : index - 1;
    this.pageChange(index);
  };

  installPage = () => {
    let copy = [];
    React.Children.map(this.props.children, children => {
      let props = children.props;

      copy.push({
        name: props.name,
        status: props.status,
        onImage: props.onImage,
        offImage: props.offImage,
        text: props.text,
      });
    });

    this.setState({pages: copy});
  };
  render() {
    const inChildren = this.state.pages.map((elem, i) => {
      var viewStyle = elem.status ? styles.selectedView : styles.view;
      return (
        <TouchableOpacity
          key={i}
          style={viewStyle}
          onPress={() => {
            this.pageChange(i);
            this.setState({drag: false});
          }}>
          <ImageBackground
            style={styles.icon}
            source={elem.status ? elem.onImage : elem.offImage}>
            <Text style={styles.text}>{elem.text}</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    });

    return (
      <View style={this.props.style}>
        <View style={{flex: 1}}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={this.props.scrollEnabled}
            ref={node => (this.scrollView = node)}
            onMomentumScrollEnd={elem => {
              let info = elem.nativeEvent.contentOffset.x;
              index = Math.round(info / screenWidth);
              this.pageChange(index);
              this.setState({drag: true});
            }}
            onScroll={() => {
              if (this.state.drag) {
                this.scrollStart();
              }
            }}>
            {this.props.children}
          </ScrollView>
        </View>
        {this.props.navBar === false ? null : (
          <View style={styles.navBar}>{inChildren}</View>
        )}
      </View>
    );
  }
}
ZeyTab.defaultProps = {
  navBar: false,
  scrollEnabled: true,
  getIndex: () => {},
};

const styles = StyleSheet.create({
  navBar: {
    height: 50,
    backgroundColor: '#7755CD',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedView: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
