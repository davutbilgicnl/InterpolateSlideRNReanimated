import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import SlidePage from './SlidePage';

const IMAGES = [
  'https://images.unsplash.com/photo-1635492491273-455af7728453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1625014618427-fbc980b974f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1617360547704-3da8b5363369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
];

const InterpolateSlideWithAnimatedScrollView = () => {
  const offsetX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      offsetX.value = event.contentOffset.x;
      //   console.log('Scrolling: ', offsetX.value);
    },
    onMomentumBegin: (e) => {
      //   console.log('The list is moving.');
    },
    onMomentumEnd: (e) => {
      //   console.log('The list stopped moving.');
    },
  });
  return (
    <Animated.ScrollView onScroll={scrollHandler} horizontal style={styles.container} pagingEnabled>
      {IMAGES.map((url, index) => {
        return (
          <Animated.View key={index.toString()}>
            <SlidePage key={index.toString()} imgurl={url} index={index} offsetX={offsetX} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default InterpolateSlideWithAnimatedScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
