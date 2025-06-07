import { StyleSheet, Text, View, ScrollView, Platform, Pressable, ViewStyle, Image } from 'react-native'
import React from 'react'
import { LessonCategory, LessonGame } from '@/utils/constants/categories';
import { useNewGameStore } from '@/store/game/new-game-store';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { Book, Star, Lock } from 'lucide-react-native';
import CircularProgress from './games/CircularProgress';
import { COLORS } from '@/utils/constants/colors';
import { useHaptics } from '@/utils/hooks/useHaptics';
import GameTile from './GameTile';
import { router } from 'expo-router';
import { ROUTES } from '@/utils/constants/routes';


interface SectionProps {
  category: LessonCategory;
}
export default function Section({category}: SectionProps) {
    const {selectGame} = useNewGameStore()
      const { triggerHaptic } = useHaptics();

      const handleSelectGame = (game: LessonGame) => {
    if (game.isLocked || category.isLocked) {

        return};
    selectGame(game.id);
		router.push(ROUTES.GAMES);
        console.log('Selected game:', game.id);
  };


  return (
<View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.line} />
        <Text style={[styles.title, { color: '#999'}]}>{category.title}</Text>
        <View style={styles.line} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tilesContainer}
      >
        {category.games.map((game) => (
          <GameTile
            key={game.id}
            game={game}
            categoryColor={category.color}
            isLocked={game.isLocked || category.isLocked}
            requiresSubscription={game.requiresSubscription || category.requiresSubscription}
            progress={game.progress}
            onPress={() => handleSelectGame(game)}
          />


        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  tilesContainer: {
    marginTop:10,
    paddingHorizontal: 20
  },

})
