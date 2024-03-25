// import { OTSession } from 'opentok-react-native';
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewTest = () => {
  // HTML content to be displayed in the WebView
  const [result, setResult] = useState(null);


  const handleMessage = (msg) => {
    console.log("message ", msg.nativeEvent?.data);
  }

  const getPermissions = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message:
          "App needs access to your camera " +
          "so others can see you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
    console.log("RECORD AUDIO Permission");
    let result2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Camera Permission",
        message:
          "App needs access to your camera " +
          "so others can see you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      });
    console.log({ result2 });

  }

  useEffect(() => {
    //getPermissions();

  }, [])


  const htmlContent = `
  <html lang="en">
  <head>
    <title>W3.CSS Template</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    cameras: <br>
    <ul></ul>
    <br>
    <video autoplay muted playsinline></video>
    <script>
        const listEl = document.querySelector("ul")

const renderOptions = (currentDeviceId, devices) => {  
  listEl.innerHTML = ""
    
  devices
    .filter(deviceInfo => deviceInfo.kind === "videoinput")    
    .map(({ label, deviceId }) => {
      const el = document.createElement('li')
      
      if (deviceId == currentDeviceId)
        el.innerHTML = '<a href="#" onclick="selectCamera(\''+deviceId+'\')">'+label+'}</a> [PREFERRED]'
      else
        el.innerHTML = '<a href="#" onclick="selectCamera(\''+deviceId+'\')">'+label+'</a>'
        
      return el
    })
    .forEach(el => listEl.appendChild(el))
}


let stream

const selectCamera = async deviceId => {
  try {
    console.log(deviceId)
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    
    const videoConstraints = {};
    if (!deviceId) {
       videoConstraints.facingMode = 'environment';
    } else {
       videoConstraints.deviceId = { exact: deviceId };
    }

    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: videoConstraints,
    })

    const videoEl = document.querySelector('video')
    videoEl.srcObject = stream

    const [ videoTrack ] = stream.getVideoTracks()

    renderOptions(
      videoTrack.getSettings().deviceId, 
      await navigator.mediaDevices.enumerateDevices()
    )
  } catch (error) {
    console.error(error)
  }
}

selectCamera()

    </script>
</body>
</html>

  
  `;



  return (
    <WebView
      onError={(err) => console.log("Error ", err)}
      onMessage={handleMessage}

      javaScriptEnabled={true}
      // source={{
      //   html: `
      //   <html lang="en">
      //     <head>
      //       <title>W3.CSS Template</title>
      //       <meta charset="UTF-8">
      //       <meta name="viewport" content="width=device-width, initial-scale=1">
      //       <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
      //     </head>
      //     <body>
      //         <h3>Test</h3>
      //         <button onclick="window.ReactNativeWebView.postMessage('button clicked')" >Click</button>
      //         <button onclick="startCapture()"> Capture</button>
      //         <br />
      //         <p id="hello">Hello<p>
      //         <video id="videoElement" style="width:100%; height:400px;border:" autoplay playsinline></video>
      //         <script>
      //           // Accessing the user's camera stream
      //           document.getElementById("hello").innerHTML = 'Hello World';


      //           if(navigator){

      //             window.ReactNativeWebView.postMessage("navigator is available");

      //             try {

      //               if(navigator.mediaDevices){
      //                 window.ReactNativeWebView.postMessage("navigator mediaDevices is available");
      //               }else {
      //                 window.ReactNativeWebView.postMessage("navigator mediaDevices is not available");
      //               }

      //             }catch(err){
      //               window.ReactNativeWebView.postMessage("navigator err: ");

      //             }

      //           }else {

      //             window.ReactNativeWebView.postMessage("navigator is not available");

      //           }


      //           function startCapture(){


      //             window.ReactNativeWebView.postMessage("start camera");
      //             try{
      //             navigator.mediaDevices.getUserMedia({ video: true })
      //             .then(function(stream) {
      //               window.ReactNativeWebView.postMessage("received stream");

      //               var videoElement = document.getElementById('videoElement');
      //                 videoElement.srcObject = stream;
      //             })
      //             .catch(function(err) {
      //               window.ReactNativeWebView.postMessage("Error accessing camera");
      //             });



      //           }catch(err){
      //             window.ReactNativeWebView.postMessage("Error accessing camera "+navigator.mediaDevices);
      //             window.ReactNativeWebView.postMessage(err?.message);


      //           }

      //           }

      //           $(document).ready(function(){
      //             window.ReactNativeWebView.postMessage(" document is ready");
      //             document.getElementById("hello").innerHTML = 'Hello World';

      //           })
      //         </script>


      //       </body>
      //     </html>
      //   `
      // }}
      // source={{
      //   uri: "https://codepen.io/gruhn/pen/qBbONjm"
      // }}
      source={{
        // html: htmlContent
        uri: "http://127.0.0.1:5500/src/components/"
      }}
    />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1

  },
});

export default WebViewTest;
