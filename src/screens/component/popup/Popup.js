import React from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
    };
  }

  action(state) {
    this.setState({modalState: state});
  }

  render() {
    return (
      <View>
        <View style={{flex: 1}}>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              this.action(false);
            }}
            visible={this.state.modalState}>
            <View style={styles.background}>
              <View style={this.props.style}>{this.props.children}</View>
              <View style={styles.closeButtonView}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    this.action(false);
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'red',
    flex: 1,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17.5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  closeButtonView: {
    height: 35,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
});
