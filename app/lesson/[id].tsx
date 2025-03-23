import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useProgressStore } from '@/store/progress-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';
import { Check, X } from 'lucide-react-native';
import { Audio, AVPlaybackSource } from "expo-av";
import Feather from '@expo/vector-icons/Feather';
import { Exercise, ListeningOption, Lesson } from '@/types';
import { PanResponder, Animated } from 'react-native';

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

  // Animation refs
  const position = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
  const createPanResponder = (letter: string) => PanResponder.create({
    onStartShouldSetPanResponder: () => !draggingLetter || draggingLetter === letter,
    onMoveShouldSetPanResponder: () => !draggingLetter || draggingLetter === letter,
    onPanResponderGrant: () => {
      setDraggingLetter(letter);
      position.setOffset({
        x: position.x._value,
        y: position.y._value
      });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      const isInDropZone = gesture.moveY > 200 && gesture.moveY < 300;
      
      if (isInDropZone) {
        const letterIndex = Math.floor(gesture.moveX / 60);
        setDroppedLetters(prev => {
          const newDropped = [...prev];
          newDropped.splice(letterIndex, 0, letter);
          return newDropped;
        });
        const currentAnswer = [...droppedLetters, letter].join('');
        setIsCorrect(currentAnswer === currentExercise?.correctAnswer);
      }
      
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: false
      }).start(() => {
        setDraggingLetter(null);
      });
    }
  });

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

  const handleDrop = (letter: string) => {
    const newDroppedLetters = [...droppedLetters, letter];
    setDroppedLetters(newDroppedLetters);
    const currentAnswer = newDroppedLetters.join('');
    setIsCorrect(currentAnswer === currentExercise.correctAnswer);
    
    if (currentAnswer === currentExercise.correctAnswer) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    }
  };

  const removeLetter = (index: number) => {
    const newDroppedLetters = [...droppedLetters];
    newDroppedLetters.splice(index, 1);
    setDroppedLetters(newDroppedLetters);
    setIsCorrect(newDroppedLetters.join('') === currentExercise.correctAnswer);
  };

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
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start(() => {
          // Move to the next exercise
          setCurrentExerciseIndex(currentExerciseIndex + 1);
          // Reset all relevant state for the new question
          setSelectedOption(null);
          setIsCorrect(null);
          setShowHint(false);
          setDroppedLetters([]);
          setDraggingLetter(null);
          fadeAnim.setValue(1);
        });
      }
    }
  };

  const renderExercise = () => {
    if (!currentExercise) {
      return <Text style={styles.question}>Loading exercise...</Text>;
    }

    switch (currentExercise.type) {
      case 'multipleChoice':
        return (
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
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
          </Animated.View>
        );

      case 'listening':
        return (
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
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
          </Animated.View>
        );

      case 'matching':
        return (
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
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
          </Animated.View>
        );

      case 'translation':
        return (
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <View style={[
              styles.dropZone,
              isCorrect === true && styles.correctDropZone,
              isCorrect === false && styles.incorrectDropZone
            ]}>
              {droppedLetters.map((letter, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.droppedLetter}
                  onPress={() => removeLetter(index)}
                >
                  <Text style={styles.droppedLetterText}>{letter}</Text>
                </TouchableOpacity>
              ))}
              {droppedLetters.length === 0 && (
                <Text style={styles.placeholderText}>Drag letters here</Text>
              )}
            </View>
            <View style={styles.lettersContainer}>
              {currentExercise.options?.map((letter, index) => {
                const panResponder = createPanResponder(letter as string);
                return (
                  <Animated.View
                    key={index}
                    {...(!droppedLetters.includes(letter as string) ? panResponder.panHandlers : {})}
                    style={[
                      styles.letterTile,
                      !droppedLetters.includes(letter as string) && draggingLetter === letter && {
                        transform: position.getTranslateTransform()
                      },
                      droppedLetters.includes(letter as string) && styles.usedLetter,
                      draggingLetter === letter && styles.draggingLetter
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => handleDrop(letter as string)}
                      disabled={droppedLetters.includes(letter as string) || !!draggingLetter}
                    >
                      <Text style={styles.letterText}>{letter as string}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
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
            title={isLastExercise ? "Finish" : "Check"}
            disabled={(!isCorrect && !selectedOption && droppedLetters.length === 0) || isCorrect === null}
            style={[
              styles.checkButton,
              isCorrect === true && styles.correctButton,
              isCorrect === false && styles.incorrectButton
            ]}
            onPress={handleNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

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
    width: '48%',
    justifyContent: 'center',
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
  dropZone: {
    width: '90%',
    minHeight: 60,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctDropZone: {
    borderColor: COLORS.success,
    backgroundColor: '#e8f5e9',
  },
  incorrectDropZone: {
    borderColor: COLORS.error,
    backgroundColor: '#ffebee',
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
  },
  checkButton: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  correctButton: {
    backgroundColor: COLORS.success,
  },
  incorrectButton: {
    backgroundColor: COLORS.error,
  },
});