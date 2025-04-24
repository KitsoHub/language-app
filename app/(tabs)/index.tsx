import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyState from '@/components/shared/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, COLORS } from '@/utils/constants/colors';
import { DailyGoal } from '@/components/shared/DailyGoal';
import { BookOpen, ChevronRight, Flame, Trophy, HandCoins, Heart } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/language-store';
import { useProgressStore } from '@/store/progress-store';
import CourseCard from '@/components/shared/CourseCard';
import { useEffect } from 'react';
import { ROUTES } from '@/utils/constants/routes';
import { useNewGameStore } from '@/store/game/new-game-store';
import type { Game } from '@/types';

export default function App() {
  const { user } = useAuthStore();
  const router = useRouter();
  const {games, selectGame}= useNewGameStore();
  const handleSelectGame = (gameId: string) => {
    selectGame(gameId)
    router.push(ROUTES.GAMES)
  }


  const getBadgeStyle = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'easy':
        return styles.easyBadge;
      case 'medium':
        return styles.mediumBadge;
      case 'hard':
        return styles.hardBadge;
      case 'beginner':
        return styles.beginnerBadge;
      default:
        return styles.beginnerBadge;
    }
  };

  const { selectedLanguage, appLanguages, selectLanguage } = useLanguageStore();
  const {
    courses,
    dailyGoal,
    dailyProgress,
    // resetDailyProgressIfNeeded,
    getCoursesByLanguage,
  } = useProgressStore();
  useEffect(() => {
    //resetDailyProgressIfNeeded();

    // Set selected language from user if not already set
    if (user && user.currentLanguage && !selectedLanguage) {
      selectLanguage(user.currentLanguage);
    }
  }, []);
  const languageCourses = getCoursesByLanguage(selectedLanguage?.id);
  const availableCourses = languageCourses.filter(course => course.lessons.some(lesson => !lesson.locked))
  const handleCoursePress = (course: any) => {
    router.push(`/course/${course.id}`);
  };


  // TODO: add a game card
  const renderGameItem = ({ item }: { item: Game }) => {
    const completedChallenges = user?.completedChallenges || [];
    const totalChallenges = item.challenges.length;
    const completedCount = item.challenges.filter(
      challenge => completedChallenges.includes(String(challenge.id))
    ).length;
    const progress = totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;

    return (
      <Pressable
        style={styles.gameCard}
        onPress={() => handleSelectGame(item.id)}
      >
        <View style={styles.gameIconContainer}>
          <Text style={styles.gameIcon}>{item.gameIcon}</Text>
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{item.title}</Text>
          <Text style={styles.gameDescription}>{item.description}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{completedCount}/{totalChallenges}</Text>
          </View>
        </View>
        <View style={[styles.badgeContainer, getBadgeStyle(item.gameBadge)]}>
          <Text style={styles.badgeText}>{item.gameBadge}</Text>
        </View>
      </Pressable>
    );
  };




  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          {/* streak */}
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>
              Hello, {user?.name.split(' ')[0]}!
            </Text>

            <View style={{ flex: 1, flexDirection: 'row', gap: 20, justifyContent: 'center', padding: 10 }}>
              {/* <Text style={styles.streakText}>Language: Setswana</Text> */}
              <View style={styles.streakContainer}>
                <Flame size={24} color={COLORS.secondary} />
                {/* <Text style={styles.streakText}>{user?.streak} day streak</Text> */}
              </View>
              <View style={styles.streakContainer}>
                {/*coins , points */}
                <HandCoins size={24} color={COLORS.green} />
                {/* <Text style={styles.streakText}>{user?.streak} </Text> */}
              </View>

              <View style={styles.streakContainer}>

                <Heart size={24} color={COLORS.primary} />

              </View>
            </View>

          </View>
          <TouchableOpacity>{/* <Avatar/> */}</TouchableOpacity>
        </View>

       {/* to use daily progress and goal */}
        <DailyGoal current={0} goal={0} />
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Trophy size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>{user?.xp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <BookOpen size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>{user?.level}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
          </View>
        </View>
        {/* continue button */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Game</Text>
          {/* TODO: change route to games */}
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push(ROUTES.LEARN)}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {/* courses */}
        {/* {availableCourses.length > 0 ? (
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
        )} */}

        {games.length > 0?(
                <FlatList
                data={games}
                renderItem={renderGameItem}

                showsVerticalScrollIndicator={false}
                nestedScrollEnabled

                // keyExtractor={(item) => item.id}
                contentContainerStyle={styles.gamesList}
              />
        ):(
          <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No available games. Please select a different language.
          </Text>
        </View>
        )}

        {/* language select */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Language</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push(ROUTES.LANGUAGESELECT)}
          >
            <Text style={styles.seeAllText}>Change</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* language card */}
        <View style={styles.languageCard}>
          <View style={styles.languageFlag}>
            <Text style={styles.languageEmoji}>
              {selectedLanguage?.flag ? '🌍' : '🌍'}

            </Text>
          </View>
          <View style={styles.languageInfo}>
            <Text style={styles.languageName}>{selectedLanguage?.name}</Text>
            <Text style={styles.languageNative}>{selectedLanguage?.nativeName}</Text>

          </View>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  streakText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 4,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  languageFlag: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  languageEmoji: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  beginnerBadge: {
    backgroundColor: '#E0F7FA',
  },
  easyBadge: {
    backgroundColor: '#E8F5E9',
  },
  mediumBadge: {
    backgroundColor: '#FFF9C4',
  },
  hardBadge: {
    backgroundColor: '#FFEBEE',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  gamesList: {
    padding: 16, paddingBottom: 24,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gameIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.mascotBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  gameIcon: {
    fontSize: 30,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.gray400,
    borderRadius: 4,
    marginRight: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
});
