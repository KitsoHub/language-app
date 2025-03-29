

import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Dimensions, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useProgressStore } from '@/store/progress-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, COLORS } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';
import { Check, X } from 'lucide-react-native';
import { Audio, AVPlaybackSource } from "expo-av";
import Feather from '@expo/vector-icons/Feather';
import { Exercise, ListeningOption, Lesson } from '@/types';
import WordBank from '@/components/wordMatching/WordBank';
import { useWordMatchGameStore } from '@/store/word-matching-game-store';
import { challenges } from '@/mocks/challenges';
import WordDropZone from '@/components/wordMatching/WordDropZone';
import ProgressBar from '@/components/shared/ProgressBar';
import WordMatchProgressBar from '@/components/wordMatching/WordMatchProgressBar';
import MascotAlert from '@/components/wordMatching/MascotAlert';

export default function LessonPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { courses, currentCourse, currentLesson, selectLesson, completeLesson } = useProgressStore();

  // State management
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [audioSound, setAudioSound] = useState<unknown>();
  const [droppedLetters, setDroppedLetters] = useState<string[]>([]);
  const [draggingLetter, setDraggingLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // word matching state

  const { addWordToArrangement, removeWordFromArrangement,
    arrangedWords, score, currentLevel,
    setShowFeedback,showFeedback, nextLevel, resetLevel,
    isWordCorrect, checkAnswer,resetGame } = useWordMatchGameStore();

  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);

  const handleReset = () => {
    // resetLevel();
    resetGame()
  }

  const handleRemoveWord = (index: number) => {
    removeWordFromArrangement(index);
  }

  const handleWordCheck = ()=>{
    console.log(">> Word to check >>>", arrangedWords);
    const wordCheckResult = checkAnswer()
    console.log(">> Check result >>", wordCheckResult);

  // on web
  if(Platform.OS === 'web'){
    if (wordCheckResult) {
      Alert.alert("Correct", "Great job! Moving the next level");
      setTimeout(()=>{nextLevel();},2000)
    }else{
      Alert.alert("Incorrect", "Try Again!")
    }
  }else{
    setTimeout(()=>{
      if (wordCheckResult) {
        nextLevel()
      }else{setShowFeedback(false)}
    }, 3000)
  }
  }
  //current level change state
  useEffect(() => {
    //get current level
    const challenge = challenges.find(c => c.id === currentLevel);
    if (challenge) {
      setCurrentChallenge(challenge)
    }
  }, [currentLevel])


  const isWordCheckDisabled = arrangedWords.length !== currentChallenge.correctOrder.length
  // const fadeAnim = useSharedValue(1);

  // Animation refs
  // const position = useRef(new Animated.ValueXY()).current;
  // const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadLesson = async () => {
      if (id && typeof id === 'string') {
        try {
          setIsLoading(true);
          await selectLesson(id);
        } catch (error) {
          console.error('Error loading lesson:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadLesson();
  }, [id, selectLesson]);

  // Audio handling
  async function playSound(option: ListeningOption) {
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(option.audio as unknown as AVPlaybackSource, { shouldPlay: true });
      setAudioSound(sound);
      handleOptionSelect(option.vowel);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  useEffect(() => {
    return audioSound
      ? () => {
        (audioSound as Audio.Sound).unloadAsync();
      }
      : undefined;
  }, [audioSound]);

  // Pan Responder for translation drag and drop
  // const createPanResponder = (letter: string) => PanResponder.create({
  //   onStartShouldSetPanResponder: () => !draggingLetter || draggingLetter === letter,
  //   onMoveShouldSetPanResponder: () => !draggingLetter || draggingLetter === letter,
  //   onPanResponderGrant: () => {
  //     setDraggingLetter(letter);
  //     position.extractOffset();
  //     position.flattenOffset();
  //     // position.setOffset({
  //     //   x: position.x.extractOffset() ,
  //     //   y: position.y.extractOffset()     });
  //   },
  //   onPanResponderMove: Animated.event(
  //     [null, { dx: position.x, dy: position.y }],
  //     { useNativeDriver: false }
  //   ),
  //   onPanResponderRelease: (e, gesture) => {
  //     const isInDropZone = gesture.moveY > 200 && gesture.moveY < 300;

  //     if (isInDropZone) {
  //       const letterIndex = Math.floor(gesture.moveX / 60);
  //       setDroppedLetters(prev => {
  //         const newDropped = [...prev];
  //         newDropped.splice(letterIndex, 0, letter);
  //         return newDropped;
  //       });
  //       const currentAnswer = [...droppedLetters, letter].join('');
  //       setIsCorrect(currentAnswer === currentExercise?.correctAnswer);
  //     }

  //     Animated.spring(position, {
  //       toValue: { x: 0, y: 0 },
  //       friction: 5,
  //       useNativeDriver: false
  //     }).start(() => {
  //       setDraggingLetter(null);
  //     });
  //   }
  // });

  // Guard against null currentLesson
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading lesson...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentLesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson not found</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.errorButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const currentExercise = currentLesson.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === currentLesson.exercises.length - 1;
  const progress = (currentExerciseIndex + 1) / currentLesson.exercises.length;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === currentExercise.correctAnswer);
  };

  // const handleDrop = (letter: string) => {
  //   const newDroppedLetters = [...droppedLetters, letter];
  //   setDroppedLetters(newDroppedLetters);
  //   const currentAnswer = newDroppedLetters.join('');
  //   setIsCorrect(currentAnswer === currentExercise.correctAnswer);

  //   if (currentAnswer === currentExercise.correctAnswer) {
  //     Animated.sequence([
  //       Animated.timing(fadeAnim, {
  //         toValue: 0.7,
  //         duration: 100,
  //         useNativeDriver: true
  //       }),
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 100,
  //         useNativeDriver: true
  //       })
  //     ]).start();
  //   }
  // };

  // const removeLetter = (index: number) => {
  //   const newDroppedLetters = [...droppedLetters];
  //   newDroppedLetters.splice(index, 1);
  //   setDroppedLetters(newDroppedLetters);
  //   setIsCorrect(newDroppedLetters.join('') === currentExercise.correctAnswer);
  // };

  const handleNext = () => {
    if (isCorrect) {
      setCompletedExercises([...completedExercises, currentExercise.id]);

      if (isLastExercise) {
        completeLesson(currentLesson.id);
        Alert.alert(
          'Lesson Completed!',
          `You have earned ${currentLesson.xpReward} XP!`,
          [{ text: 'Continue', onPress: () => router.back() }]
        );
      } else {


        setCurrentExerciseIndex(currentExerciseIndex + 1);
        // Reset all relevant state for the new question
        setSelectedOption(null);
        setIsCorrect(null);
        setShowHint(false);


      }
    }
  };

  const handleWordSelect = (word: string) => {
    addWordToArrangement(word);
    console.log(">>> Selected >>>", word)

  }

  const renderExercise = () => {
    if (!currentExercise) {
      return <Text style={styles.question}>Loading exercise...</Text>;
    }

    switch (currentExercise.type) {
      case 'multipleChoice':
        return (
          <View style={[styles.contentContainer]}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            {showHint && currentExercise.hint && (
              <View style={styles.hintContainer}>
                <Text style={styles.hintText}>{currentExercise.hint}</Text>
              </View>
            )}
            {currentExercise.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                  selectedOption === option && isCorrect && styles.correctOption,
                  selectedOption === option && !isCorrect && styles.incorrectOption,
                ]}
                onPress={() => handleOptionSelect(option as string)}
                disabled={selectedOption !== null}
              >
                <Text style={[
                  styles.optionText,
                  selectedOption === option && isCorrect && styles.correctOptionText,
                  selectedOption === option && !isCorrect && styles.incorrectOptionText,
                ]}>
                  {option as string}
                </Text>
                {selectedOption === option && isCorrect && <Check size={20} color={COLORS.white} />}
                {selectedOption === option && !isCorrect && <X size={20} color={COLORS.white} />}
              </TouchableOpacity>
            ))}
            {!showHint && currentExercise.hint && selectedOption === null && (
              <TouchableOpacity style={styles.hintButton} onPress={() => setShowHint(true)}>
                <Text style={styles.hintButtonText}>Show Hint</Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case 'listening':
        return (
          <View style={[styles.contentContainer]}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            {currentExercise.options?.map((option, index) => {
              const listeningOption = option as ListeningOption;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => playSound(listeningOption)}
                >
                  <Feather name="volume-2" size={24} color={COLORS.text} />
                  <Text style={styles.optionText}>{listeningOption.vowel}</Text>
                  <Feather name="play" size={24} color={COLORS.text} />
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case 'picture-matching':
        return (
          <View style={[styles.contentContainer]}>
            <View style={styles.questionContainer}>
              {currentExercise.avatar ? (
                typeof currentExercise.avatar === 'string' ? (
                  <Image source={{ uri: currentExercise.avatar }} style={styles.questionImage} />
                ) : (
                  <Image source={currentExercise.avatar} style={styles.questionImage} />
                )
              ) : (
                <Text style={styles.errorText}>No image available</Text>
              )}
              <Text style={styles.question}>{currentExercise.question}</Text>
            </View>
            <View style={styles.optionsGrid}>
              {currentExercise.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOption,
                    selectedOption === option && isCorrect && styles.correctOption,
                    selectedOption === option && !isCorrect && styles.incorrectOption,
                  ]}
                  onPress={() => handleOptionSelect(option as string)}
                  disabled={selectedOption !== null}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.selectedOptionText,
                      selectedOption === option && isCorrect && styles.correctOptionText,
                      selectedOption === option && !isCorrect && styles.incorrectOptionText,
                    ]}
                  >
                    {option as string}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'translation':

        return (
          <View style={styles.container}>
            <Text style={styles.title}>Translate words into Setswana Words</Text>

          </View>

        );

      case 'word-matching':

        return (
          <SafeAreaView style={styles.container}>

            {/* progress bar */}

            <WordMatchProgressBar currentLevel={currentChallenge.id} totalLevels={challenges.length} />
            {/* instruction text */}
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>{currentChallenge.instruction}</Text>

            </View>

            {/* dropszone */}
            <WordDropZone arragedWords={arrangedWords} onRemoveWord={handleRemoveWord} />

            {/* Show feedback with Mascot */}
            {
              showFeedback && (
                <MascotAlert isCorrect={isWordCorrect ?? undefined} visible={showFeedback} />
              )
            }


            {/* Word bank  */}
            <WordBank
              words={currentChallenge.wordBank}
              usedWords={arrangedWords}
              onSelectWord={handleWordSelect}
            />

            {/* Check and reset buttons */}
            <View style={styles.buttonContainer}>
              <Button title='Reset' onPress={handleReset} style={styles.resetButton} />

              <Button title='Check' onPress={handleWordCheck} style={styles.checkButton} disabled={isWordCheckDisabled}/>

            </View>

          </SafeAreaView>

        );

      default:
        return <Text style={styles.question}>This exercise type is not implemented</Text>;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: currentLesson.title,
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.content}>
          {renderExercise()}
        </View>
        <View style={styles.footer}>
          <Button
            title={isLastExercise ? "Complete Lesson" : "Continue"}
            disabled={!isCorrect}
            style={
              styles.continueButton
            }
            onPress={handleNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorButton: {
    width: '80%',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: COLORS.gray200,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.success,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionImage: {
    width: 150,
    height: 150,

  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  hintContainer: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  hintText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  hintButton: {
    marginTop: 16,
  },
  hintButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  correctOption: {
    borderColor: COLORS.success,
    backgroundColor: '#E8F5E9',
  },
  incorrectOption: {
    borderColor: COLORS.error,
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  correctOptionText: {
    color: COLORS.success,
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: COLORS.error,
    fontWeight: '500',
  },

  droppedLetter: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    elevation: 2,
  },
  droppedLetterText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
  },
  placeholderText: {
    color: COLORS.gray500,
    fontSize: 16,
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  letterTile: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    elevation: 2,
  },
  draggingLetter: {
    elevation: 5,
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  letterText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.text,
  },
  usedLetter: {
    opacity: 0.4,
  },
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    alignItems: 'center',
  },

  correctButton: {
    backgroundColor: COLORS.success,
  },
  incorrectButton: {
    backgroundColor: COLORS.error,
  },
  continueButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  wordBankContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  draggableWord: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  wordText: {
    color: 'white',
    fontSize: 18,
  },
  dropZone: {
    width: width * 0.8,
    minHeight: 100,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  droppedWordText: {
    fontSize: 18,
    margin: 5,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  // checkButton: {
  //   backgroundColor: '#2196F3',
  //   color: 'white',
  //   padding: 10,
  //   borderRadius: 10,
  //   fontSize: 18,
  // },
  mascot: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mascotText: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructionContainer: {
    backgroundColor: colors.mascotBackground,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 25,
    backgroundColor: "#2D9ECE",
  },
  checkButton: {
    flex: 2,
    marginLeft: 8,
    borderRadius: 25,
  },
  // nextButtonText: {
  //   fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
  //   fontSize: 16,
  //   color: "rgba(255, 255, 255, 1)",
  //   letterSpacing: 0.48,
  //   textAlign: "center",
  // },
});
