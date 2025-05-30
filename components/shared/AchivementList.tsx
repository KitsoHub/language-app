import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/constants';
import { COLORS } from '@/utils/constants/colors';
import AchievementCard from './AchievementCard';

import { useAuthStore } from '@/store/auth-store';
import AchivementDetailsModal from '../modals/AchivementDetailsModal';
import { useAchievementsStore } from '@/store/achivement-store';
import { Achievement } from '@/types';

function AchivementListComponent() {
  const { achievements, selectAchivement, isAchievementUnlocked } =
    useAchievementsStore();
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        horizontal
        style={styles.horizontalScroll}
      >
        {achievements.length > 0 ? (
          achievements.map((achievement) => {
            return (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                status={isAchievementUnlocked(achievement.id)}
                onPress={() => selectAchivement(achievement)}
              />
            );
          })
        ) : (
          <LinearGradient
            colors={['#FFFFFF', '#F0F4FF']}
            style={styles.emptyState}
          >
            <Text style={styles.emptyStateText}>
              Oops..Achivements not loaded try again later.
            </Text>
          </LinearGradient>
        )}
      </ScrollView>

      <AchivementDetailsModal />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalScroll: {
    marginBottom: 24,
  },
  emptyState: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  emptyStateText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
    fontWeight: FONT_WEIGHTS.bold,
  },
});

const AchivementList = React.memo(AchivementListComponent);

export default AchivementList;
