import { useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFarmerProfileStore } from '@/store/useFarmerStore';
import { Screen } from '@/components/ui/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';

interface AdvisoryCardProps {
  title: string;
  description: string;
  category: 'weather' | 'pest' | 'crop' | 'market' | 'general';
  priority: 'high' | 'medium' | 'low';
}

function AdvisoryCard({ title, description, category, priority }: AdvisoryCardProps) {
  const categoryIcon = {
    weather: '🌤️',
    pest: '🦗',
    crop: '🌱',
    market: '📊',
    general: '💡',
  }[category];

  const priorityColor = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  }[priority];

  return (
    <View style={styles.advisoryCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{categoryIcon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.priorityText}>{priority}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

interface TipItemProps {
  tip: string;
  icon: string;
}

function TipItem({ tip, icon }: TipItemProps) {
  return (
    <View style={styles.tipItem}>
      <Text style={styles.tipIcon}>{icon}</Text>
      <Text style={styles.tipText}>{tip}</Text>
    </View>
  );
}

export default function AdvisoryScreen() {
  const { profile } = useFarmerProfileStore();
  const [refreshing, setRefreshing] = useState(false);

  const mockAdvisory: AdvisoryCardProps[] = [
    {
      title: 'Optimal Planting Window',
      description: 'Based on seasonal patterns, this is a good time to prepare your fields for planting. Ensure soil moisture levels are adequate.',
      category: 'crop',
      priority: 'high',
    },
    {
      title: 'Pest Alert: Armyworm',
      description: 'Armyworms have been reported in nearby areas. Monitor your crops closely and consider preventive measures if necessary.',
      category: 'pest',
      priority: 'medium',
    },
    {
      title: 'Weather Forecast',
      description: 'Rain expected in 2-3 days. Plan irrigation accordingly and ensure drainage systems are clear.',
      category: 'weather',
      priority: 'medium',
    },
    {
      title: 'Market Prices Trending Up',
      description: 'Local market prices for maize have increased by 15% this week. Good time to consider selling if ready.',
      category: 'market',
      priority: 'low',
    },
  ];

  const handleRefreshAdvisory = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const tips = [
    'Water crops early in the morning to reduce evaporation',
    'Rotate crops annually to maintain soil fertility',
    'Keep farm records for better decision making',
    'Use organic fertilizers when possible',
    'Inspect crops regularly for signs of disease',
  ];

  return (
    <ScrollView style={styles.container}>
      <Screen>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Farm Advisory</Text>
          <Text style={styles.headerSubtitle}>
            Personalized recommendations for {profile?.full_name || 'your farm'}
          </Text>
        </View>

        {/* Crop Info Summary */}
        {profile?.crop_types && profile.crop_types.length > 0 && (
          <View style={styles.cropSummary}>
            <Text style={styles.cropSummaryTitle}>Your Crops</Text>
            <View style={styles.cropTags}>
              {profile.crop_types.map(crop => (
                <View key={crop} style={styles.cropTag}>
                  <Text style={styles.cropTagText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Advisory Cards */}
        <View style={styles.advisorySection}>
          <Text style={styles.sectionTitle}>📋 Latest Recommendations</Text>
          {mockAdvisory.map((advisory, index) => (
            <AdvisoryCard key={index} {...advisory} />
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>💡 Daily Tips</Text>
          <View style={styles.tipsCard}>
            {tips.map((tip, index) => (
              <TipItem key={index} tip={tip} icon="✓" />
            ))}
          </View>
        </View>

        {/* Resources Section */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>🔗 Useful Resources</Text>
          <ResourceLink
            title="Crop Calendar"
            description="Seasonal planting & harvesting schedule"
          />
          <ResourceLink
            title="Pest Management"
            description="Identify and control common pests"
          />
          <ResourceLink
            title="Soil Testing"
            description="Learn about soil composition & treatment"
          />
          <ResourceLink
            title="Market Prices"
            description="Real-time commodity prices"
          />
        </View>

        {/* Refresh Button */}
        <PrimaryButton
          label={refreshing ? 'Refreshing...' : 'Refresh Advisory'}
          onPress={handleRefreshAdvisory}
          disabled={refreshing}
          style={styles.refreshButton}
        />

        <View style={styles.spacer} />
      </Screen>
    </ScrollView>
  );
}

interface ResourceLinkProps {
  title: string;
  description: string;
}

function ResourceLink({ title, description }: ResourceLinkProps) {
  return (
    <PrimaryButton
      label={title}
      onPress={() => {}}
      style={styles.resourceButton}
    >
      <View style={styles.resourceContent}>
        <Text style={styles.resourceTitle}>{title}</Text>
        <Text style={styles.resourceDesc}>{description}</Text>
      </View>
    </PrimaryButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  cropSummary: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  cropSummaryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cropTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  cropTag: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
  },
  cropTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  advisorySection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  advisoryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.xs,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  cardDescription: {
    fontSize: 13,
    color: theme.colors.text,
    lineHeight: 18,
  },
  tipsSection: {
    marginBottom: theme.spacing.lg,
  },
  tipsCard: {
    backgroundColor: '#fef3c7',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  tipIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
  },
  tipText: {
    fontSize: 13,
    color: '#92400e',
    flex: 1,
    lineHeight: 18,
  },
  resourcesSection: {
    marginBottom: theme.spacing.lg,
  },
  resourceButton: {
    marginBottom: theme.spacing.md,
  },
  resourceContent: {
    width: '100%',
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  resourceDesc: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  refreshButton: {
    marginBottom: theme.spacing.lg,
  },
  spacer: {
    height: theme.spacing.lg,
  },
});
