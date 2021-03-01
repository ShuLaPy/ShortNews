import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-progress/Bar';
import {WebView} from 'react-native-webview';

// E93457;
const NewsWeb = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [progressBar, setProgressBar] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <MaterialIcons name="arrow-back-ios" size={16} color="#fff" />
        <Text style={{color: 'white'}}>www.google.com</Text>
        <MaterialCommunity name="dots-vertical" size={16} color="#fff" />
      </View>
      {progressBar && (
        <ProgressBar
          style={{borderRadius: 0}}
          borderWidth={0}
          color="#E93457"
          progress={loadingProgress}
          width={null}
          height={4}
        />
      )}
      <WebView
        source={{uri: 'https://amazon.in'}}
        onError={() => alert('Error Occured')}
        onLoadProgress={({nativeEvent}) =>
          setLoadingProgress(nativeEvent.progress)
        }
        onLoadEnd={() => setProgressBar(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#000',
  },
});

export default NewsWeb;
