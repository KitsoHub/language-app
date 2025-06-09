import { Platform, Pressable, StyleSheet, Text, View, Image, ViewStyle } from 'react-native'
import { LessonGame } from '@/utils/constants/categories';
import { useHaptics } from '@/utils/hooks/useHaptics';
import { COLORS } from '@/utils/constants/colors';
import CircularProgress from './games/CircularProgress';
import { Star,Lock } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useNewGameStore } from '@/store/game/new-game-store';
import { router } from 'expo-router';
import { ROUTES } from '@/utils/constants/routes';

interface GameTileProps {
  game: LessonGame;
  categoryColor: string;
  isLocked: boolean;
  requiresSubscription: boolean;
  progress: number;
  onPress: () => void;
}
export default function GameTile({  game,categoryColor, isLocked, requiresSubscription, progress, onPress}: GameTileProps) {

        const { triggerHaptic } = useHaptics();

    const scale = useSharedValue(1);
    const rotate = useSharedValue(0);

    // store
      const {
selectGame
      } = useNewGameStore();

    const handlePressOut = () => {
      if (isLocked || requiresSubscription) return;
      scale.value = withSequence(
        withTiming(1.05, { duration: 150 }),
        withSpring(1, { damping: 12 })
      );
      rotate.value = withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
    };

      const handlePressIn = () => {
      if (isLocked) return;
      scale.value = withTiming(0.95, { duration: 100 });
    };


    const handlePress =()=>{
      if(isLocked || requiresSubscription){
          triggerHaptic('error'); return;
      }

        triggerHaptic('success');
        selectGame(game.id);
    router.push(ROUTES.GAMES);

        onPress()
    }
   const animatedStyle = useAnimatedStyle(() => {
      if (Platform.OS === 'web') {
        return {};
      }

      return {
        transform: [
          { scale: scale.value },
          { rotate: `${rotate.value}deg` }
        ],
      };
    });

      const TileComponent = Platform.OS === 'web' ? View : Animated.View;

       const renderIcon = () => {
      if (isLocked) {
        return <Lock size={24} color="#999" />;
      }

      if (progress > 0) {
        return <Star size={24} color="#FFF" />;
      }

      return  <Image
        source={require('@/assets/avatars/book_avatar.png')}
        resizeMode="contain"
      />
    };
  const getContainerStyle = (): ViewStyle => {
      if (isLocked) {
        return styles.lockedContainer;
      }

      if (progress > 0) {
        return {
          ...styles.activeContainer,
          backgroundColor: categoryColor,
        };
      }

      return styles.availableContainer;
    };



  return (
<View style={styles.wrapper}>
      <TileComponent style={[animatedStyle]}>
<Pressable
 onPress={handlePress}
onPressIn={Platform.OS !== 'web' ? handlePressIn : undefined}
 onPressOut={Platform.OS !== 'web' ? handlePressOut : undefined}
       style={({ pressed }) => [
            styles.tileContainer,
            getContainerStyle(),
            Platform.OS === 'web' && pressed && !isLocked && { transform: [{ scale: 0.95 }] }
          ]}
          disabled={isLocked}>

        {progress > 0 && !isLocked && (
            <CircularProgress
            progress={progress}
              size={80}
              strokeWidth={5}
              color="#4A90E2"
              bgColor="rgba(255,255,255,0.3)"

            />
          )}

<View style={styles.iconContainer}>
            {renderIcon()}
          </View>
         {progress === 0 && !isLocked && (
            <View style={styles.startBadge}>
              <Text style={styles.startText}>START</Text>
            </View>
          )}
</Pressable>

  </TileComponent>
      {game.isLocked && game.requiresSubscription && (
        <Text style={styles.subscriptionText}>Subscribe to unlock</Text>
      )}
</View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
    subscriptionText: {
    fontSize: 12,
    color: '#4A90E2',
    marginTop: 4,
    textAlign: 'center',
  },
  startBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
  startText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Tile component container
    tileContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedContainer: {
    backgroundColor: '#E0E0E0',
  },
  availableContainer: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#D0D0D0',
  },
  activeContainer: {
    borderWidth: 0,
  },
})
