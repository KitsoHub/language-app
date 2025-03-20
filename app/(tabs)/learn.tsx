
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '@/utils/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import { useProgressStore } from '@/store/progress-store';
import { useLanguageStore } from '@/store/language-store';
import CourseCard from '@/components/shared/CourseCard';
import { DailyGoal } from '@/components/shared/DailyGoal';
import { ROUTES } from '@/utils/constants/routes';

export default function LearnPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const {
        courses,
        dailyGoal,
        dailyProgress,
        // resetDailyProgressIfNeeded,
        getCoursesByLanguage,
    } = useProgressStore();
    useEffect(() => {
        // resetDailyProgressIfNeeded();

        // Set selected language from user if not already set
        if (user && user.currentLanguage && !selectedLanguage) {
            selectLanguage(user.currentLanguage);
        }
    }, []);
    const { selectedLanguage, appLanguages, selectLanguage } = useLanguageStore();
    const languageCourses = getCoursesByLanguage(selectedLanguage?.id);
    const availableCourses = languageCourses.filter(course => course.lessons.some(lesson => !lesson.locked))

    const handleCoursePress = (course: any) => {
        router.push(`${ROUTES.COURSE}${course.id}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>

{/* to use daily progress and goal */}
             <DailyGoal current={2} goal={10} />
                <Text style={styles.sectionTitle}>Available Courses</Text>

                    {/* courses */}
                    {availableCourses.length > 0 ? (
                        availableCourses.slice(0, 2).map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onPress={handleCoursePress}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                No courses available. Please select a different language.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginBottom: 24,
    },
    languageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    languageName: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
    },
    languageNative: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    changeLanguageButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeLanguageText: {
        fontSize: 14,
        color: COLORS.primary,
        marginRight: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 16,
    },
    emptyState: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateText: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'center',
    },
});
