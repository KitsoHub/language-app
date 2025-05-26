import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

type BenefitItemProps = {
  text: string;
};

export default function BenefitItem({ text }: BenefitItemProps) {
  return (
    <View style={styles.container}>
      <Check size={18} color="#00E5C3" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
