import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Settings } from '@poropara/shared';
import HomeScreen from './src/screens/HomeScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import QuizScreen from './src/screens/QuizScreen';

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
        return <QuizScreen settings={settings} goHome={navigateToHome} />;
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
      <PaperProvider>
        <StatusBar style="auto" />
        {renderScreen()}
      </PaperProvider>
    </SafeAreaProvider>
  );
}
