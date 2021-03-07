import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import NewsCard from '../components/NewsCard';
import {fetchLatesthorts, setCurrentCard} from '../redux/actions';

const {width, height} = Dimensions.get('window');

const NewsCards = ({carouselRef}) => {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const shorts = useSelector((state) => state.shorts);
  const {shortsList} = shorts;

  const card = useSelector((state) => state.card);

  const renderItem = ({item, index}) => {
    return (
      <NewsCard key={String(index)} article={item} carouselRef={carouselRef} />
    );
  };

  const onSlideChange = (index) => {
    console.log(index);
    dispatch(setCurrentCard(index));
  };

  const fetchShorts = () => {
    setLoading(true);
    dispatch(fetchLatesthorts('all_news'))
      .then((resp) => {
        console.log('Response : ', resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error : ', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  useEffect(() => {
    setArticles(shortsList);
    console.log('ShortLists : ', shortsList);
  }, [shortsList]);

  if (shortsList.length === 0) {
    return (
      <Pressable style={styles.container} onPress={fetchShorts}>
        <Text>No data Present</Text>
      </Pressable>
    );
  }

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
          firstItem={card}
          ref={carouselRef}
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
