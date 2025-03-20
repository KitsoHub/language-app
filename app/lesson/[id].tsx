import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useProgressStore } from '@/store/progress-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';
import { Check, Icon, X } from 'lucide-react-native';
import { Audio, AVPlaybackSource } from "expo-av";
import Feather from '@expo/vector-icons/Feather';
import { Exercise, ListeningOption } from '@/types';



export default function LessonPage() {

  const [audioSound, setAudioSound] = useState<unknown>();

  async function playSound(audio: unknown) {

    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(audio as unknown as AVPlaybackSource, {shouldPlay: true});
      setAudioSound(sound);
      // await sound.playAsync();
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


  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { courses, currentCourse, currentLesson, selectLesson, completeLesson } = useProgressStore();

  //lesson states
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [completedExercises, setIsCompleteExercises] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  //set lesson
  useEffect(() => {
    if (id && typeof id === 'string') {
      selectLesson(id);
      console.log(currentLesson)
    }
  }, [id]);

  const handleShowHint = () => {
    setShowHint(true);
  }

  if (!currentLesson) {
    return null;
  }



  // exercise variables
  const currentExercise = currentLesson.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === currentLesson.exercises.length - 1;
  const progress = (currentExerciseIndex + 1 / currentLesson.exercises.length)

  //option select
  const handleOptionSelect = (option: string) => {
    console.log(">>>>> Selected choice >>>>>>>>", option);
    console.log(">>>>> Correct Answer >>>>>", currentExercise.correctAnswer);

    //set option and  check correct answer
    setSelectedOption(option);
    setIsCorrect(option === currentExercise.correctAnswer);
    console.log(">>>>>>>>>>>>>>> Is correct >>>>>", isCorrect);

  }


  // handle next
  // handle next to when the answer is wrong // update to keep track of each exercise reward
  const handleNext = () => {
    if (isCorrect) {
      console.log(">>>> Handling is correct >>>>>")
      console.log(">>>> Is last exercise >>>", isLastExercise)
      setIsCompleteExercises([...completedExercises, currentExercise.id])
      if (isLastExercise) {
        completeLesson(currentLesson.id)


        Alert.alert(
          'Lesson Completed!',
          `You have earned ${currentLesson.xpReward} XP!`,
          [
            { text: 'Continue', onPress: () => router.back() }
          ]
        )
      }
      else {
        console.log(">>>> Handling next exercise >>>>>")
        //move to next exercise
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setSelectedOption(null)
        setIsCorrect(null)
        setShowHint(false)
      }

    }
  }

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multipleChoice':
        return (

          // show hint
          // show options
          //show hint button
          <View style={styles.exerciseContainer}>
            <Text style={styles.question}>{currentExercise.question}</Text>

            {showHint && currentExercise.hint && (
              <View style={styles.hintContainer}>
                <Text style={styles.hintText}>{currentExercise.hint}</Text>
              </View>
            )}

            {/* show options */}
            <View>
              {currentExercise.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOption,
                    selectedOption === option && isCorrect && styles.correctOption,
                    selectedOption === option && !isCorrect && styles.incorrectOption,
                  ]}
                  onPress={() => handleOptionSelect(option)}
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
                    {option}
                  </Text>

                  {/* isCorrect markers */}
                  {selectedOption === option && isCorrect && (
                    <View style={styles.resultIconContainer}>
                      <Check size={20} color={COLORS.white} />
                    </View>
                  )}

                  {selectedOption === option && !isCorrect && (
                    <View style={styles.resultIconContainer}>
                      <X size={20} color={COLORS.white} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}

            </View>



            {!showHint && currentExercise.hint && selectedOption === null && (
              <TouchableOpacity
                style={styles.hintButton}
                onPress={handleShowHint}
              >
                <Text style={styles.hintButtonText}>Show Hint</Text>
              </TouchableOpacity>
            )}


          </View>

        )
        case 'listening':
        return (
          <View style={styles.exerciseContainer}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <View>
              {currentExercise.options?.map((option, index) => {
                const listeningOption = option as ListeningOption; // Type assertion
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => playSound(
                   listeningOption.audio
                    )}
                  >
                    <Feather name="volume-2" size={24} color="black" />
                    <Text style={styles.optionText}>{listeningOption.vowel}</Text>
                    <Feather name="play" size={24} color="black" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

        )
      case 'translation':
        break;
      default:
        // break;
        return (
          <View style={styles.exerciseContainer}>
            <Text style={styles.question}>
              This exercise type is not implemented
            </Text>
          </View>
        )
    }
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: currentLesson.title,
          headerBackTitle: 'Back'
        }}
      />

      <SafeAreaView style={styles.container}>
        {/* progress bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${progress * 100}%` }
            ]}
          />
        </View>
        {/* content */}

        <View style={styles.content}>
          {renderExercise()}
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Button
            title={isLastExercise ? "Complete Lesson" : "Continue"}
            //TODO: change in production
            disabled={!isCorrect}
            style={styles.continueButton}
            onPress={handleNext}
          />
        </View>

      </SafeAreaView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
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
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  continueButton: {
    width: '80%',
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: COLORS.gray200,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  exerciseContainer: {
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  resultIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
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
});
