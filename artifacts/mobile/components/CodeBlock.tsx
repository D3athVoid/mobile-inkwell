import React from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.code} selectable>
        {code}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d1117',
    borderRadius: 10,
  },
  content: {
    padding: 16,
  },
  code: {
    fontFamily: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'Courier New' }),
    fontSize: 13,
    color: '#e6edf3',
    lineHeight: 20,
  },
});
