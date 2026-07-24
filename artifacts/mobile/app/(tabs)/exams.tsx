import React from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/constants/lessons';
import { EXAMS } from '@/constants/exams';

export default function ExamsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { examResults } = useApp();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 80;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Certification Exams</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>
          Pass 3/5 questions to earn a certificate
        </Text>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.key}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: cat }) => {
          const exam = EXAMS.find((e) => e.catKey === cat.key);
          const result = examResults[cat.key];
          return (
            <Pressable
              onPress={() => router.push({ pathname: '/exam', params: { cat: cat.key } })}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View style={[styles.colorBar, { backgroundColor: cat.color }]} />
              <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                  <View style={styles.catInfo}>
                    <View style={[styles.dot, { backgroundColor: cat.color }]} />
                    <Text style={[styles.catLabel, { color: colors.foreground }]}>{cat.label}</Text>
                  </View>
                  {result ? (
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: result.passed ? '#16a34a20' : '#ef444420' },
                      ]}
                    >
                      <Feather
                        name={result.passed ? 'award' : 'x-circle'}
                        size={12}
                        color={result.passed ? '#16a34a' : '#ef4444'}
                      />
                      <Text
                        style={[
                          styles.badgeText,
                          { color: result.passed ? '#16a34a' : '#ef4444' },
                        ]}
                      >
                        {result.passed ? 'Passed' : 'Failed'} {result.score}/{result.total}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.badge, { backgroundColor: colors.muted }]}>
                      <Text style={[styles.badgeText, { color: colors.mutedForeground }]}>
                        Not taken
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.examTitle, { color: colors.mutedForeground }]}>
                  {exam?.questions.length ?? 5} questions · Pass {exam?.passScore ?? 3}/{exam?.questions.length ?? 5}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={[styles.takeText, { color: cat.color }]}>
                    {result ? 'Retake exam' : 'Take exam'}
                  </Text>
                  <Feather name="arrow-right" size={14} color={cat.color} />
                </View>
              </View>
            </Pressable>
          );
        }}
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
  list: { padding: 16, gap: 12 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  colorBar: { height: 4 },
  cardBody: { padding: 14, gap: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  catLabel: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  examTitle: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  takeText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});
