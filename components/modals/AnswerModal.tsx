import { CorrectAnswerSound, IncorrectAnswerSound } from '@/utils/audio';
import { COLORS } from '@/utils/constants/colors';
import { FONT_SIZES } from '@/utils/constants/typography';
import { useAudioPlayer } from '@/utils/hooks/useAudioPlayer';
import { Check, X } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, Modal } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
type AnswerAlertProps = {
  isCorrect?: boolean;
  visible: boolean;
};

export const ANSWER_SOUNDS = {
  correct: CorrectAnswerSound,
  incorrect: IncorrectAnswerSound,
} as const;

const { width, height } = Dimensions.get('window');
export default function AnswerModal({ isCorrect, visible }: AnswerAlertProps) {
  const opacity = useSharedValue(0);
  const iconScale = useSharedValue(0.8);
  const { play } = useAudioPlayer();
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const playAnswerFeedbackAudio = useCallback(async () => {
    try {
      if (isCorrect !== undefined) {
        const result = isCorrect ? 'correct' : 'incorrect';
        await play(ANSWER_SOUNDS[result]);
      }
    } catch (error) {
      console.warn('Failed to play answer audio:', error);
    }
  }, [isCorrect]);

  useEffect(() => {
    if (visible) {
      playAnswerFeedbackAudio();
      opacity.value = withTiming(1, { duration: 250 });
      iconScale.value = withSpring(1, { damping: 12, stiffness: 120 });
    } else {
      opacity.value = withTiming(0, { duration: 250 });
      iconScale.value = withTiming(0);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.modalContainer, containerStyle]}>
        <Animated.View style={[styles.modalContent]}>
          {isCorrect ? (
            <View style={[styles.iconContainer, iconStyle]}>
              <Check size={FONT_SIZES.xxl * 4} color={COLORS.success} />
            </View>
          ) : (
            <View style={[styles.iconContainer, iconStyle]}>
              <X size={FONT_SIZES.xxl * 4} color={COLORS.error} />
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.5,
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.gray500,
    backgroundColor: COLORS.backgroundDark,
  },
});
// export default React.memo(AnswerModal, (prev, next) =>
//   prev.visible === next.visible && prev.isCorrect === next.isCorrect
// )
