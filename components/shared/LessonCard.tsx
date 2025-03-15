import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Lesson } from '@/types';
import { COLORS } from '@/utils/constants/colors';
import { Check, Lock } from 'lucide-react-native';

interface LessonCardProps{
    onPress: (lesson: Lesson)=> void;
    style?: ViewStyle;
    lesson:Lesson;
}

export default function LessonCard({
    onPress,
    lesson,
    style,
}:LessonCardProps) {
  return (
<TouchableOpacity
style={[styles.container, lesson.completed && styles.completedContainer,
    lesson.locked && styles.lockedContainer,
    style,
]}
onPress={()=> onPress(lesson)} activeOpacity={0.7} disabled={lesson.locked}>
      <View style={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {lesson.description}
        </Text>


        <View style={styles.rightContent}>
        {lesson.completed ? (
          <View style={styles.completedBadge}>
            <Check size={16} color={COLORS.white} />
          </View>
        ) : lesson.locked ? (
          <View style={styles.lockedBadge}>
            <Lock size={16} color={COLORS.white} />
          </View>
        ) : (
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{lesson.xpReward} XP</Text>
          </View>
        )}
      </View>
      </View>

</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: COLORS.gray200,
      },
      completedContainer: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
      },
      lockedContainer: {
        opacity: 0.7,
      },
      content: {
        flex: 1,
        marginRight: 12,
      },
      title: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
      },
      description: {
        fontSize: 14,
        color: COLORS.textLight,
      },
      rightContent:{
justifyContent:'center',
alignItems:'center'
      },
      xpBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: COLORS.secondaryLight,
        borderRadius: 12,
      },
      xpText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.secondary,
      },
      completedBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
      },
      lockedBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.gray600,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
