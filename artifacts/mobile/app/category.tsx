import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { getCategoryByKey } from '@/constants/lessons';
import { LessonRow } from '@/components/LessonRow';

export default function CategoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { cat: catParam } = useLocalSearchParams<{ cat: string }>();
  const { isLessonComplete } = useApp();

  const catKey = Array.isArray(catParam) ? catParam[0] : catParam ?? 'html';
  const cat = getCategoryByKey(catKey);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 16;

  if (!cat) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>Course not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Custom header */}
      <View style={[styles.header, { paddingTop: topPad + 12, backgroundColor: cat.color }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </Pressable>
        <View style={styles.headerBody}>
          <Text style={styles.headerLabel}>{cat.label}</Text>
          <Text style={styles.headerTagline}>{cat.tagline}</Text>
        </View>
        <View style={styles.lessonBadge}>
          <Text style={styles.lessonBadgeText}>{cat.lessons.length} lessons</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
      >
        {/* Lessons list */}
        <View
          style={[
            styles.lessonsCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Lessons</Text>
          {cat.lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.slug}
              title={lesson.title}
              summary={lesson.summary}
              isComplete={isLessonComplete(catKey, lesson.slug)}
              isLast={i === cat.lessons.length - 1}
              onPress={() =>
                router.push({
                  pathname: '/lesson',
                  params: { cat: catKey, slug: lesson.slug },
                })
              }
            />
          ))}
        </View>

        {/* Exam CTA */}
        <Pressable
          onPress={() => router.push({ pathname: '/exam', params: { cat: catKey } })}
          style={({ pressed }) => [
            styles.examBtn,
            { backgroundColor: cat.color, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Feather name="award" size={18} color="#fff" />
          <Text style={styles.examBtnText}>Take {cat.label} Certification Exam</Text>
          <Feather name="arrow-right" size={16} color="#fff" />
        </Pressable>

        {/* Filename hint for reference languages */}
        {!cat.runnable && cat.filename && (
          <View
            style={[
              styles.hintCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Feather name="info" size={14} color={colors.mutedForeground} />
            <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
              Code is reference-only. Save as{' '}
              <Text style={{ fontFamily: 'Inter_600SemiBold' }}>{cat.filename}</Text> and run it
              locally.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  errorText: { textAlign: 'center', marginTop: 80, fontSize: 16, fontFamily: 'Inter_400Regular' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBody: { flex: 1 },
  headerLabel: { fontSize: 22, color: '#fff', fontFamily: 'Inter_700Bold' },
  headerTagline: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter_400Regular' },
  lessonBadge: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lessonBadgeText: { color: '#fff', fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  scroll: { padding: 16, gap: 12 },
  lessonsCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  examBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    padding: 16,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  examBtnText: { color: '#fff', fontSize: 15, fontFamily: 'Inter_700Bold', flex: 1 },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  hintText: { flex: 1, fontSize: 13, fontFamily: 'Inter_400Regular', lineHeight: 18 },
});
