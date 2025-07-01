import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LessonCategory, LessonGame } from '@/utils/constants/categories';
import { COLORS } from '@/utils/constants/colors';
import GameTile from './GameTile';
import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth-store';



interface SectionProps {
  category: LessonCategory;
}
export default function Section({category}: SectionProps) {

  const user = useAuthStore(state=> state.user);

    const handleSelectGame = (game: LessonGame) => {
    if (game.isLocked || category.isLocked) {
        return};
  };


  const filteredGames = useMemo(() => {


    const filtered = category.games.filter(game => {

      return game.languageId === user?.currentLanguage;
    });

    return filtered;
  }, [category.games, user?.currentLanguage]);



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
        {filteredGames && filteredGames.map((game) => (
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
