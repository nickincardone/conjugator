import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Settings } from '@poropara/shared';
import HomeScreen from './src/screens/HomeScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import QuizScreen from './src/screens/QuizScreen';

// Create theme with Helvetica font
const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    default: {
      ...MD3LightTheme.fonts.default,
      fontFamily: 'Helvetica',
    },
    displayLarge: {
      ...MD3LightTheme.fonts.displayLarge,
      fontFamily: 'Helvetica',
    },
    displayMedium: {
      ...MD3LightTheme.fonts.displayMedium,
      fontFamily: 'Helvetica',
    },
    displaySmall: {
      ...MD3LightTheme.fonts.displaySmall,
      fontFamily: 'Helvetica',
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: 'Helvetica',
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontFamily: 'Helvetica',
    },
    headlineSmall: {
      ...MD3LightTheme.fonts.headlineSmall,
      fontFamily: 'Helvetica',
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: 'Helvetica',
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: 'Helvetica',
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontFamily: 'Helvetica',
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: 'Helvetica',
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: 'Helvetica',
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: 'Helvetica',
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: 'Helvetica',
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: 'Helvetica',
    },
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontFamily: 'Helvetica',
    },
  },
};

type Screen = 'home' | 'options' | 'quiz' | 'results';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [settings, setSettings] = useState<Settings>(new Settings());
  const [quizStarted, setQuizStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Always true for mobile

  const navigateToHome = () => setCurrentScreen('home');
  const navigateToOptions = () => setCurrentScreen('options');
  const navigateToQuiz = () => setCurrentScreen('quiz');
  const navigateToResults = () => setCurrentScreen('results');

  const startQuiz = (mobile: boolean) => {
    setIsMobile(mobile);
    setQuizStarted(true);
    navigateToQuiz();
  };

  const goToOptions = (mobile: boolean) => {
    setIsMobile(mobile);
    navigateToOptions();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            started={quizStarted}
            numberOfQuestions={settings.numberOfQuestions}
            incorrectAnswers={0}
            start={startQuiz}
            goToOptions={goToOptions}
            goToResults={navigateToResults}
          />
        );
      case 'options':
        return (
          <OptionsScreen
            settings={settings}
            setSettings={setSettings}
            start={startQuiz}
            goBack={navigateToHome}
          />
        );
      case 'quiz':
        return <QuizScreen settings={settings} goHome={navigateToHome} goToSettings={navigateToOptions} />;
      default:
        return (
          <HomeScreen
            started={quizStarted}
            numberOfQuestions={settings.numberOfQuestions}
            incorrectAnswers={0}
            start={startQuiz}
            goToOptions={goToOptions}
            goToResults={navigateToResults}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        {renderScreen()}
      </PaperProvider>
    </SafeAreaProvider>
  );
}
