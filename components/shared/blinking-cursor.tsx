import React from "react";
import { Text, StyleSheet } from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withTiming,
//   Easing,
// } from "react-native-reanimated";

const BlinkingCursor = () => {
  // const opacity = useSharedValue(1); // Shared value for opacity

  // Start the blinking animation
  // React.useEffect(() => {
  //   opacity.value = withRepeat(
  //     withTiming(0, {
  //       duration: 500, // Time to fade out
  //       easing: Easing.inOut(Easing.ease),
  //     }),
  //     -1, // Infinite repetitions
  //     true // Reverse direction (fade in and out)
  //   );
  // }, [opacity]);

  // Animated style for the blinking effect
  // const animatedStyle = useAnimatedStyle(() => ({
  //   opacity: opacity.value,
  // }));

  return (
    <Text>Blink</Text>
    // <Animated.Text style={[styles.answerCardText, animatedStyle]}>
    //   |
    // </Animated.Text>
  );
};

const styles = StyleSheet.create({
  answerCardText: {
    fontSize: 22, // Adjust size as needed
    fontWeight: "bold",
    color: "#111", // Cursor color
  },
});

export default BlinkingCursor;
