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
import { BookOpen, ChevronRight, Flame, Trophy } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/language-store';

export default function App() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { selectedLanguage, appLanguages, selectLanguage } = useLanguageStore();

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
            <View style={styles.streakContainer}>
              <Flame size={16} color={COLORS.secondary} />
              <Text style={styles.streakText}>{user?.streak} day streak</Text>
            </View>
          </View>
          <TouchableOpacity>{/* <Avatar/> */}</TouchableOpacity>
        </View>

        {/* Daily progress */}
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
            onPress={() => router.push('/learn')}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {/* courses */}

        {/* language select */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Language</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push('/language-selection')}
          >
            <Text style={styles.seeAllText}>Change</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* language card */}
        <View style={styles.languageCard}>
          <View style={styles.languageFlag}>
            <Text style={styles.languageEmoji}>
              {/* {selectedLanguage.flag ? '🌍' : '🌍'} */}
              {user?.currentLanguage ? '🌍' : '🌍'}
            </Text>
          </View>
          <View style={styles.languageInfo}>
            {/* <Text style={styles.languageName}>{selectedLanguage.name}</Text>
            <Text style={styles.languageNative}>{selectedLanguage.nativeName}</Text> */}
                        <Text style={styles.languageName}>{user?.currentLanguage}</Text>
                        <Text style={styles.languageNative}>{user?.currentLanguage}</Text>
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
    backgroundColor: COLORS.primaryLight,
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
    backgroundColor: COLORS.primaryLight,
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
});
