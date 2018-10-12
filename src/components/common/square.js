import React, { Component } from 'react';
import { View, Text, Thumbnail, Icon } from 'native-base';
import { ImageBackground, Image } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';


export default class Square extends Component {

  HeaderText() {
    if (this.props.HeaderText) {
      return (
        <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
          <Text style={styles.text} >{this.props.HeaderText}</Text>
        </View>
      )
    } else {
      null
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.HeaderText()}
        <View style={styles.box} >

          <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 2 }}>
            <AutoHeightImage
              width={this.props.width}
              source={(this.props.status == true) ? this.props.ImgS : this.props.ImgU}
              style={{ marginTop: 20, alignSelf: 'center' }}
            />
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
            <Text style={{ color: '#266A8F', fontSize: 17,  textAlign: 'center', alignSelf: 'flex-end', marginBottom: 5,fontFamily:'Droid Arabic Kufi' }}>{this.props.InnerText}</Text>
          </View>

        </View>
      </View>
    );
  }
}

const styles = {
  text: {
    color: '#266A8F',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  box: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
}
