import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import NewsCards from './NewsCards';
import NewsCategory from './NewsCategory';
import NewsWeb from './NewsWeb';

const Home = () => {
  const carouselRef = useRef(null);
  const viewpagerRef = useRef(null);

  const moveToPage = (index) => {
    viewpagerRef.current.setPage(index);
  };

  return (
    <ViewPager style={styles.container} initialPage={1} ref={viewpagerRef}>
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
