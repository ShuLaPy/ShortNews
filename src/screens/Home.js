import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import NewsCards from './NewsCards';
import NewsCategory from './NewsCategory';
import NewsWeb from './NewsWeb';

const Home = () => {
  const carouselRef = useRef(null);
  return (
    <ViewPager style={styles.container} initialPage={1}>
      <View key="1">
        <NewsCategory carouselRef={carouselRef} />
      </View>
      <View key="2">
        <NewsCards carouselRef={carouselRef} />
      </View>
      <View key="3">
        <NewsWeb />
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
