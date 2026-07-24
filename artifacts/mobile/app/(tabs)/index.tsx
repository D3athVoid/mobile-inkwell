import React from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, TOTAL_LESSONS, getCategoryByKey } from '@/constants/lessons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedLessons, lastLesson, getCategoryProgress } = useApp();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 80;

  const continueLabel = (() => {
    if (!lastLesson) return 'Start: HTML — Your First Element';
    const cat = getCategoryByKey(lastLesson.cat);
    const lesson = cat?.lessons.find((l) => l.slug === lastLesson.slug);
    return `Continue: ${cat?.label} — ${lesson?.title ?? ''}`;
  })();

  const continueRoute = lastLesson
    ? { pathname: '/lesson' as const, params: { cat: lastLesson.cat, slug: lastLesson.slug } }
    : { pathname: '/lesson' as const, params: { cat: 'html', slug: 'intro' } };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
        <View style={styles.logoRow}>
          <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
            <Feather name="edit-3" size={16} color="#fff" />
          </View>
          <Text style={[styles.logoText, { color: colors.foreground }]}>Inkwell</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
      >
        {/* Hero card */}
        <LinearGradient
          colors={['#c9622b', '#a8451b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.heroTitle}>
            {completedLessons.length} of {TOTAL_LESSONS} lessons complete
          </Text>
          <Pressable
            onPress={() => router.push(continueRoute)}
            style={({ pressed }) => [styles.continueBtn, { opacity: pressed ? 0.8 : 1 }]}
          >
            <Feather name="play" size={14} color="#c9622b" />
            <Text style={styles.continueBtnText} numberOfLines={1}>
              {continueLabel}
            </Text>
            <Feather name="arrow-right" size={14} color="#c9622b" />
          </Pressable>
        </LinearGradient>

        {/* Progress overview */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{completedLessons.length}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Lessons done</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{CATEGORIES.length}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Languages</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{TOTAL_LESSONS}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Total lessons</Text>
          </View>
        </View>

        {/* Courses */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your courses</Text>
        {CATEGORIES.map((cat) => {
          const done = cat.lessons.filter(
            (l) => completedLessons.includes(`${cat.key}/${l.slug}`)
          ).length;
          const progress = cat.lessons.length > 0 ? done / cat.lessons.length : 0;
          return (
            <Pressable
              key={cat.key}
              onPress={() => router.push({ pathname: '/category', params: { cat: cat.key } })}
              style={({ pressed }) => [
                styles.courseRow,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View style={[styles.courseDot, { backgroundColor: cat.color }]} />
              <View style={styles.courseInfo}>
                <Text style={[styles.courseLabel, { color: colors.foreground }]}>{cat.label}</Text>
                <Text style={[styles.courseTagline, { color: colors.mutedForeground }]}>
                  {cat.tagline}
                </Text>
              </View>
              <View style={styles.courseRight}>
                <Text style={[styles.courseCount, { color: colors.mutedForeground }]}>
                  {done}/{cat.lessons.length}
                </Text>
                <View style={[styles.miniTrack, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.miniFill,
                      { backgroundColor: cat.color, width: `${Math.round(progress * 100)}%` },
                    ]}
                  />
                </View>
              </View>
              <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  scroll: { padding: 16, gap: 12 },
  heroCard: {
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter_500Medium' },
  heroTitle: { fontSize: 20, color: '#fff', fontFamily: 'Inter_700Bold' },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  continueBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#c9622b',
    flexShrink: 1,
    maxWidth: 220,
  },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    gap: 2,
  },
  statNum: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginTop: 4 },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 12,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  courseDot: { width: 10, height: 10, borderRadius: 5 },
  courseInfo: { flex: 1 },
  courseLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  courseTagline: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  courseRight: { alignItems: 'flex-end', gap: 4 },
  courseCount: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  miniTrack: { width: 50, height: 4, borderRadius: 2, overflow: 'hidden' },
  miniFill: { height: 4, borderRadius: 2 },
});
