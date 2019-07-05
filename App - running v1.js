import React, { Component } from 'react'
import { Button, StyleSheet, View, TextInput, NativeModules, Text, Image } from 'react-native'
//import getPixels  from './mnist'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
// import console = require('console');
//import ImageResizer from 'react-native-image-resizer'
//import { getPixelRGBA } from 'react-native-get-pixel'
//import { NativeModules } from 'react-native';

//var getPixels = require("get-pixels");
var net = require('react-native-tcp');
//var client = net.createConnection(12345);


export default class example extends Component {
  state = {
    detectedDigit: null,
    drawnImage: 'data:image/jpg;base64,',
    strsend : ''
  }
  tcpserver = {
    host:  '192.168.0.106',//'167.205.24.75',//10.0.1.1',
    port: 9999
  }

  grabPixels = () => {
    this.canvas.getBase64('jpg', false, true, false, false, (err, result) => {
      const resultImage = `data:image/jpg;base64,${result}`
      this.setState({ strsend : result})
      this.setState({ drawnImage: resultImage })
      //console.log(result)
      // getPixels(resultImage)
      // .then(values => console.log(values)) // [243, 123, 0]
      // .catch(err => {console.log(err)});
    })
  }
    // getPixels(this.drawnImage, (err, color) => {//MNISTPixels
    //   if (err) return reject(err)
    //   console.log(color)
    // })
  //   getPixels(this.drawnImage, (err, pixels) => {
  //   if(err) {
  //     console.log("Bad image path")
  //   return
  // }
  //   console.log("got pixels", pixels.shape.slice())
// })
    // }
  
  handleIP = (text) =>{
    this.setState({host: text})    
  }

   
  clear = () => {
    this.canvas.clear()
    this.setState({ detectedDigit: null, drawnImage: 'data:image/jpg;base64,' })
  }

  printResults = () => {
    return (
        <View style={styles.rows}>
          <Text>hasil gambar 28x28 =</Text>
          <Image
            style={styles.previewImage}
            source={{ uri: this.state.drawnImage }}
          />
          <Text style={styles.resultNumber}>{`${this.state.detectedDigit}`}</Text>
      </View>
      
    )
  }

  onsend = () =>{
    var client = net.createConnection(this.tcpserver.port, this.tcpserver.host);
    var imagesend = this.state.strsend //this.state.drawnImage    \
    
    client.on('connect', (data) => {
      client.write(imagesend);
      console.log('CONNECTED send image');
    }).on('data', (data) => {
      this.setState({detectedDigit : data});
      console.log('data : ' + data)
      // client.close();
    }).on('end', ()=> {
      console.log('done')
      client.close();
    });
  };
   

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <SketchCanvas
            ref={ref => (this.canvas = ref)}
            style={{
              width: 280,
              height: 280,
              borderColor: 'white',
              //marginTop: 30,
              //borderWidth: 1
            }}
            strokeColor={'#000000'}
            strokeWidth={28}
            onStrokeEnd={this.grabPixels}
          />
          <Button title="Hapus" onPress={this.clear} />
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.tcpserver.host}
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleIP}/>
          <Button title="Kirim" onPress={this.onsend} />
          {this.printResults()}
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  previewImage: {
    width: 28,
    height: 28
  },
  rows: {
    flexDirection: 'row'
  },
  resultSentence: {
    textAlign: 'center',
    fontSize: 24
  },
  resultNumber: {
    textAlign: 'center',
    fontSize: 128
  },
  functionButton: {
    width: 280, height: 140, borderRadius: 15,
  }
})
