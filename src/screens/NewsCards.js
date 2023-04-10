import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import NewsCard from '../components/NewsCard';
import {fetchLatesthorts, setCurrentCard} from '../redux/actions';
import DoubleTapToClose from '../components/DoublePress';

const {width, height} = Dimensions.get('window');

const NewsCards = ({carouselRef, moveToPage}) => {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const shorts = useSelector((state) => state.shorts);
  const {shortsList} = shorts;

  const card = useSelector((state) => state.card);

  const renderItem = ({item, index}) => {
    return (
      <NewsCard
        key={String(index)}
        article={item}
        carouselRef={carouselRef}
        moveToPage={moveToPage}
      />
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
      <View style={styles.container}>
        <Image style={styles.image} source={require('./data-pana.png')} />
        <TouchableOpacity style={styles.button} onPress={fetchShorts}>
          <Text style={{color: 'white'}}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#E93457" />
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
      <DoubleTapToClose />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  button: {
    borderRadius: 25,
    backgroundColor: '#E93457',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
});

export default NewsCards;
