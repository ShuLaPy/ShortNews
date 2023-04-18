import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import NewsCards from './NewsCards';
import NewsCategory from './NewsCategory';
import NewsWeb from './NewsWeb';
import {useDispatch, useSelector} from 'react-redux';
import Tts from 'react-native-tts';
import {stopPlaying} from '../redux/actions';

const Home = () => {
  const carouselRef = useRef(null);
  const viewpagerRef = useRef(null);

  const dispatch = useDispatch();
  const {isPlaying} = useSelector(state => state.shorts);

  const moveToPage = index => {
    viewpagerRef.current.setPage(index);
  };

  const handleTTS = data => {
    if (data.nativeEvent.position !== 1 && isPlaying) {
      Tts.stop();
      dispatch(stopPlaying());
    }
  };

  return (
    <ViewPager
      style={styles.container}
      initialPage={1}
      ref={viewpagerRef}
      onPageSelected={handleTTS}>
      <View key="1">
        <NewsCategory carouselRef={carouselRef} moveToPage={moveToPage} />
      </View>
      <View key="2">
        <NewsCards carouselRef={carouselRef} moveToPage={moveToPage} />
      </View>
      <View key="3">
        <NewsWeb moveToPage={moveToPage} />
      </View>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
