import axios from 'axios';
import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import NewsCard from '../components/NewsCard';

const {width, height} = Dimensions.get('window');

const NewsCards = () => {
  const carouselRef = useRef(null);
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);

  const renderItem = ({item, index}) => {
    return <NewsCard key={String(index)} article={item} />;
  };

  const onSlideChange = (index) => {
    console.log(index);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://192.168.0.189:3000/shorts?category=all_news')
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log('erro');
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading Data ...</Text>
      ) : (
        <Carousel
          data={articles}
          renderItem={renderItem}
          sliderWidth={width}
          sliderHeight={height}
          itemWidth={width}
          itemHeight={height}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          vertical={true}
          swipeThreshold={70}
          nestedScrollEnabled
          windowSize={5}
          onSnapToItem={onSlideChange}
          // ListEmptyComponent={<ShortsLoader />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsCards;
