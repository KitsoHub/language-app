import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useNewGameStore } from '@/store/game/new-game-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';
import { COLORS, colors } from '@/utils/constants/colors';
import ScoreDisplay from '@/components/shared/games/ScoreDisplay';
import WordBank from '@/components/wordMatching/WordBank';
import WordDropZone from '@/components/wordMatching/WordDropZone';
import WordMatchProgressBar from '@/components/wordMatching/WordMatchProgressBar';
import MascotAlert from '@/components/wordMatching/MascotAlert';
import GameCompletedModal from '@/components/modals/GameCompletedModal';
import MultipleChoiceGame from '@/components/games/MultipleChoiceGame';
import FillBlankGame from '@/components/games/FillBlankGame';
import SentenceBuilderGame from '@/components/games/SentenceBuilderGame';
import EmptyState from '@/components/shared/EmptyState';
import { ROUTES } from '@/utils/constants/routes';
import Feather from '@expo/vector-icons/Feather';
import { PADDING } from '@/utils/constants';

import { useAudioPlayer } from '@/utils/hooks/useAudioPlayer';
import { CoinSound } from '@/utils/audio';
import FamilyMatchingGame from '@/components/games/FamilyMatchingGame';
import { useHaptics } from '@/utils/hooks/useHaptics';
import { useCategoriesStore } from '@/store/game/categories-store';
import AnswerModal from '@/components/modals/AnswerModal';
import AchivementDetailsModal from '@/components/modals/AchivementDetailsModal';
import LessonNumbersGame from '@/components/games/LessonNumbers';

export default function GamePage() {
  const router = useRouter();
  const {
    getCurrentGame,
    getCurrentChallenge,
    arrangedWords,
    isCorrect,
    showFeedback,
    addWordToArrangement,
    removeWordFromArrangement,
    checkAnswer,
    nextChallenge,
    resetLevel,
    setShowFeedback,
    isGameCompleted,
    resetGame,
    selectedChoice,
  } = useNewGameStore();
  // game state
  const currentGame = getCurrentGame();
  const currentChallenge = getCurrentChallenge();
  // category store
  const { categories, updateGameProgress } = useCategoriesStore();

  const categoryWithGame = categories.find((category) =>
    category.games.some((game) => game.id === currentGame?.id),
  );

  const gameInCategory = categoryWithGame?.games.find(

    (game) => game.id === currentGame?.id,
  );

  const { user } = useAuthStore();
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { triggerHaptic } = useHaptics();
  const handleToggleHint = () => {
    triggerHaptic('light');
    setShowHint(!showHint);
  };

  useEffect(() => {
    if (isGameCompleted() && !showCompletionModal) {
      setShowCompletionModal(true);
    }
  }, [isGameCompleted, showCompletionModal]);

  useEffect(() => {
    if (currentGame && categoryWithGame && gameInCategory) {
      const totalChallenges = currentGame.challenges.length;
      const currentIndex = currentGame.challenges.indexOf(
        currentChallenge || currentGame.challenges[0],
      );
      const progress =
        totalChallenges > 0 ? (currentIndex + 1) / totalChallenges : 0;

      updateGameProgress(categoryWithGame.id, gameInCategory.id, progress);
    }
  }, [currentChallenge]);

  const handleRemoveWord = (index: number) => {
    removeWordFromArrangement(index);
  };

  const handleWordSelect = (word: string) => {
    addWordToArrangement(word);
  };

  const handleResetLevel = () => {
    resetLevel();
  };

  const handleContinue = async () => {
    await play(CoinSound);
    setTimeout(() => {
      setShowCompletionModal(false);
      router.back();
    }, 400);
  };
  const handleCloseCompletedModal = () => {
    setShowCompletionModal(false);
    router.navigate(ROUTES.HOME);
  };
  const handleWordCheck = () => {
    setShowCheck(true);
    setShowFeedback(true);
    const wordCheckResult = checkAnswer();
    if (Platform.OS === 'web') {
      if (wordCheckResult) {
        Alert.alert('Correct', 'Great job! Moving the next level');
        setTimeout(() => {
          nextChallenge();
        }, 2000);
      } else {
        Alert.alert('Incorrect', 'Try Again!');
      }
    } else {
      setTimeout(() => {
        if (wordCheckResult) {
          setShowCheck(false);
          if (isGameCompleted()) {
            setShowCompletionModal(true);
          } else {
            nextChallenge();
          }
        } else {
          setShowFeedback(false);
          setShowCheck(false);
        }
      }, 2000);
    }
  };


  const handleLessonNext = () => {
    setShowCheck(true);
    const wordCheckResult = checkAnswer();
   setTimeout(() => {
        if (wordCheckResult) {
          setShowCheck(false);

          if (isGameCompleted()) {
            setShowCompletionModal(true);
          } else {
            nextChallenge();
          }
        } else {
          setShowCheck(false);
        }
      }, 2000);
  }


  if (!currentGame || !currentChallenge) {
    return (
      <EmptyState
        title={currentGame?.title}
        //  icon="inbox"
        description="No Game has been selected"
        buttonTitle="Back to Home"
        onButtonPress={() => router.push(ROUTES.TABS)}
        animationSource={require('@/assets/lotties/empty_scroll.json')}
      />
    );
  }

  // validations
  const isLessonChallenge =
  typeof currentChallenge.type === 'string' &&
  currentChallenge.type.toLowerCase().includes('lesson');

  const { play } = useAudioPlayer();

  return (
    <>
      <Stack.Screen
        options={{
          title: currentGame.title,
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerRight: () => <ScoreDisplay score={user?.xp || 0} />,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 16 }}>
          <WordMatchProgressBar
            currentLevel={currentGame.challenges.indexOf(currentChallenge)}
            totalLevels={currentGame.challenges.length - 1}
          />

          <View style={styles.instructionContainer}>
            {currentChallenge.translationOption && (
              <>
                {/* add audio here */}
                <TouchableOpacity
                  style={styles.translationButton}
                  hitSlop={20}
                  onPress={() => play(currentChallenge.translationOption || '')}
                >
                  <Feather name="volume-2" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </>
            )}
            <Text
              style={[
                currentChallenge.translationOption && styles.instructionText,
                styles.instructionTextDefault,
              ]}
            >
              {currentChallenge.instruction}
            </Text>
          </View>

          {currentChallenge.type === 'word-matching' && (
            <>
              <WordDropZone
                arrangedWords={arrangedWords}
                onRemoveWord={handleRemoveWord}
              />

              <WordBank
                words={currentChallenge.wordBank || []}
                usedWords={arrangedWords}
                onSelectWord={handleWordSelect}
              />
            </>
          )}

          {/* multiple choice */}
          {currentChallenge.type === 'multiple-choice' && (
            <MultipleChoiceGame challenge={currentChallenge} />
          )}

          {/* fill in blank */}
          {currentChallenge.type === 'fill-blank' && (
            <FillBlankGame challenge={currentChallenge} />
          )}

          {/* sentence builder */}
          {currentChallenge.type === 'sentence-builder' && (
            <SentenceBuilderGame challenge={currentChallenge} />
          )}

          {/* Family matching */}
          {currentChallenge.type === 'family-matching' && (
            <FamilyMatchingGame challenge={currentChallenge} />
          )}

          {/* lessons */}

          {currentChallenge.type === 'lesson-numbers' && (
            <LessonNumbersGame challenge={currentChallenge} />
          )}

          <View style={styles.buttonContainer}>


            {isLessonChallenge ? (

                     <Button
              title="Next"
              onPress={handleWordCheck}
              style={styles.checkButton}
            />
            ):
            (
              <>

                {currentChallenge.type !== 'family-matching' && (
              <Button
                title="Reset"
                onPress={handleResetLevel}
                variant="outline"
                style={styles.resetButton}
              />
            )}
                      <Button
              title="Check"
              onPress={handleWordCheck}
              disabled={showCheck}
              style={styles.checkButton}
            />
              </>
            )

            }


          </View>
        </View>

        <View style={styles.content}>
          <GameCompletedModal
            visible={showCompletionModal}
            onClose={handleCloseCompletedModal}
            onContinue={handleContinue}
            gameTitle={currentGame.title}
            earnedXP={currentGame.challenges.reduce(
              (sum, challenge) => sum + (challenge.points || 0),
              0,
            )}
          />
        </View>
      </SafeAreaView>
      <View>
        {showFeedback && (
          <AnswerModal
            visible={showFeedback}
            isCorrect={isCorrect ?? undefined}
          />
        )}
      </View>
      {showHint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>
            {currentChallenge.hint || 'No hint available'}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.hintButton}
        onPress={handleToggleHint}
        activeOpacity={0.7}
      >
        <Feather name="help-circle" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  instructionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.mascotBackground,
    borderRadius: 16,
    padding: 8,
    marginVertical: 8,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    right: 30,
    color: colors.text,
  },
  instructionTextDefault: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
  },
  checkButton: {
    flex: 2,
    marginLeft: 8,
  },
    nextButton: {
    flex: 2,
    marginLeft: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  button: {
    minWidth: 150,
  },
  translationButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: PADDING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray300,
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
