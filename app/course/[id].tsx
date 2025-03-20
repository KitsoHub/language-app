import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { usePathname, useSearchParams } from 'expo-router/build/hooks'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useProgressStore } from '@/store/progress-store';
import { COLORS } from '@/utils/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '@/components/shared/ProgressBar';
import LessonCard from '@/components/shared/LessonCard';
import { ROUTES } from '@/utils/constants/routes';
// import { courses } from '@/mocks/courses';
export default function CourserPage() {
    // const searchParams = useSearchParams(); // id, expo router

    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { courses, selectCourse, currentCourse } = useProgressStore();
    // const appCourses = courses;

    useEffect(() => {
        if (id && typeof id === "string") {
            selectCourse(id)
        }
    }, [id]);

    if (!currentCourse) { return null; }

    const completedLessons = currentCourse.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = currentCourse.lessons.length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const handleLessonPress = (lesson: any) => {
        router.push(`${ROUTES.LESSON}${lesson.id}`);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: currentCourse.title,
                    headerBackTitle: 'Back',
                }}
            />

            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}

                >
                    <View style={styles.header}>
                        <Text style={styles.icon}>{currentCourse.icon}</Text>
                        <Text style={styles.title}>{currentCourse.title}</Text>
                        <Text style={styles.description}>{currentCourse.description}</Text>
                    </View>

                    {/* progress */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressTitle}>Course Progress</Text>
                            <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
                        </View>
                        <ProgressBar
                            progress={completedLessons}
                            total={totalLessons}
                            height={8}
                            showPercentage={false}
                        />
                        <Text style={styles.progressText}>
                            {completedLessons}/{totalLessons} lessons completed
                        </Text>
                    </View>
                    <Text style={styles.sectionTitle}>Lessons</Text>
                    {/* lessons */}
                    {currentCourse.lessons.map((lesson) => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            onPress={handleLessonPress} />
                    ))}


                </ScrollView>
            </SafeAreaView>



        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: COLORS.textLight,
        textAlign: 'center',
    },
    progressContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    progressPercentage: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
    },
    progressText: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 16,
    },
})
