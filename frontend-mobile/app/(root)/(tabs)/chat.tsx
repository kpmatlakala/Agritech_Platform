import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { theme } from '@/constants/theme';

export default function ChatScreen() {
  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Extension Support</Text>
        <Text style={styles.message}>Support chat is in design mode. Advisory messaging services will be added later.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text,
  },
  message: {
    fontSize: 15,
    color: theme.colors.muted,
    lineHeight: 22,
  },
});
