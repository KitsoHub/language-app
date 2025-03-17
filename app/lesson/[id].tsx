
import { StyleSheet, Text, View } from 'react-native'
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
})
