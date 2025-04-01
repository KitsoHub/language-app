import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TabButton, { TabButtonProps } from './TabButton';
import { useProgressStore } from '@/store/progress-store';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useLanguageStore } from '@/store/language-store';
import CourseCard from './CourseCard';
import { ROUTES } from '@/utils/constants/routes';
import { COLORS } from '@/utils/constants/colors';


export enum CustomTab {
    TAB1, TAB2
}
export default function TabScreen() {
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


    const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.TAB1);


       const { selectedLanguage, appLanguages, selectLanguage } = useLanguageStore();
        const languageCourses = getCoursesByLanguage(selectedLanguage?.id);
        const availableCourses = languageCourses.filter(course => course.lessons.some(lesson => !lesson.locked))

            const handleCoursePress = (course: any) => {
                router.push(`${ROUTES.COURSE}${course.id}`);
            };


    const buttons: TabButtonProps[] = [{ title: "Available Courses" }, { title: "Challenges" }]
    return (
        <>
            <TabButton buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            <View>
                {selectedTab === CustomTab.TAB1 ? (
                    <>
                     <Text style={styles.sectionTitle}>Available Courses</Text>
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
                    </> // end
                ):(
                    <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                        No challenges available. Please select a different language.
                    </Text>
                </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
})
