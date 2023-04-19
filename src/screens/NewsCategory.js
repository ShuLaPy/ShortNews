import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLatesthorts,
  setCategory,
  fetchLatestBookmarks,
  setLanguage,
} from '../redux/actions';
import Tts from 'react-native-tts';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const MARGIN_HORIZONTAL = 24;
const ITEM_WIDTH = (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2) / 3;

const CATEGORIES = [
  {
    id: 'top_stories',
    icon: 'https://inshorts.com/assets/images/cat_top_stories.png',
    label: 'TOP STORIES',
  },
  {
    id: 'all_news',
    icon: 'https://inshorts.com/assets/images/cat_all_news.png',
    label: 'ALL NEWS',
  },
  {
    id: 'trending',
    icon: 'https://inshorts.com/assets/images/cat_trending.png',
    label: 'TRENDING',
  },
  {
    id: 'bookmarks',
    icon: 'https://inshorts.com/assets/images/cat_bookmarks.png',
    label: 'BOOKMARKS',
  },
];

const NewsCategory = ({carouselRef, moveToPage}) => {
  const [list, setList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const {language} = useSelector(state => state.shorts);
  const selectedCategory = useSelector(state => state.category);

  const fetchShorts = category => {
    console.log('Selected Category', category);
    dispatch(fetchLatesthorts(category))
      .then(response => {
        moveToPage(1);
      })
      .catch(error => console.log(error));
    dispatch(setCategory(category));
  };

  const fetchBookmarks = category => {
    dispatch(fetchLatestBookmarks())
      .then(response => {
        moveToPage(1);
      })
      .catch(error => console.log(error));
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
    axios
      .get('https://inshorts.com/api/en/search/trending_topics')
      .then(response => {
        setList(response.data.data.trending_tags);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const setNewsLanguage = item => {
    dispatch(setLanguage(item.code));
    setIsFocus(false);
    dispatch(fetchLatesthorts(selectedCategory)).catch(err => console.log(err));
    Tts.setDefaultLanguage(item.voice);
  };

  const data = [
    {name: 'Marathi', code: 'mr', voice: 'mr-IN'},
    {name: 'Hindi', code: 'hi', voice: 'hi-IN'},
    {name: 'Kannada', code: 'kn', voice: 'kn-IN'},
    {name: 'Tamil', code: 'ta', voice: 'ta-IN'},
    {name: 'Telugu', code: 'te', voice: 'te-IN'},
    {name: 'Malayalam', code: 'ml', voice: 'ml-IN'},
    {name: 'Gujarati', code: 'gu', voice: 'gu-IN'},
    {name: 'English', code: 'en', voice: 'en-US'},
    {name: 'French', code: 'fr', voice: 'fr-FR'},
    {name: 'German', code: 'de', voice: 'de-DE'},
    {name: 'Japanese', code: 'ja', voice: 'ja-JP'},
    {name: 'Russian', code: 'ru', voice: 'ru-RU'},
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>CATEGORIES</Text>
        <View style={styles.divider} />
        <FlatList
          style={{marginTop: 15}}
          data={CATEGORIES}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <Pressable
                key={String(item.id)}
                onPress={() =>
                  item.id !== 'bookmarks'
                    ? fetchShorts(item.id)
                    : fetchBookmarks()
                }
                style={{
                  marginHorizontal: 20,
                  marginVertical: 8,
                  alignItems: 'center',
                }}>
                <FastImage
                  source={{uri: item.icon}}
                  style={{
                    height: SCREEN_WIDTH / 10,
                    width: SCREEN_WIDTH / 10,
                    marginBottom: 15,
                  }}
                />
                <Text style={{color: '#000'}}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
        <Text style={styles.title}>SUGGESTED TOPICS</Text>
        <View style={styles.divider} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginBottom: 25,
            marginTop: 15,
          }}>
          {list.map(topic => {
            return (
              <View key={topic.tag} style={styles.menuOuterWrapper}>
                <TouchableOpacity
                  onPress={() => fetchShorts(topic.tag)}
                  style={[
                    styles.menuInnerWrapper,
                    {
                      height: styles.menuOuterWrapper.height,
                      position: 'relative',
                      overflow: 'hidden',
                      shadowColor: 'blue',
                      shadowRadius: 5,
                      shadowOffset: {
                        width: 0,
                        height: 15,
                      },
                      shadowOpacity: 1,
                      elevation: 4,
                    },
                  ]}>
                  <FastImage
                    style={{flex: 1}}
                    source={{
                      uri: topic.image_url,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text
                    style={styles.topicLabel}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {topic.label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Text style={styles.title}>SELECT NEWS LANGUAGE</Text>
        <View style={styles.divider} />
        <Dropdown
          data={data}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          placeholder={!isFocus ? 'Select Language' : '...'}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          labelField="name"
          valueField="code"
          value={language}
          onChange={item => setNewsLanguage(item)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  title: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'Roboto-Black',
    fontWeight: '900',
    color: '#585858',
  },
  divider: {
    width: 25,
    height: 2,
    backgroundColor: '#585858',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  menuOuterWrapper: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.3,
    paddingHorizontal: 5,
    marginVertical: 8,
  },
  menuInnerWrapper: {
    borderColor: '#369af8AA',
    borderWidth: 1,
    borderRadius: 5,
  },
  topicLabel: {
    position: 'absolute',
    color: '#000',
    left: 5,
    right: 0,
    bottom: 0,
    marginHorizontal: 6,
    marginVertical: 6,
    fontSize: 14,
    fontFamily: 'bold',
    fontWeight: '700',
  },
  dropdown: {
    height: 50,
    marginBottom: 20,
    borderColor: '#369af8AA',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default NewsCategory;
