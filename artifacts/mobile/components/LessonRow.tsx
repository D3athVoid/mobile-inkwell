import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

interface LessonRowProps {
  title: string;
  summary: string;
  isComplete: boolean;
  isLast?: boolean;
  onPress: () => void;
}

export function LessonRow({ title, summary, isComplete, isLast = false, onPress }: LessonRowProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          borderBottomColor: colors.border,
          borderBottomWidth: isLast ? 0 : 1,
          backgroundColor: pressed ? colors.muted : 'transparent',
        },
      ]}
    >
      <View
        style={[
          styles.check,
          {
            backgroundColor: isComplete ? colors.primary : 'transparent',
            borderColor: isComplete ? colors.primary : colors.border,
          },
        ]}
      >
        {isComplete && <Feather name="check" size={12} color="#fff" />}
      </View>
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.summary, { color: colors.mutedForeground }]} numberOfLines={1}>
          {summary}
        </Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  summary: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
});
