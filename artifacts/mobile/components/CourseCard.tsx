import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface CourseCardProps {
  label: string;
  color: string;
  tagline: string;
  lessonCount: number;
  completedCount: number;
  onPress: () => void;
}

export function CourseCard({
  label,
  color,
  tagline,
  lessonCount,
  completedCount,
  onPress,
}: CourseCardProps) {
  const colors = useColors();
  const progress = lessonCount > 0 ? completedCount / lessonCount : 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
    >
      <View style={[styles.colorBar, { backgroundColor: color }]} />
      <View style={styles.body}>
        <View style={styles.labelRow}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
        </View>
        <Text style={[styles.tagline, { color: colors.mutedForeground }]} numberOfLines={1}>
          {tagline}
        </Text>
        <View style={styles.footer}>
          <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
            <View
              style={[styles.progressFill, { backgroundColor: color, width: `${Math.round(progress * 100)}%` }]}
            />
          </View>
          <Text style={[styles.count, { color: colors.mutedForeground }]}>
            {completedCount}/{lessonCount}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    flex: 1,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  colorBar: {
    height: 4,
    width: '100%',
  },
  body: {
    padding: 14,
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  tagline: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  count: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
});
