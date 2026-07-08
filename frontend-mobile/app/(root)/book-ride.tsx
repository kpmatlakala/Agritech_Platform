import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { theme } from '@/constants/theme';

export default function BookRideScreen() {
  const router = useRouter();
  const [inputType, setInputType] = useState('');
  const [quantity, setQuantity] = useState('');

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Input Request</Text>
        <Text style={styles.subtitle}>Design demo only. Stock, pricing, and fulfillment are mocked.</Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="Input Type"
          placeholder="e.g. Maize seed, NPK fertilizer"
          value={inputType}
          onChangeText={setInputType}
        />
        <TextField
          label="Quantity"
          placeholder="e.g. 20 bags"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>

      <PrimaryButton label="Preview Request" onPress={() => router.push('/(root)/confirm-ride')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 16,
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  form: {
    gap: theme.spacing.md,
  },
});
