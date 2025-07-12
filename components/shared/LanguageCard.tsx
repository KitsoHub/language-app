import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
} from 'react-native';
import { Language } from '@/types';
import { COLORS } from '@/utils/constants/colors';
import { Check } from 'lucide-react-native';

interface LanguageCardProps {
  language: Language;
  selected?: boolean;
  onPress: (language: Language) => void;
  style?: ViewStyle;
}
export default function LanguageCard({
  language,
  selected = false,
  onPress,
  style,
}: LanguageCardProps) {
  const getID = () => {
    if (!language) return '';

    return language.id.toLocaleUpperCase();
  };

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer, style]}
      activeOpacity={0.7}
      onPress={() => onPress(language)}
    >
      <View style={styles.flagContainer}>
        <Text style={[styles.languageID]}>{getID()}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{language.name}</Text>
        <Text style={styles.nativeName}>{language.nativeName}</Text>
      </View>

      {selected && <Check style={{marginTop: 20}} size={20} color={COLORS.colorGreen} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  selectedContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.gray200,
  },
  flagContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
marginRight:20,
  },

  flag: {
    width: '100%',
    height: '100%',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  nativeName: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },

  languageID: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
