import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Course } from '@/types';
import { COLORS } from '@/utils/constants/colors';
import { Lock } from 'lucide-react-native';

interface CourseCardProps {
    course: Course;
    progress?: number;
    locked?: boolean;
    onPress: (course: Course) => void;
    style?: ViewStyle;
}

export default function CourseCard({
    course,
    progress = 0,
    locked = false,
    onPress,
    style
}: CourseCardProps) {

    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = course.lessons.length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                locked && styles.lockedContainer,
                style,
            ]}
            onPress={() => onPress(course)}
            activeOpacity={0.7}
            disabled={locked}
        >
            <View style={styles.header}>
                <Text style={styles.icon}>{course.icon}</Text>
                {locked && (
                    <View style={styles.lockIconContainer}>
                        <Lock size={16} color={COLORS.white} />
                    </View>
                )}
            </View>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
                {course.description}
            </Text>
            <View style={styles.footer}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progressPercentage}%` }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {completedLessons}/{totalLessons} lessons
                    </Text>
                </View>
                <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>Level {course.level}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: COLORS.gray200,
    },
    lockedContainer: {
        opacity: 0.7,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        fontSize: 32,
    },
    lockIconContainer: {
        backgroundColor: COLORS.gray600,
        borderRadius: 12,
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
    },
    progressContainer: {
        flex: 1,
        marginRight: 12,
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.gray200,
        borderRadius: 3,
        marginBottom: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    levelBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: COLORS.gray200,
        borderRadius: 12,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.primary,
    },
})
