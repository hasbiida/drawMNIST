import { NativeModules } from 'react-native';
module.exports = NativeModules.getPixels;
// export const getPixels = path =>
//   new Promise((resolve, reject) => {
//     NativeModules.MNISTPixels.getPixels(path, (err, color) => {//MNISTPixels
//       if (err) return reject(err)
//       resolve(color)
//     })
//   })

// export default {
//   getPixels
// }