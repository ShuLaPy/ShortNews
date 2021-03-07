import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-progress/Bar';
import {WebView} from 'react-native-webview';
import Url from 'url-parse';
import {useSelector} from 'react-redux';

// E93457;
const NewsWeb = ({moveToPage}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [progressBar, setProgressBar] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});

  const shorts = useSelector((state) => state.shorts);
  const {shortsList} = shorts;
  const card = useSelector((state) => state.card);

  const getHostName = (url) => {
    var loc = new Url(url);
    return loc.hostname;
  };

  useEffect(() => {
    const backAction = () => {
      moveToPage(1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (shortsList) setSelectedCard(shortsList[card]);
  }, [card, shortsList]);

  if (shortsList.length === 0 || !selectedCard) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E93457" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => moveToPage(1)}>
          <MaterialIcons name="arrow-back-ios" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={{color: 'white'}}>
          {getHostName(selectedCard?.source_url)}
        </Text>
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
        source={{uri: selectedCard.source_url}}
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
