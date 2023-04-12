import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ViewShot from 'react-native-view-shot';
import ImageMarker from 'react-native-image-marker';
// import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToBookmarks,
  fetchLatesthorts,
  removeFromBookmarks,
} from '../redux/actions';

const BOTTOM_HEIGHT = Dimensions.get('window').height / 10;

const NewsCard = ({article, carouselRef, moveToPage}) => {
  const viewRef = useRef();
  const [show, setShow] = useState(false);
  const [bottomHeight, setBottomHeight] = useState(
    new Animated.Value(BOTTOM_HEIGHT),
  );

  const dispatch = useDispatch();
  const category = useSelector(state => state.category);
  const {bookmarks} = useSelector(state => state.shorts);

  const card = useSelector(state => state.card);

  const firstCard = () => {
    carouselRef.current.snapToItem(0);
  };

  const refreshShorts = () => {
    dispatch(fetchLatesthorts(category)).then(response =>
      console.log(response.data),
    );
  };

  const onPress = () => {
    if (!show) {
      Animated.spring(bottomHeight, {
        toValue: 0,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(bottomHeight, {
        toValue: BOTTOM_HEIGHT,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
    setShow(!show);
  };

  const shareImage = async () => {
    try {
      // capture component
      // const uri = await captureRef(viewRef, {
      //   format: 'png',
      //   quality: 0.8,
      // });

      const uri = await viewRef.current.capture();

      ImageMarker.markText({
        src: uri,
        text: 'ShortNews',
        position: 'bottomRight',
        color: '#E93457',
        fontName: 'Arial-BoldItalicMT',
        fontSize: 44,
        scale: 1,
        quality: 100,
      }).then(res => {
        const options = {
          title: 'Share Image',
          url: 'file://' + res,
        };
        // share
        Share.open(options);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const addToBookMark = article => {
    if (!isBookMarked(article)) {
      dispatch(addToBookmarks(article));
    } else {
      dispatch(removeFromBookmarks(article));
    }
  };

  const isBookMarked = article => {
    return bookmarks.some(post => post.title === article.title);
  };

  return (
    <View style={styles.container}>
      {show && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 500,
            backgroundColor: 'white',
            width: '100%',
            height: Dimensions.get('window').height / 15,
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            alignItems: 'center',
            borderBottomEndRadius: 5,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={() => moveToPage(0)}>
            <MaterialIcons name="arrow-back-ios" size={18} color="blue" />
          </TouchableOpacity>
          <Text style={{fontWeight: '700', color: '#E93457', fontSize: 20}}>
            ShortNews
          </Text>
          {card === 0 ? (
            <TouchableOpacity onPress={refreshShorts}>
              <MaterialIcons name="refresh" size={18} color="blue" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={firstCard}>
              <MaterialIcons name="vertical-align-top" size={18} color="blue" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <ViewShot
            ref={viewRef}
            options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}
            collapsable={false}
            style={{flex: 8.5, width: '100%'}}>
            <View style={styles.media}>
              <FastImage
                style={{flex: 1}}
                source={{
                  uri: article.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.content}>
              <TouchableOpacity onPress={() => addToBookMark(article)}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontWeight: '500',
                    fontSize: 18,
                    lineHeight: 25,
                    color: isBookMarked(article) ? 'pink' : 'rgb(0,0,0)',
                  }}>
                  {article.title}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontWeight: '400',
                  fontSize: 16,
                  marginTop: 7,
                  lineHeight: 25,
                  color: 'grey',
                }}>
                {article.content}
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  fontWeight: '300',
                  fontSize: 14,
                  marginTop: 5,
                  color: 'grey',
                  opacity: 0.7,
                }}>
                {article.byline}
              </Text>
            </View>
          </ViewShot>
          <ImageBackground
            source={{
              uri: article.image,
            }}
            style={styles.footer}
            blurRadius={5}
            opacity={0.2}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto-Regular',
                fontWeight: '700',
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {article.bottom_headline}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto-Light',
                fontWeight: '300',
                fontSize: 13,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {article.bottom_text}
            </Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 500,
          transform: [{translateY: bottomHeight}],
          backgroundColor: 'white',
          width: '100%',
          height: Dimensions.get('window').height / 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          borderTopWidth: 1,
        }}>
        <TouchableOpacity onPress={shareImage}>
          <MaterialIcons name="share" size={25} color="green" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    backgroundColor: 'red',
  },
  media: {
    backgroundColor: 'blue',
    flex: 3.5,
  },
  content: {
    backgroundColor: 'white',
    flex: 5,
    padding: 20,
  },
  footer: {
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    backgroundColor: '#262626',
    flex: 0.8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default NewsCard;
