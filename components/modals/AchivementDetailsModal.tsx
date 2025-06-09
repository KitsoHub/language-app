import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAchievementsStore } from '@/store/achivement-store';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/utils/constants/colors';
import { X, Lock, Check } from 'lucide-react-native';
import { FONT_SIZES, FONT_WEIGHTS, MARGIN } from '@/utils/constants';
import LottieView from 'lottie-react-native';
import { useAuthStore } from '@/store/auth-store';
import { achievements } from '@/mocks/achievements';
import { Achievement } from '@/types';

const { width } = Dimensions.get('window');
export default function AchivementDetailsModal() {
  const { selectedAchivement, clearSelected } =
    useAchievementsStore();

  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const iconScale = useSharedValue(0);
  const user = useAuthStore((state) => state.user);
  const userAchievements = user?.unlockedAchievements || [];

  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<LottieView>(null);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const defaultAnimation = require('@/assets/lotties/trophy.json');

  const isAchievementUnlocked = useCallback(
    (achievementId: string) => userAchievements.includes(achievementId),
    [userAchievements],
  );



  const handleModalClose = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.8, { duration: 200 });
    iconScale.value = withTiming(0, { duration: 150 });

    animationRef.current?.pause();

    setTimeout(() => {
      clearSelected();
      setIsAnimating(false);
    }, 250);
  }, [isAnimating, clearSelected, opacity, scale, iconScale]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedAchivement && !isAnimating) {
      setIsAnimating(true);
      opacity.value = withTiming(0.9, { duration: 300 });
      scale.value = withSpring(1, { damping: 12 });
      rotate.value = withSequence(
        withDelay(100, withTiming(-10,{ duration: 10 })),
        withTiming(10, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(5, { duration: 100 }),
        withTiming(0, { duration: 100 }),
      );

      iconScale.value = withDelay(400, withSpring(1.2, { damping: 12 }));

      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [selectedAchivement]);

  useEffect(() => {
    return () => {
      animationRef.current?.pause();
    };
  }, []);

  if (!selectedAchivement) return null;

  return (
    <Modal
      transparent={true}
      animationType="none"
      onRequestClose={handleModalClose}
    >
      <Animated.View style={[styles.modalContainer, containerStyle]}>
		 <Pressable
          style={styles.backdrop}
          onPress={handleModalClose}
          disabled={isAnimating}
        />
        <Animated.View style={[styles.modalContent, cardStyle]}>
          <Pressable
            onPress={handleModalClose}
            style={styles.closeButton}
            hitSlop={24}
			 disabled={isAnimating}
          >
            <X size={24} color={COLORS.text} />
          </Pressable>

          {isAchievementUnlocked(selectedAchivement.id) ? (
            <>
              <LottieView
			  ref={animationRef}
                autoPlay
                source={defaultAnimation}
                loop={false}
                style={styles.animation}
              />

              <Text style={styles.titleText}> {selectedAchivement.title}</Text>
              <View style={styles.lockIconContainer}>
                <Check size={16} color={COLORS.white} />
              </View>
              <Text style={styles.descriptionComplete}>COMPLETED</Text>
            </>
          ) : (
            <>
              <Animated.View style={iconStyle}>
                <Text style={styles.icon}>{selectedAchivement.icon}</Text>
              </Animated.View>

              <Text style={styles.titleText}> {selectedAchivement.title}</Text>

              <Text style={styles.description}>
                {selectedAchivement.description}
              </Text>
              <View style={styles.lockIconContainer}>
                <Lock size={16} color={COLORS.white} />
              </View>
              <Text style={styles.lockedText}>Locked</Text>
            </>
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
    backgroundColor: COLORS.black,
    opacity: 0.5,
  },
  modalContent: {

    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  icon: {
    fontSize: FONT_SIZES.xxl * 5,
  },
  description: {
    fontSize: FONT_SIZES.md,
    marginBottom: MARGIN.lg,
    color: COLORS.textLight,
  },
  titleText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    paddingTop: 20,
    marginBottom: MARGIN.lg,
  },
  descriptionCompletedTitle: {},
  descriptionComplete: {
    fontSize: FONT_SIZES.xl,
    paddingTop: MARGIN.md,
    marginBottom: MARGIN.lg,
    color: COLORS.colorGreen,
    fontWeight: FONT_WEIGHTS.bold,
  },

  animation: {
    height: 200,
    width: 200,
  },
  lockedText: {
    fontSize: FONT_SIZES.md,
    marginBottom: MARGIN.lg,
    color: COLORS.textLight,
  },
  lockIconContainer: {
    backgroundColor: COLORS.gray600,
    borderRadius: 12,
    padding: 4,
  },
});
