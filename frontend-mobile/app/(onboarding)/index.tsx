import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import OnboardingPagination from '@/components/ui/OnboardingPagination';
import { useAuthStore } from '@/store/useAuthStore';

const ONBOARDING_PAGES = [
  {
    id: '1',
    emoji: '🌾',
    title: 'Welcome to AgriTech',
    kicker: 'For the field, not the office',
    subtitle:
      'Empowering smallholder farmers with digital tools for better farming, market access, and financial inclusion.',
  },
  {
    id: '2',
    emoji: '📋',
    title: 'Register & Manage Farmers',
    kicker: 'Capture once, use everywhere',
    subtitle:
      'Agents can register new farmers, capture GPS locations, and take photos — all offline. Farmers get their unique Digital ID instantly.',
  },
  {
    id: '3',
    emoji: '🚀',
    title: 'Ready to Get Started?',
    kicker: 'From profile to productivity',
    subtitle:
      'Join the AgriTech community. Register farmers, access advisory services, and connect to markets — all from your phone.',
  },
];

export default function OnboardingScreen() {
  const { setOnboardingCompleted } = useAuthStore();
  const flatListRef = useRef<FlatList>(null);
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(0);

  const isLastPage = currentPage === ONBOARDING_PAGES.length - 1;
  const pageWidth = screenWidth;
  const isTablet = screenWidth >= 768;

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
    const index = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    setCurrentPage(index);
  };

  const renderPage = ({ item, index }: { item: (typeof ONBOARDING_PAGES)[0]; index: number }) => (
    <View style={{ width: pageWidth }} className="flex-1 justify-center items-center px-4 md:px-8">
      <View className="w-full max-w-[400px] md:max-w-[600px] min-h-[380px] md:min-h-[480px] p-6 md:p-8 rounded-2xl border border-border bg-surface items-center justify-center gap-4 shadow-lg">
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-xs font-bold uppercase tracking-wider text-secondary">
            Step {index + 1}
          </Text>
          <Text className="text-xs font-semibold text-muted">
            {item.kicker}
          </Text>
        </View>

        <View className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-surfaceSoft border border-border items-center justify-center">
          <Text className="text-6xl md:text-7xl">{item.emoji}</Text>
        </View>

        <Text className="text-3xl md:text-4xl font-bold text-text text-center">
          {item.title}
        </Text>
        <Text className="text-base md:text-lg text-muted text-center leading-relaxed px-2">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );

  return (
    <Screen
      contentStyle={{
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 0,
      }}
    >
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
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />

      {/* Footer */}
      <View
        className="gap-4 items-center pb-4 pt-2"
        style={{ paddingBottom: Math.max(insets.bottom || 16, 16) }}
      >
        <OnboardingPagination currentPage={currentPage} totalPages={ONBOARDING_PAGES.length} />

        <PrimaryButton
          label={isLastPage ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="solid"
          style={{
            maxWidth: isTablet ? 600 : 400,
          }}
        />

        <Text className="text-muted text-base font-semibold" onPress={handleSkip}>
          Skip
        </Text>
      </View>
    </Screen>
  );
}