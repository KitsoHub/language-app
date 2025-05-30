import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { colors } from '@/utils/constants/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useAudioPlayer } from '@/utils/hooks/useAudioPlayer';
import { WinSound, GoodJobSound } from '@/utils/audio';

type MascotAlertProps = {
  isCorrect?: boolean;
  visible: boolean;
};

export const MASCOT_SOUNDS = {
  correct: WinSound,
  incorrect: GoodJobSound,
} as const;

export default function MascotAlert({ isCorrect, visible }: MascotAlertProps) {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const shake = useSharedValue(0);
  const { play } = useAudioPlayer();

   const playFeedbackAudio = useCallback(async () => {
    try {
      if (isCorrect !== undefined) {
        const result = isCorrect ? 'correct' : 'incorrect';
        await play(MASCOT_SOUNDS[result]);
      }
    } catch (error) {
      console.warn('Failed to play mascot audio:', error);
    }
  }, [isCorrect, play]);

  useEffect(() => {
    if (visible) {
      playFeedbackAudio()
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 12 });

      if (!isCorrect && Platform.OS !== 'web') {
        shake.value = withSequence(
          withTiming(-5, { duration: 100 }),
          withTiming(5, { duration: 100 }),
          withTiming(-5, { duration: 100 }),
          withTiming(5, { duration: 100 }),
          withTiming(0, { duration: 100 }),
        );
      }
    } else {

      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(100, { duration: 300 });
    }
  }, [visible, isCorrect]);

  const animatedStyle =
    Platform.OS !== 'web'
      ? useAnimatedStyle(() => {
          return {
            transform: [
              { translateY: translateY.value },
              { translateX: shake.value },
            ],
            opacity: opacity.value,
          };
        })
      : {};

  const mascotImageUrl = isCorrect
    ? require('@/assets/alertMascots/correct_answer_avatar.jpeg')
    : require('@/assets/alertMascots/incorrect_avatar.jpeg');

  if (Platform.OS === 'web') {
    return visible ? (
      <View style={styles.container}>
        <View
          style={[
            styles.bubble,
            isCorrect ? styles.correctBubble : styles.incorrectBubble,
          ]}
        >
          <Text style={styles.bubbleText}>
            {isCorrect ? 'Great job! 🎉' : 'Try again! 🤔'}
          </Text>
        </View>
        <Image source={mascotImageUrl} style={styles.mascotImage} />
      </View>
    ) : null;
  }
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        style={[
          styles.bubble,
          isCorrect ? styles.correctBubble : styles.incorrectBubble,
        ]}
      >
        <Text style={styles.bubbleText}>
          {}
          {isCorrect ? 'Great job! 🎉' : 'Try again! 🤔'}
        </Text>
      </View>
      <Image style={styles.mascotImage} source={mascotImageUrl} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  correctBubble: {
    backgroundColor: colors.success,
  },
  incorrectBubble: {
    backgroundColor: colors.error,
  },
  bubbleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  mascotImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.mascotBackground,
  },
});
