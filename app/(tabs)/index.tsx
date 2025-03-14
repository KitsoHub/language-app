import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyState from '@/components/shared/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/constants/colors';
import { DailyGoal } from '@/components/shared/DailyGoal';
import { BookOpen, ChevronRight, Flame, Trophy, HandCoins, Heart } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/language-store';
import { useProgressStore } from '@/store/progress-store';
import CourseCard from '@/components/shared/CourseCard';
import { useEffect } from 'react';
import { ROUTES } from '@/utils/constants/routes';

export default function App() {
  const { user } = useAuthStore();
  const router = useRouter();
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {/* streak */}
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>
              Hello, {user?.name.split(' ')[0]}!
            </Text>

            <View style={{ flex: 1, flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
              {/* <Text style={styles.streakText}>Language: Setswana</Text> */}
              <View style={styles.streakContainer}>
                <Flame size={24} color={COLORS.secondary} />
                <Text style={styles.streakText}>{user?.streak} day streak</Text>
              </View>
              <View style={styles.streakContainer}>
                {/*coins , points */}
                <HandCoins size={24} color={COLORS.green} />
                <Text style={styles.streakText}>{user?.streak} </Text>
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
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push(ROUTES.LEARN)}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
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
    marginBottom: 4,
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
});
