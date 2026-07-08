import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import OnboardingPagination from '@/components/ui/OnboardingPagination';
import { useAuthStore } from '@/store/useAuthStore';
import { theme } from '@/constants/theme';

// ✅ Onboarding page data
const ONBOARDING_PAGES = [
  {
    id: '1',
    emoji: '🌾',
    title: 'Welcome to AgriTech',
    subtitle:
      'Empowering smallholder farmers with digital tools for better farming, market access, and financial inclusion.',
  },
  {
    id: '2',
    emoji: '📋',
    title: 'Register & Manage Farmers',
    subtitle:
      'Agents can register new farmers, capture GPS locations, and take photos — all offline. Farmers get their unique Digital ID instantly.',
  },
  {
    id: '3',
    emoji: '🚀',
    title: 'Ready to Get Started?',
    subtitle:
      'Join the AgriTech community. Register farmers, access advisory services, and connect to markets — all from your phone.',
  },
];

export default function OnboardingScreen() {
  const { setOnboardingCompleted } = useAuthStore();
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(0);

  const isLastPage = currentPage === ONBOARDING_PAGES.length - 1;

  const handleSkip = async () => {
    await setOnboardingCompleted(true);
    router.replace('/(auth)/welcome');
  };

  const handleNext = () => {
    if (isLastPage) {
      handleSkip();
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: currentPage + 1,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(index);
  };

  const renderPage = ({ item, index }: { item: (typeof ONBOARDING_PAGES)[0]; index: number }) => (
    <View style={[styles.page, { width }]}>
      <View style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>{item.emoji}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <Screen contentStyle={styles.container}>
      {/* Pages */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_PAGES}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <OnboardingPagination currentPage={currentPage} totalPages={ONBOARDING_PAGES.length} />
        <PrimaryButton
          label={isLastPage ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
        <Text style={styles.skipLink} onPress={handleSkip}>
          Skip
        </Text>
      </View>
    </Screen>
  );
}

// ✅ Shared styles — everything in one place
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xl,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 72,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  footer: {
    gap: theme.spacing.md,
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
  },
  skipLink: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '500',
  },
});