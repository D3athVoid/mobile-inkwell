import React, { useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/constants/lessons';
import { CourseCard } from '@/components/CourseCard';

export default function LearnScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedLessons } = useApp();
  const [query, setQuery] = useState('');

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 80;

  const filtered = CATEGORIES.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: typeof CATEGORIES[0]; index: number }) => {
    const done = item.lessons.filter((l) =>
      completedLessons.includes(`${item.key}/${l.slug}`)
    ).length;
    const isLeft = index % 2 === 0;
    return (
      <View style={[styles.cardWrap, isLeft ? styles.cardLeft : styles.cardRight]}>
        <CourseCard
          label={item.label}
          color={item.color}
          tagline={item.tagline}
          lessonCount={item.lessons.length}
          completedCount={done}
          onPress={() => router.push({ pathname: '/category', params: { cat: item.key } })}
        />
      </View>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>All Courses</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          {CATEGORIES.length} languages · 27 lessons
        </Text>
        <View
          style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages…"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground }]}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.key}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={[styles.grid, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="search" size={32} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No courses match "{query}"
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 4,
  },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  sub: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginTop: 8,
  },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  grid: { padding: 12, gap: 10 },
  cardWrap: { flex: 1 },
  cardLeft: { paddingRight: 5 },
  cardRight: { paddingLeft: 5 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 80 },
  emptyText: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});
