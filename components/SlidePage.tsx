import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface SlidePageProps {
  imgurl: string;
  index: number;
  offsetX?: SharedValue<number>;
  offsetY?: SharedValue<number>;
}

const { height, width } = Dimensions.get('window');

const SQUARE_SIZE = width * 0.9;

const SlidePage: React.FC<SlidePageProps> = ({ index, imgurl, offsetX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const reanimatedStlye = useAnimatedStyle(() => {
    const scale = interpolate(offsetX?.value!, inputRange, [0, 1, 0], Extrapolation.CLAMP);
    const borderRadius = interpolate(offsetX?.value!, inputRange, [0, SQUARE_SIZE, 0]);

    const shadowStyle =
      Platform.OS === 'ios'
        ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.6,
            shadowRadius: 6,
          }
        : {
            elevation: 6,
            shadowColor: '#000',
          };

    return {
      borderRadius,
      transform: [{ scale }],
      ...shadowStyle,
    };
  });

  const reanimatedImageStyle = useAnimatedStyle(() => {
    const imageSize = interpolate(
      offsetX?.value!,
      inputRange,
      //   [SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE],
      Array(3).fill(SQUARE_SIZE),
      Extrapolation.CLAMP
    );

    return {
      width: imageSize,
      height: imageSize,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: `rgba(255,99,71, 0.2)` }]}>
      <Animated.View style={[styles.square, reanimatedStlye]} />
      <Animated.Image
        style={[styles.image, reanimatedStlye, reanimatedImageStyle]}
        source={{ uri: imgurl }}
      />
    </View>
  );
};

export default SlidePage;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SQUARE_SIZE,
    width: SQUARE_SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
  },
});
