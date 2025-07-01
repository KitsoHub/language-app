import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import LanguageCard from '@/components/shared/LanguageCard';
import {  useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/language-store';

import { COLORS } from '@/utils/constants/colors';

import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants/routes';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');
export default function LanguageSelectionPage() {
  const router = useRouter();
  const { appLanguages, selectLanguage } = useLanguageStore();

  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = appLanguages.filter(
    (language) =>
      language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.nativeName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguageId(language.id);
  };

  const handleContinue = () => {
    if (selectedLanguageId) {
      selectLanguage(selectedLanguageId);
      router.replace(ROUTES.TABS);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bgYStyle]}>
        <LinearGradient
          colors={[COLORS.background, COLORS.darkBlue]}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Select Language</Text>
            <Text style={styles.subTitle}>Choose your preferred language to continue</Text>
          </View>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {filteredLanguages.map((language) => (
              <LanguageCard
                key={language.id}
                language={language}
                selected={selectedLanguageId === language.id}
                onPress={handleLanguageSelect}
              />
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!selectedLanguageId}
              style={styles.continueButton}
            />
          </View>
        </LinearGradient>
      </Animated.View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
        textAlign: 'center',
  },
  scrollView: {
    // flex: 1,
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  continueButton: {
    width: '100%',
  },

  bgYStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.darkBlue,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
});
