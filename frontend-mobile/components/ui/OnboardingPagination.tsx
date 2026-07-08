import { StyleSheet, View } from 'react-native';
import { theme } from '@/constants/theme';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function OnboardingPagination({ currentPage, totalPages }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  inactiveDot: {
    backgroundColor: theme.colors.muted,
    opacity: 0.4,
  },
});