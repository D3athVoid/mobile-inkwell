import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, TOTAL_LESSONS } from '@/constants/lessons';
import { EXAMS } from '@/constants/exams';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedLessons, examResults, displayName, setDisplayName, resetProgress } = useApp();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(displayName);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 80;

  const passedExams = Object.values(examResults).filter((r) => r.passed).length;
  const initial = displayName.charAt(0).toUpperCase();

  function saveName() {
    const trimmed = nameInput.trim();
    if (trimmed) setDisplayName(trimmed);
    setEditing(false);
  }

  function handleReset() {
    Alert.alert('Reset Progress', 'This will clear all completed lessons and exam results. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          resetProgress();
        },
      },
    ]);
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          {editing ? (
            <View style={styles.nameEdit}>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                style={[styles.nameInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
                onSubmitEditing={saveName}
                autoFocus
                returnKeyType="done"
              />
              <Pressable onPress={saveName} style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
                <Feather name="check" size={16} color="#fff" />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={() => { setNameInput(displayName); setEditing(true); }} style={styles.nameRow}>
              <Text style={[styles.name, { color: colors.foreground }]}>{displayName}</Text>
              <Feather name="edit-2" size={14} color={colors.mutedForeground} />
            </Pressable>
          )}
          <Text style={[styles.role, { color: colors.mutedForeground }]}>Inkwell Student</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{completedLessons.length}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Lessons</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{passedExams}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Exams Passed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{passedExams}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Certificates</Text>
          </View>
        </View>

        {/* Course progress */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Course progress</Text>
        <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {CATEGORIES.map((cat, i) => {
            const done = cat.lessons.filter((l) =>
              completedLessons.includes(`${cat.key}/${l.slug}`)
            ).length;
            const pct = cat.lessons.length > 0 ? done / cat.lessons.length : 0;
            const result = examResults[cat.key];
            return (
              <View
                key={cat.key}
                style={[
                  styles.progressRow,
                  i < CATEGORIES.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
              >
                <View style={styles.progressLeft}>
                  <View style={[styles.progDot, { backgroundColor: cat.color }]} />
                  <Text style={[styles.progLabel, { color: colors.foreground }]}>{cat.label}</Text>
                </View>
                <View style={styles.progressRight}>
                  <Text style={[styles.progCount, { color: colors.mutedForeground }]}>
                    {done}/{cat.lessons.length}
                  </Text>
                  <View style={[styles.progTrack, { backgroundColor: colors.border }]}>
                    <View
                      style={[
                        styles.progFill,
                        { backgroundColor: cat.color, width: `${Math.round(pct * 100)}%` },
                      ]}
                    />
                  </View>
                  {result?.passed && (
                    <Feather name="award" size={14} color="#16a34a" />
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Reset */}
        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [
            styles.resetBtn,
            { borderColor: colors.destructive, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Feather name="trash-2" size={16} color={colors.destructive} />
          <Text style={[styles.resetText, { color: colors.destructive }]}>Reset all progress</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  scroll: { padding: 16, gap: 16 },
  avatarSection: { alignItems: 'center', gap: 8 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 28, color: '#fff', fontFamily: 'Inter_700Bold' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  nameEdit: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nameInput: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  saveBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  role: { fontSize: 13, fontFamily: 'Inter_400Regular' },
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
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  progressCard: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  progressLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progDot: { width: 8, height: 8, borderRadius: 4 },
  progLabel: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  progressRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progCount: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  progTrack: { width: 60, height: 4, borderRadius: 2, overflow: 'hidden' },
  progFill: { height: 4, borderRadius: 2 },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  resetText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});
