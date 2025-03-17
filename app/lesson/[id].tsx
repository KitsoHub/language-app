
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useProgressStore } from '@/store/progress-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';

export default function LessonPage() {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const {courses, currentCourse, currentLesson, selectLesson, completeLesson} = useProgressStore();

    //lesson states
    const [ currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isCompletedExercise, setIsCompleteExercise] = useState<string[]>([]);
    const [showHint, setShowHint] = useState(false);

    //set lesson
    useEffect(()=>{
        if(id && typeof id === 'string'){
            selectLesson(id);
            console.log(currentLesson)
        }
    },[id]);

    const handleShowHint =()=>{
        setShowHint(true);
    }

    if(!currentLesson){
        return null;
    }

// exercise variables
const currentExercise = currentLesson.exercises[currentExerciseIndex];
const isLastExercise = currentExerciseIndex === currentLesson.exercises.length -1;
const progress = (currentExerciseIndex + 1 / currentLesson.exercises.length)


const renderExercise =() =>{
    switch (currentExercise.type) {
        case 'multipleChoice':
            return(

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
        case 'translation':
            break;
        default:
            // break;
            return(
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
        style={[styles.progressBar,{width: `${progress * 100}%`}
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
        disabled={!isCorrect}
        style={styles.continueButton}
        />
    </View>

</SafeAreaView>

    </>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:COLORS.white
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
      }
    ,
    continueButton:{
        width:"100%"
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
})
