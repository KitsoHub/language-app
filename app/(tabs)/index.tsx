'use client';

import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BookOpen,
  ChevronRight,
  Flame,
  Trophy,
  HandCoins,
  Heart,
  Globe,
  Crown,
  Star,
  Coins,
  Settings2,
  Grid,
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { Stack, useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/language-store';
<<<<<<< HEAD
import { useProgressStore } from '@/store/progress-store';
import { useEffect, useState } from 'react';
=======

import { useEffect, useMemo, useState } from 'react';
>>>>>>> 334e32d587ce41d084647f7ec15074671e804b72
import { ROUTES } from '@/utils/constants/routes';
import { useNewGameStore } from '@/store/game/new-game-store';
import type { Game } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Filter, Line } from 'react-native-svg';
import { Button } from '@/components/ui/Button';
import Header from '@/components/shared/Header';
import Section from '@/components/shared/Section';
import { useCategoriesStore } from '@/store/game/categories-store';
<<<<<<< HEAD
=======
import auth from '@react-native-firebase/auth'
import EmptyState from '@/components/shared/EmptyState';
>>>>>>> 334e32d587ce41d084647f7ec15074671e804b72

// Expanded Fall Guys inspired color palette
const COLORS = {
  primary: '#FF4D6D', // Pink
  primaryLight: '#FF97A7', // Light Pink
  primaryDark: '#D13354', // Dark Pink
  secondary: '#FFC857', // Yellow
  secondaryLight: '#FFE3A3', // Light Yellow
  secondaryDark: '#E6A100', // Dark Yellow
  tertiary: '#4ECDC4', // Teal
  tertiaryLight: '#8EEAE4', // Light Teal
  tertiaryDark: '#2A9D95', // Dark Teal
  quaternary: '#7B61FF', // Purple
  quaternaryLight: '#B4A5FF', // Light Purple
  quaternaryDark: '#5840CC', // Dark Purple
  success: '#7AE582', // Green
  successLight: '#B5F2BA', // Light Green
  successDark: '#4CAF50', // Dark Green
  warning: '#FF9E00', // Orange
  warningLight: '#FFD699', // Light Orange
  warningDark: '#E67700', // Dark Orange
  danger: '#FF5252', // Red
  dangerLight: '#FF8A8A', // Light Red
  dangerDark: '#CC0000', // Dark Red
  background: '#F5F7FF', // Light background
  backgroundAlt: '#E8EFFF', // Alternate background
  white: '#FFFFFF',
  black: '#333333',
  textDark: '#333333',
  text: '#333333',
  textLight: '#666666',
  gray200: '#E5E7EB',
  gray400: '#D1D5DB',
  mascotBackground: '#FFE8D6',
};

// Game difficulty color schemes
const DIFFICULTY_COLORS = {
  beginner: {
    primary: COLORS.tertiary,
    secondary: COLORS.tertiaryLight,
    text: '#003E3E',
    gradient: ['#8EEAE4', '#4ECDC4'] as const,
  },
  easy: {
    primary: COLORS.success,
    secondary: COLORS.successLight,
    text: '#006400',
    gradient: ['#B5F2BA', '#7AE582'] as const,
  },
  medium: {
    primary: COLORS.warning,
    secondary: COLORS.warningLight,
    text: '#664500',
    gradient: ['#FFD699', '#FF9E00'] as const,
  },
  hard: {
    primary: COLORS.danger,
    secondary: COLORS.dangerLight,
    text: '#FFFFFF',
    gradient: ['#FF8A8A', '#FF5252'] as const,
  },
};

export default function App() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { games, selectGame } = useNewGameStore();
  const { selectedLanguage } = useLanguageStore();

<<<<<<< HEAD
  // Add state to toggle view mode
=======
      const { appLanguages } = useLanguageStore();
        const currentLanguage = appLanguages.find(lang => user?.currentLanguage === lang.id);

>>>>>>> 334e32d587ce41d084647f7ec15074671e804b72
  const [isGridView, setIsGridView] = useState(false);

  const handleSelectGame = (gameId: string) => {
    selectGame(gameId);
    router.push(ROUTES.GAMES);
  };

  const getDifficultyStyle = (badge: string) => {
    const difficulty = badge.toLowerCase() as keyof typeof DIFFICULTY_COLORS;
    return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.beginner;
  };

  const { dailyGoal, dailyProgress } = useProgressStore();

  // Filter games based on selected language
  const appGames = games?.filter((game) =>
    game.languageId?.includes(selectedLanguage?.id || ''),
  );
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (
      user &&
      user.currentLanguage &&
      typeof selectedLanguage === 'function'
    ) {
      selectedLanguage(user.currentLanguage);
    }
  }, []);

  const renderGameItem = ({ item, index }: { item: Game; index: number }) => {
    const completedChallenges = user?.completedChallenges || [];
    const totalChallenges = item.challenges.length;
    const completedCount = item.challenges.filter((challenge) =>
      completedChallenges.includes(String(challenge.id)),
    ).length;
    const progress =
      totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;

    const difficultyStyle = getDifficultyStyle(item.gameBadge);

    // Alternate card colors for visual variety
    const cardColors = ['#FFFFFF', '#F5F5F5'] as const;

    // Apply additional styling for grid view
    const cardStyles = [
      styles.gameCard,
      { transform: [{ translateY: isGridView ? 0 : index % 2 === 0 ? 0 : 8 }] }, // disable offset in grid mode
      isGridView && styles.gridGameCard,
    ];




    return (
      <Pressable style={cardStyles} onPress={() => handleSelectGame(item.id)}>
        <View
          style={[
            styles.gameCardGradient,
            isGridView && styles.gameCardGradientGrid,
          ]}
        >
          {isGridView ? (
            <>
              <View style={styles.gameIconContainer}>
                <Text
                  style={[styles.gameIcon, { color: difficultyStyle.primary }]}
                >
                  {item.gameIcon}
                </Text>
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{item.title}</Text>
                <Text style={styles.gameDescription}>{item.description}</Text>
                <Text
                  style={[
                    styles.gameDescription,
                    { color: difficultyStyle.text },
                  ]}
                >
                  {totalChallenges} challenges
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{item.title}</Text>
                <Text style={styles.gameDescription}>{item.description}</Text>
                <Text
                  style={[
                    styles.gameDescription,
                    { color: difficultyStyle.text },
                  ]}
                >
                  {totalChallenges} challenges
                </Text>
              </View>
              <View style={styles.gameIconContainer}>
                <Text
                  style={[styles.gameIcon, { color: difficultyStyle.primary }]}
                >
                  {item.gameIcon}
                </Text>
              </View>
            </>
          )}
          {/* Decorative elements */}
          {/*  */}
        </View>
        {!isGridView && ( // { changed code }
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={difficultyStyle.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBar, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {completedCount}/{totalChallenges}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

 const { categories } = useCategoriesStore();

      const filteredCategories = useMemo(() => {

        const filtered = categories.filter(category =>
    category.games.some(game => game.languageId === user?.currentLanguage)
  );
  return filtered
      }, [user?.currentLanguage,categories]);

  // const filteredCategories = categories.filter(category =>
  //   category.games.some(game => game.languageId === user?.currentLanguage)
  // );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#E0F7FA', '#E8F5E9', '#FFF8E1']}>
        <ScrollView style={styles.scrollContent}>
          <Header />


          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Let's Learn</Text>
            </View>

          </View>

			          {filteredCategories.length > 0?(

                  filteredCategories.map((category) => (
                   <Section key={category.id} category={category} />



          ))
        )
          :

        (

      <EmptyState
           title={`${currentLanguage?.name} Games`}
           description="No Games available. Try another language."
           animationSource={require('@/assets/lotties/empty_scroll.json')}
         />
        )
        }

		   <View style={{ height: 80}} />


        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  gradient: {
    flex: 1,
    
  },

    scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },

  backgroundPatterns: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  patternCircle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.15,
  },
  patternCircle1: {
    backgroundColor: COLORS.primary,
    width: 200,
    height: 200,
    top: '10%',
    left: -100,
  },
  patternCircle2: {
    backgroundColor: COLORS.secondary,
    width: 150,
    height: 150,
    top: '30%',
    right: -50,
  },
  patternCircle3: {
    backgroundColor: COLORS.tertiary,
    width: 180,
    height: 180,
    bottom: '20%',
    left: -90,
  },
  patternCircle4: {
    backgroundColor: COLORS.quaternary,
    width: 120,
    height: 120,
    bottom: '5%',
    right: -40,
  },
  headerGradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 8,
    paddingBottom: 20,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  statText: {
    color: COLORS.white,
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 14,
  },
  avatarContainer: {
    marginLeft: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  dailyGoalCard: {
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 77, 109, 0.2)',
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  targetIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetIconText: {
    fontSize: 20,
  },
  dailyGoalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  starContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dailyGoalMessage: {
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 12,
    fontWeight: '500',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitleContainer: {
    shadowColor: 'rgba(149, 145, 145, 0.58)',
    shadowRadius: 14,
    borderRadius: 5,
    marginRight: 9,
    overflow: 'hidden',
    paddingVertical: 5,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  filterButton: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  seeAllGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginRight: 4,
    fontWeight: '700',
    borderBlockColor: 'rgba(255, 255, 255, 0.6)',
  },
  gamesList: {
    paddingHorizontal: 16,
    paddingBottom: 25,
    paddingTop: 10,
  },
  gameCard: {
    borderRadius: 15,
    marginBottom: 20,
    elevation: 6,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: COLORS.white,
  },
    gridGameCard: {

    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 1,
    overflow: 'hidden',
    marginBottom: 12,
    marginTop: 19,
    paddingTop: 10,
  },
  gameCardGradient: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 24,
    paddingBottom: 1,
    paddingTop: 1,
  },

  gameCardGradientGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameIconContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',

  },
  gameIcon: {
    fontSize: 32,
    textAlign: 'center',
  },
  gameInfo: {
    flex: 1,
    zIndex: 1,
  },
  gameTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 12,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#DFF2FA',
    borderRadius: 6,
    marginRight: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    marginTop: 1,
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  sparkleContainer: {
    position: 'absolute',
    right: 4,
    top: -2,
  },
  sparkle: {
    transform: [{ rotate: '45deg' }],
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.15,
  },
  decorCircle1: {
    width: 60,
    height: 60,
    bottom: -20,
    right: 40,
  },
  decorCircle2: {
    width: 40,
    height: 40,
    top: -10,
    right: 80,
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
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    fontWeight: '600',
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray400,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginTop: 6,
    paddingLeft: 16,
  },
  languageFlag: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  languageLevelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  languageLevel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  decorDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.tertiary,
    opacity: 0.2,
  },
  decorDot1: {
    bottom: 10,
    right: 30,
  },
  decorDot2: {
    bottom: 30,
    right: 20,
  },
  decorDot3: {
    bottom: 20,
    right: 40,
  },
});
