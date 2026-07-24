import React, { useState } from 'react';
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
import { getCategoryByKey } from '@/constants/lessons';
import { getExamByCat } from '@/constants/exams';

export default function ExamScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { cat: catParam } = useLocalSearchParams<{ cat: string }>();
  const { saveExamResult } = useApp();

  const catKey = Array.isArray(catParam) ? catParam[0] : catParam ?? 'html';
  const cat = getCategoryByKey(catKey);
  const exam = getExamByCat(catKey);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom + 16;

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  if (!cat || !exam) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>Exam not found.</Text>
      </View>
    );
  }

  const question = exam.questions[currentQ];
  const progress = (currentQ) / exam.questions.length;

  function selectOption(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    Haptics.selectionAsync();
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];

    if (currentQ < exam.questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      // Calculate results
      const score = newAnswers.filter(
        (ans, i) => ans === exam.questions[i].correctIndex
      ).length;
      const passed = score >= exam.passScore;
      Haptics.notificationAsync(
        passed
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error
      );
      saveExamResult(catKey, {
        passed,
        score,
        total: exam.questions.length,
        date: new Date().toISOString(),
      });
      setAnswers(newAnswers);
      setFinished(true);
    }
  }

  if (finished) {
    const score = answers.filter((ans, i) => ans === exam.questions[i].correctIndex).length;
    const passed = score >= exam.passScore;

    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backPress}>
            <Feather name="arrow-left" size={20} color={colors.foreground} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>{cat.label} Exam</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.resultScroll, { paddingBottom: bottomPad }]}
        >
          {/* Result card */}
          <View
            style={[
              styles.resultCard,
              {
                backgroundColor: passed ? '#16a34a15' : '#ef444415',
                borderColor: passed ? '#16a34a40' : '#ef444440',
              },
            ]}
          >
            <View
              style={[
                styles.resultIcon,
                { backgroundColor: passed ? '#16a34a' : '#ef4444' },
              ]}
            >
              <Feather name={passed ? 'award' : 'x'} size={32} color="#fff" />
            </View>
            <Text style={[styles.resultTitle, { color: passed ? '#16a34a' : '#ef4444' }]}>
              {passed ? 'Congratulations!' : 'Not quite yet'}
            </Text>
            <Text style={[styles.resultScore, { color: colors.foreground }]}>
              {score} / {exam.questions.length} correct
            </Text>
            <Text style={[styles.resultSub, { color: colors.mutedForeground }]}>
              {passed
                ? `You passed! Certificate earned for ${cat.label}.`
                : `Need ${exam.passScore}/${exam.questions.length} to pass. Try again!`}
            </Text>
          </View>

          {/* Answer review */}
          <Text style={[styles.reviewTitle, { color: colors.foreground }]}>Review</Text>
          {exam.questions.map((q, i) => {
            const userAns = answers[i];
            const correct = q.correctIndex;
            const isRight = userAns === correct;
            return (
              <View
                key={q.id}
                style={[
                  styles.reviewCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.reviewTop}>
                  <View
                    style={[
                      styles.reviewDot,
                      { backgroundColor: isRight ? '#16a34a' : '#ef4444' },
                    ]}
                  />
                  <Text style={[styles.reviewQ, { color: colors.foreground }]}>{q.question}</Text>
                </View>
                {!isRight && (
                  <Text style={[styles.reviewAnswer, { color: '#ef4444' }]}>
                    Your answer: {q.options[userAns]}
                  </Text>
                )}
                <Text style={[styles.reviewAnswer, { color: '#16a34a' }]}>
                  {isRight ? 'Correct: ' : 'Right answer: '}{q.options[correct]}
                </Text>
              </View>
            );
          })}

          {/* Actions */}
          <View style={styles.resultActions}>
            <Pressable
              onPress={() => {
                setCurrentQ(0);
                setSelected(null);
                setAnswers([]);
                setFinished(false);
              }}
              style={({ pressed }) => [
                styles.retakeBtn,
                { borderColor: cat.color, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Feather name="refresh-cw" size={16} color={cat.color} />
              <Text style={[styles.retakeBtnText, { color: cat.color }]}>Retake Exam</Text>
            </Pressable>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.doneBtn,
                { backgroundColor: cat.color, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={styles.doneBtnText}>Done</Text>
              <Feather name="check" size={16} color="#fff" />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backPress}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>{cat.label} Exam</Text>
        <Text style={[styles.headerCount, { color: colors.mutedForeground }]}>
          {currentQ + 1}/{exam.questions.length}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: cat.color, width: `${Math.round(progress * 100)}%` },
          ]}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
      >
        {/* Question */}
        <View style={styles.questionSection}>
          <Text style={[styles.qNumber, { color: colors.mutedForeground }]}>
            Question {currentQ + 1}
          </Text>
          <Text style={[styles.qText, { color: colors.foreground }]}>{question.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx;
            return (
              <Pressable
                key={idx}
                onPress={() => selectOption(idx)}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: isSelected ? cat.color + '20' : colors.card,
                    borderColor: isSelected ? cat.color : colors.border,
                    opacity: pressed && selected === null ? 0.8 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.optionDot,
                    {
                      borderColor: isSelected ? cat.color : colors.border,
                      backgroundColor: isSelected ? cat.color : 'transparent',
                    },
                  ]}
                >
                  {isSelected && <View style={styles.optionDotInner} />}
                </View>
                <Text style={[styles.optionText, { color: colors.foreground }]}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Next button */}
        <Pressable
          onPress={handleNext}
          disabled={selected === null}
          style={({ pressed }) => [
            styles.nextBtn,
            {
              backgroundColor: selected !== null ? cat.color : colors.muted,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={[styles.nextBtnText, { color: selected !== null ? '#fff' : colors.mutedForeground }]}>
            {currentQ < exam.questions.length - 1 ? 'Next Question' : 'Finish Exam'}
          </Text>
          <Feather
            name={currentQ < exam.questions.length - 1 ? 'arrow-right' : 'check'}
            size={16}
            color={selected !== null ? '#fff' : colors.mutedForeground}
          />
        </Pressable>
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
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  backPress: { padding: 4 },
  headerTitle: { flex: 1, fontSize: 17, fontFamily: 'Inter_700Bold' },
  headerCount: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  progressTrack: { height: 4, width: '100%' },
  progressFill: { height: 4 },
  scroll: { padding: 20, gap: 20 },
  questionSection: { gap: 8 },
  qNumber: { fontSize: 12, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.5 },
  qText: { fontSize: 20, fontFamily: 'Inter_700Bold', lineHeight: 28 },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 2,
    padding: 14,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  optionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  optionText: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium', lineHeight: 22 },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    padding: 16,
  },
  nextBtnText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  // Result screen
  resultScroll: { padding: 20, gap: 16 },
  resultCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  resultIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: { fontSize: 24, fontFamily: 'Inter_700Bold' },
  resultScore: { fontSize: 32, fontFamily: 'Inter_700Bold' },
  resultSub: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  reviewTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  reviewCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  reviewDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  reviewQ: { flex: 1, fontSize: 14, fontFamily: 'Inter_600SemiBold', lineHeight: 20 },
  reviewAnswer: { fontSize: 13, fontFamily: 'Inter_400Regular', paddingLeft: 16 },
  resultActions: { flexDirection: 'row', gap: 10 },
  retakeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
  },
  retakeBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  doneBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
    padding: 14,
  },
  doneBtnText: { color: '#fff', fontSize: 14, fontFamily: 'Inter_700Bold' },
});
