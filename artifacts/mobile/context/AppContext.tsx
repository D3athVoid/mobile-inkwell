import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface ExamResult {
  passed: boolean;
  score: number;
  total: number;
  date: string;
}

interface AppState {
  completedLessons: string[];
  examResults: Record<string, ExamResult>;
  lastLesson: { cat: string; slug: string } | null;
  displayName: string;
  isLoaded: boolean;
}

interface AppContextValue extends AppState {
  completeLesson: (cat: string, slug: string) => void;
  uncompleteLesson: (cat: string, slug: string) => void;
  isLessonComplete: (cat: string, slug: string) => boolean;
  saveExamResult: (catKey: string, result: ExamResult) => void;
  setLastLesson: (cat: string, slug: string) => void;
  setDisplayName: (name: string) => void;
  resetProgress: () => void;
  getCategoryProgress: (catKey: string, totalLessons: number) => number;
}

const STORAGE_KEY = 'inkwell_progress_v1';

const defaultState: AppState = {
  completedLessons: [],
  examResults: {},
  lastLesson: null,
  displayName: 'Coder',
  isLoaded: false,
};

const AppContext = createContext<AppContextValue>({
  ...defaultState,
  completeLesson: () => {},
  uncompleteLesson: () => {},
  isLessonComplete: () => false,
  saveExamResult: () => {},
  setLastLesson: () => {},
  setDisplayName: () => {},
  resetProgress: () => {},
  getCategoryProgress: () => 0,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw);
          setState({ ...defaultState, ...saved, isLoaded: true });
        } else {
          setState((s) => ({ ...s, isLoaded: true }));
        }
      })
      .catch(() => setState((s) => ({ ...s, isLoaded: true })));
  }, []);

  const persist = useCallback((next: AppState) => {
    const { isLoaded, ...toSave } = next;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave)).catch(() => {});
  }, []);

  const completeLesson = useCallback(
    (cat: string, slug: string) => {
      const key = `${cat}/${slug}`;
      setState((prev) => {
        if (prev.completedLessons.includes(key)) return prev;
        const next = {
          ...prev,
          completedLessons: [...prev.completedLessons, key],
          lastLesson: { cat, slug },
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const uncompleteLesson = useCallback(
    (cat: string, slug: string) => {
      const key = `${cat}/${slug}`;
      setState((prev) => {
        const next = {
          ...prev,
          completedLessons: prev.completedLessons.filter((k) => k !== key),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const isLessonComplete = useCallback(
    (cat: string, slug: string) => state.completedLessons.includes(`${cat}/${slug}`),
    [state.completedLessons]
  );

  const saveExamResult = useCallback(
    (catKey: string, result: ExamResult) => {
      setState((prev) => {
        const next = {
          ...prev,
          examResults: { ...prev.examResults, [catKey]: result },
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setLastLesson = useCallback(
    (cat: string, slug: string) => {
      setState((prev) => {
        const next = { ...prev, lastLesson: { cat, slug } };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setDisplayName = useCallback(
    (name: string) => {
      setState((prev) => {
        const next = { ...prev, displayName: name };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetProgress = useCallback(() => {
    const next = { ...defaultState, isLoaded: true };
    setState(next);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  const getCategoryProgress = useCallback(
    (catKey: string, totalLessons: number) => {
      if (totalLessons === 0) return 0;
      const done = state.completedLessons.filter((k) => k.startsWith(`${catKey}/`)).length;
      return done / totalLessons;
    },
    [state.completedLessons]
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        completeLesson,
        uncompleteLesson,
        isLessonComplete,
        saveExamResult,
        setLastLesson,
        setDisplayName,
        resetProgress,
        getCategoryProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
