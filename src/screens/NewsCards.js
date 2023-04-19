import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import NewsCard from '../components/NewsCard';
import {fetchLatesthorts, setCurrentCard} from '../redux/actions';
import DoubleTapToClose from '../components/DoublePress';

const {width, height} = Dimensions.get('window');

const NewsCards = ({carouselRef, moveToPage}) => {
  const [articles, setArticles] = useState();
  const dispatch = useDispatch();

  const shorts = useSelector(state => state.shorts);
  const {shortsList, loading} = shorts;

  const card = useSelector(state => state.card);

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

  const onSlideChange = index => {
    console.log(index);
    dispatch(setCurrentCard(index));
  };

  const fetchShorts = () => {
    dispatch(fetchLatesthorts('all_news')).catch(err => {
      console.log('Error : ', err);
    });
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  useEffect(() => {
    setArticles(shortsList);
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
          loop={false}
          data={articles || []}
          renderItem={renderItem}
          width={width}
          height={height}
          vertical={true}
          ref={carouselRef}
          defaultIndex={card}
          onSnapToItem={onSlideChange}
          windowSize={3}
          overscrollEnabled={false}
          panGestureHandlerProps={{
            activeOffsetY: [-10, 10],
          }}
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
