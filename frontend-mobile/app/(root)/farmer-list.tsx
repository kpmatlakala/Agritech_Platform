import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import FarmerCard from '@/components/FarmerCard';
import { colors, globalStyles } from '@/styles/global';
import { useFarmerStore } from '@/store/useFarmerStore';

export default function FarmerListScreen() {
  const [query, setQuery] = useState('');
  const farmers = useFarmerStore((state) => state.farmers);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return farmers;
    }

    const normalized = query.toLowerCase();
    return farmers.filter((farmer) => {
      return (
        farmer.fullName.toLowerCase().includes(normalized) ||
        farmer.farmerId.toLowerCase().includes(normalized) ||
        farmer.village.toLowerCase().includes(normalized) ||
        farmer.phoneNumber.includes(normalized)
      );
    });
  }, [farmers, query]);

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Farmer List</Text>
      </View>
      <Text style={globalStyles.subtitle}>Search by name, ID, village, or phone number</Text>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search farmers"
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.count}>{filtered.length} farmer records</Text>

      {filtered.length === 0 ? (
        <Text style={globalStyles.empty}>No matches for your search yet.</Text>
      ) : (
        filtered.map((farmer) => <FarmerCard key={farmer.id} farmer={farmer} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    marginTop: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    paddingVertical: 11,
    fontSize: 15,
  },
  count: {
    marginTop: 6,
    marginBottom: 12,
    color: colors.textSecondary,
    fontSize: 12,
  },
});
