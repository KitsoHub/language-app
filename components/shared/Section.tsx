import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { LessonCategory } from '@/utils/constants/categories';
import { useNewGameStore } from '@/store/game/new-game-store';
import { useLanguageStore } from '@/store/language-store';
import { useHaptics } from '@/utils/hooks/useHaptics';
import GameTile from './GameTile';
import { router } from 'expo-router';
import { ROUTES } from '@/utils/constants/routes';
import { COLORS } from '@/utils/constants/colors';

interface SectionProps {
  category: LessonCategory;
}

export default function Section({ category }: SectionProps) {
  const { games, selectGame } = useNewGameStore();
  const { selectedLanguage } = useLanguageStore();
  const { triggerHaptic } = useHaptics();

  // Filter games by selected language and category only
  const filteredGames = games.filter(
    (game) =>
      game.languageId === selectedLanguage?.id &&
      game.categoryId === category.id
  );

  const handleSelectGame = (game) => {
    if (game.isLocked || category.isLocked) return;
    triggerHaptic('light');
    selectGame(game.id);
    router.push(ROUTES.GAMES);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.line} />
        <Text style={[styles.title, { color: '#999' }]}>{category.title}</Text>
        <View style={styles.line} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tilesContainer}
      >
        {filteredGames.map((game) => (
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
  );
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
    marginTop: 10,
    paddingHorizontal: 20,
  },
});