import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { Challenge } from '@/types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { useNewGameStore } from '@/store/game/new-game-store';
import { COLORS } from '@/utils/constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/constants/typography';
import { BORDER_RADIUS } from '@/utils/constants/layout';
import { Check, HelpCircle } from 'lucide-react-native';
import { useHaptics } from '@/utils/hooks/useHaptics';

type FamilyMatchingProps = {
  challenge: Challenge;
};

const { width } = Dimensions.get('window');
export default function FamilyMatchingGame({ challenge }: FamilyMatchingProps) {


  const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);
  const { triggerHaptic } = useHaptics();


      const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      if (Platform.OS === 'web') {
        return {};
      }

      return {
        transform: [{ scale: scale.value }],
      };
    });
      const handleToggleHint = () => {
    triggerHaptic('light');
    setShowHint(!showHint);
  };
  const {

    setSelectedChoice,

  } = useNewGameStore();
  const handleSelectOption = (option: string) => {
    setSelectedChoice(option);
    setSelectedOption(option);

  };
  const renderOptions = (option: string, index: number) => {

    const OptionComponent = Platform.OS === 'web' ? View : Animated.View;

    return (
      <OptionComponent
        key={index}
        style={[
          animatedStyle,
          styles.optionsContainer,
          selectedOption === option && styles.selectedOption,
        ]}
      >
        <Pressable
          style={[
            styles.optionButton,
            Platform.OS === 'web' && { transform: [{ scale: 1 }] },
          ]}
          onPress={() => handleSelectOption(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option && styles.resultOptionText,
            ]}
          >
            {option}
          </Text>

          {selectedOption === option && (
            <View style={styles.resultIcon}>
              <Check size={20} color="white" />
            </View>
          )}
        </Pressable>
      </OptionComponent>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof challenge.image === 'string'
              ? { uri: challenge.image }
              : challenge.image
          }
          style={styles.familyImage}
          resizeMode="contain"
        />

                <Pressable
          style={styles.hintButton}
          onPress={handleToggleHint}
        >
          <HelpCircle size={24} color={COLORS.white} />
        </Pressable>

        {showHint && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>{challenge.hint}</Text>
          </View>
        )}
      </View>

      <View style={styles.optionsGrid}>
        {challenge.options?.map((option, index) =>
          renderOptions(option, index),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
     borderRadius: BORDER_RADIUS.lg,
    borderColor: COLORS.black,

  },

  familyImage: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 30,
    borderColor: COLORS.white,
    borderWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },

  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  optionsContainer: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.gray400,
    elevation: 5,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    borderColor: COLORS.gray800,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.backgroundLight,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },

  resultOptionText: {
    fontWeight: FONT_WEIGHTS.bold,
  },
  resultIcon: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.success,
  },

  translationText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  hintButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.success,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  hintContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    maxWidth: 150,
    borderWidth: 2,
    borderColor: 'white',
  },
  hintText: {
    color: 'white',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
