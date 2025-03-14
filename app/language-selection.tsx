import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LanguageCard from '@/components/shared/LanguageCard';
import { Stack, useRouter } from 'expo-router';
import { useLanguageStore } from '@/store/language-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/constants/colors';
// import { appLanguages } from '@/mocks/languages';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants/routes';

export default function LanguageSelectionPage() {
  const router = useRouter();
  const {appLanguages, selectLanguage } = useLanguageStore();

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
      router.replace(ROUTES.HOME);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{headerShown:true, title: "Select Language"}}/>
      <View style={styles.header}>
        <Text style={styles.title}>
          Which language would you like to learn?
        </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
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
});
