import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Target } from 'lucide-react-native';

import { COLORS } from '@/utils/constants/colors';
import ProgressBar from './ProgressBar';

interface DailyGoalProps {
  current: number;
  goal: number;
}

export const DailyGoal: React.FC<DailyGoalProps> = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const isCompleted = current >= goal;

  return (
    <View style={[
      styles.container,
      isCompleted && styles.completedContainer
    ]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Target size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Daily Goal</Text>
      </View>
      <Text style={styles.description}>
        {isCompleted
          ? "Great job! You've reached your daily goal."
          : `Earn ${goal - current} more XP to reach your daily goal.`}
      </Text>
      <ProgressBar
        progress={current}
        total={goal}
        height={8}
        showPercentage={false}
        style={styles.progressBar}
      />
      <Text style={styles.progressText}>
        {current}/{goal} XP
      </Text>
    </View>
  );
};

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
  completedContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  progressBar: {
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'right',
  },
});
