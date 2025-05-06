import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AchievementCard from '@/components/shared/AchievementCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/constants/colors';
import { useProgressStore } from '@/store/progress-store';
import { useAuthStore } from '@/store/auth-store';
import SkillProgressContainer from '@/components/shared/SkillProgressContainer';

export default function AchievementsPage() {
  //get skill, acchievements and checkAchievements states
  // track checkachievements with useEffect
  const { user } = useAuthStore();
  const { achievements, skills, getCompletedGames } = useProgressStore();
  if (!user) {

    return null;
  }
  const games = getCompletedGames();

  console.log(">> Games state >>", games[0].challenges
  )

  //filter achievement -> unlocked & locked
  const unlockedAchievements = achievements.filter((item) => item.unlocked);
  const lockedAchievements = achievements.filter((item) => !item.unlocked);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Skills */}
        {/* <Text style={styles.sectionTitle}>Skills</Text> */}

        {/* <View style={styles.skillsContainer}>
          {skills.map((skill) => (
            <SkillProgressContainer key={skill.id} skill={skill} />
          ))}
        </View> */}

        {/* Achievements */}

        <Text style={styles.sectionTitle}>Achievements</Text>

        {unlockedAchievements && (
          <>
            <Text style={styles.subsectionTitle}>Unlocked</Text>
            <ScrollView
              showsHorizontalScrollIndicator={true}
              horizontal
              style={styles.horizontalScroll}
            >
              {unlockedAchievements.map((item) => (
                <AchievementCard key={item.id} achievement={item} />
              ))}
            </ScrollView>
          </>
        )}

        {lockedAchievements && (
          <>
            <Text style={styles.subsectionTitle}>Locked</Text>
            <ScrollView
              showsHorizontalScrollIndicator={true}
              horizontal
              style={styles.horizontalScroll}
            >
              {lockedAchievements.map((item) => (
                <AchievementCard key={item.id} achievement={item} />
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  statsContainer: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  skillsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 600,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 15,
    color: colors.textLight,
    fontWeight: 500,
    marginBottom: 16,
  },
  horizontalScroll: {
    marginBottom: 24,
  },
});
