import React, { useEffect } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { getCategoryByKey, getLessonBySlug, getLessonNeighbors } from '@/constants/lessons';
import { CodeBlock } from '@/components/CodeBlock';

export default function LessonScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { cat: catParam, slug: slugParam } = useLocalSearchParams<{ cat: string; slug: string }>();
  const { isLessonComplete, completeLesson, uncompleteLesson, setLastLesson } = useApp();

  const catKey = Array.isArray(catParam) ? catParam[0] : catParam ?? 'html';
  const slugKey = Array.isArray(slugParam) ? slugParam[0] : slugParam ?? 'intro';

  const cat = getCategoryByKey(catKey);
  const lesson = getLessonBySlug(catKey, slugKey);
  const { prev, next } = getLessonNeighbors(catKey, slugKey);
  const complete = !!lesson && isLessonComplete(catKey, slugKey);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 16;

  useEffect(() => {
    if (catKey && slugKey) setLastLesson(catKey, slugKey);
  }, [catKey, slugKey]);

  function toggleComplete() {
    if (!lesson) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (complete) {
      uncompleteLesson(catKey, slugKey);
    } else {
      completeLesson(catKey, slugKey);
    }
  }

  const lessonIndex = cat?.lessons.findIndex((l) => l.slug === slugKey) ?? 0;
  const totalLessons = cat?.lessons.length ?? 1;

  const starterCode = lesson?.code ?? (
    lesson?.html != null
      ? [
          lesson.html && `// HTML:\n${lesson.html}`,
          lesson.css && `\n// CSS:\n${lesson.css}`,
          lesson.js && `\n// JavaScript:\n${lesson.js}`,
        ]
          .filter(Boolean)
          .join('')
      : ''
  );

  if (!cat || !lesson) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { marginTop: topPad + 12 }]}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>Lesson not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, borderBottomColor: colors.border },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backPress}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <View style={[styles.langBadge, { backgroundColor: cat.color + '22' }]}>
          <View style={[styles.langDot, { backgroundColor: cat.color }]} />
          <Text style={[styles.langText, { color: cat.color }]}>{cat.label}</Text>
        </View>
        <Text style={[styles.progress, { color: colors.mutedForeground }]}>
          {lessonIndex + 1}/{totalLessons}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
      >
        {/* Lesson header */}
        <View style={styles.lessonHeader}>
          <Text style={[styles.lessonTitle, { color: colors.foreground }]}>{lesson.title}</Text>
          <Text style={[styles.lessonSummary, { color: colors.mutedForeground }]}>
            {lesson.summary}
          </Text>
        </View>

        {/* Body */}
        <View style={[styles.bodyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {lesson.body.split('\n\n').map((para, i) => (
            <Text key={i} style={[styles.bodyText, { color: colors.foreground }]}>
              {para.trim()}
            </Text>
          ))}
        </View>

        {/* Code block */}
        {starterCode ? (
          <View>
            <Text style={[styles.codeLabel, { color: colors.mutedForeground }]}>
              {cat.runnable ? 'Starter code' : cat.filename ?? 'Code example'}
            </Text>
            <CodeBlock code={starterCode} />
          </View>
        ) : null}

        {/* Navigation */}
        <View style={styles.navRow}>
          <Pressable
            onPress={() =>
              prev
                ? router.replace({
                    pathname: '/lesson',
                    params: { cat: catKey, slug: prev.slug },
                  })
                : router.back()
            }
            style={({ pressed }) => [
              styles.navBtn,
              { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Feather name="arrow-left" size={16} color={colors.foreground} />
            <Text style={[styles.navBtnText, { color: colors.foreground }]}>
              {prev ? 'Previous' : 'Back'}
            </Text>
          </Pressable>

          <Pressable
            onPress={toggleComplete}
            style={({ pressed }) => [
              styles.completeBtn,
              {
                backgroundColor: complete ? colors.card : cat.color,
                borderColor: complete ? cat.color : cat.color,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Feather
              name={complete ? 'check-circle' : 'circle'}
              size={16}
              color={complete ? cat.color : '#fff'}
            />
            <Text
              style={[styles.completeBtnText, { color: complete ? cat.color : '#fff' }]}
            >
              {complete ? 'Done' : 'Mark done'}
            </Text>
          </Pressable>
        </View>

        {next && (
          <Pressable
            onPress={() =>
              router.replace({ pathname: '/lesson', params: { cat: catKey, slug: next.slug } })
            }
            style={({ pressed }) => [
              styles.nextBtn,
              { backgroundColor: cat.color, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.nextBtnText}>Next: {next.title}</Text>
            <Feather name="arrow-right" size={16} color="#fff" />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  backPress: { padding: 4 },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flex: 1,
  },
  langDot: { width: 7, height: 7, borderRadius: 4 },
  langText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  progress: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  scroll: { padding: 16, gap: 16 },
  lessonHeader: { gap: 6 },
  lessonTitle: { fontSize: 24, fontFamily: 'Inter_700Bold', lineHeight: 30 },
  lessonSummary: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 22 },
  bodyCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  bodyText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
  codeLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  navRow: { flexDirection: 'row', gap: 10 },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  navBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  completeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 12,
  },
  completeBtnText: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    padding: 16,
  },
  nextBtnText: { color: '#fff', fontSize: 15, fontFamily: 'Inter_700Bold' },
  backBtn: { marginLeft: 16 },
  errorText: { textAlign: 'center', marginTop: 40, fontSize: 16, fontFamily: 'Inter_400Regular' },
});
