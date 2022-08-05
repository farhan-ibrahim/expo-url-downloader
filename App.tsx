import React , { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Item from './src/components/Item';

export default function App() {
  // Some requirements.
  // 1. The program can accept a single URI or a list of URIs to download
  // 2. It should be possible to configure download location as well as number of retries.
  // 2. It should support HTTP/HTTPS, FTP and SFTP
  // 3. It should be extensible. Please pay attention to how new protocols can be added
  // 4. It should handle retries and partial downloads. If a file fails to fully download then the partial files must be deleted
  // 5. It should support parallel downloads
  // 6. It should handle name clashes. If two different resources have the same name, both should download correctly. If the same resource is downloaded twice, it should overwrite the previous one
  // 7. Program architecture is important.
  // 8. Don't forget about tests.

 


  const [ urls, setUrls ] = useState(['http://techslides.com/demos/sample-videos/small.mp4']);
  const [ fileLocation, setFileLocation ] = useState(FileSystem.documentDirectoryPath + '/small.mp4');
  const [ progress , setProgress] = useState(0);
  const [ isDownloading, setIsDownloading ] = useState(false);
  const [ isPaused, setIsPaused ] = useState(false);


  const onAddNewUrl = () => {
    setUrls([...urls, '']);
  }

  const onRemoveUrl = () => {
    setUrls(urls.slice(0, urls.length - 1));
  }

  const onDownload = async () => {
    setIsDownloading(true);
    // const callback = downloadProgress => {
    //   const progress = Math.ceil(downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100;
    //   setProgress(progress);
    // };
    
    // const downloadResumable = FileSystem.createDownloadResumable(
    //   url,
    //   FileSystem.documentDirectory + 'small.mp4',
    //   {},
    //   callback
    // );

    // try {
    //   const { uri } = await downloadResumable.downloadAsync();
    //   console.log('Finished downloading to ', uri);
    // } catch (e) {
    //   console.error(e);
    // }

  }

  return (
    <View style={styles.container}>
      <Text>Enter url and start download!</Text>
      {urls.map((url , index) => {

        return(
          <Item 
            index={index} 
            url={url}
            isLast={index === urls.length - 1}
            multiple={urls.length > 1}
            onChange={input => setUrls([...urls, ...input])} // Require regex to validate url
            onAdd={onAddNewUrl}
            onRemove={onRemoveUrl}         
          />
        )
      })}
     
    

      <Pressable 
        disabled={urls.length < 0}
        onPress={onDownload}
        style={[styles.button , {backgroundColor: urls.length < 0 ? 'lightgray' :'lightblue'}]} 
      >
        <Text style={{color:urls.length < 0 ? 'white' : 'black'}} >Download</Text>
      </Pressable>
      <Pressable>

      </Pressable>
      {isDownloading && <Text>{`${progress} %`}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:16,
  },
  button:{
    padding:8,
    borderRadius:8,
  }
});
