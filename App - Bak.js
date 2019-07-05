import React, { Component } from 'react'
import { Button, StyleSheet, View, TextInput, Text, Image } from 'react-native'
//import { getPixels } from './mnist'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
//import ImageResizer from 'react-native-image-resizer'

var net = require('react-native-tcp');
//var client = net.createConnection(12345);

export default class example extends Component {
  state = {
    detectedDigit: null,
    drawnImage: 'data:image/jpg;base64,'
  }
  tcpserver = {
    host:'192.168.43.247',//10.0.1.1',
    port: 9999
}
  maxScore(obj) {
    let maxKey = 0
    let maxValue = 0

    Object.entries(obj).forEach(entry => {
      const value = entry[1]
      if (value > maxValue) {
        maxValue = value
        maxKey = parseInt(entry[0], 10)
      }
    })

    return maxKey
  }

  grabPixels = () => {
    this.canvas.getBase64('jpg', false, true, false, false, (err, result) => {
      const resultImage = `data:image/jpg;base64,${result}`
      this.setState({ drawnImage: resultImage })
      console.log(result)
      // let server = net.createServer((socket) => {
      //   this.updateChatter('server connected on ' + JSON.stringify(socket.address()));
  
      //   socket.on('data', (data) => {
      //     this.updateChatter('Server Received: ' + data);
      //     socket.write('Echo server\r\n');
      //   });
      // });

  //    ImageResizer.createResizedImage(resultImage, 28, 28, "JPEG", 80)
        //.then(drawnImage => {
		    //RNFetchBlob.fs
		    //.readFile(responseImage.path, "base64")
		  //   .then(resizeImage => {
      //   this.setState({ drawnImage : resizeImage });
      //   console.log(drawnImage)
		  // })
		  //   .catch(err => {
		  //   console.log(err);
      // });
      

    })
  }

      // getPixels(resultImage)
      //   .then(values => {
      //     console.log(values)
      //     //const detection = net.run(values)
      //     //this.setState({ detectedDigit:1 })
      //   })
      //   .catch(console.error)
  
  clear = () => {
    this.canvas.clear()
    this.setState({ detectedDigit: null, drawnImage: 'data:image/jpg;base64,' })
  }

  printResults = () => {
    return (
        <View style={styles.rows}>
          <Text>28x28 version the computer sees =</Text>
          <Image
            style={styles.previewImage}
            source={{ uri: this.state.drawnImage }}
          />
          {/* <Text style={styles.resultNumber}>{`${this.state.detectedDigit}`}</Text> */}
      </View>
    )
  }

  onsend = () =>{
    // var ws = new WebSocket('ws://192.168.0.106');
    // console.log(this.state.drawnImage)
    // let client = net.createConnection(this.tcpserver.host, () => {
    //   //this.updateChatter('opened client on ' + JSON.stringify(client.host()));
    //   console.log(this.tcpserver)
    //   client.write('Hello, server! Love, Client.');
    // })
    // net.connect{
    //   this.tcpserver.host,
    //   this.tcpserver.port
    // }
    var client = net.createConnection(this.tcpserver.port, this.tcpserver.host);
    var imagesend = this.state.drawnImage
    client.on('data', function(data) {
      // Log the response from the HTTP server.
      console.log('RESPONSE: ' + data);
    }).on('connect', function() {
      // Manually write an HTTP request.
      client.write(imagesend);
      console.log('Image : ' + imagesend)
      //console.log('CONNECTED : ' + tcpserver.host + ' ' + tcpserver.port);
    }).on('end', function() {
      console.log('DONE');
      client.close();
    });

  };
    // ws.onopen = () => {
    //   // connection opened
    //   ws.send('stome'); // send a message
    // };
    
    // ws.onmessage = (e) => {
    //   // a message was received
    //   console.log(e.data);
    //   this.setState({detectedDigit: e.data})
    // };
    // ws.onerror = (e) => {
    //   // an error occurred
    //   console.log(e.message);
    // };
    
    // ws.onclose = (e) => {
    //   // connection closed
    //   console.log(e.code, e.reason);
    // };


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <SketchCanvas
            ref={ref => (this.canvas = ref)}
            style={{
              width: 280,
              height: 280,
              borderColor: 'black',
              marginTop: 30,
              //borderWidth: 1
            }}
            strokeColor={'#000000'}
            strokeWidth={28}
            onStrokeEnd={this.grabPixels}
          />

          <Button title="Hapus" onPress={this.clear} />
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
