import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

export interface HomeScreenProps {
  incorrectAnswers: number;
  numberOfQuestions: number;
  started: boolean;
  start: (b: boolean) => void;
  goToOptions: (b: boolean) => void;
  goToResults: () => void;
}

export default function HomeScreen(props: HomeScreenProps) {
  const postQuizText = () => {
    const correctPercentage: number =
      Math.round(
        (10000 * (props.numberOfQuestions - props.incorrectAnswers)) /
          props.numberOfQuestions
      ) / 100;
    if (correctPercentage === 100) {
      return 'Perfect Score! Maybe try something harder with a Custom Quiz';
    } else if (correctPercentage > 79) {
      return `${correctPercentage}% correct. Great Job!`;
    } else {
      return `${correctPercentage}% correct. Try Again.`;
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="headlineMedium" style={styles.welcomeText}>
            {props.started ? postQuizText() : 'Hello, welcome to Conjugator'}
          </Text>

          {props.started && props.incorrectAnswers !== 0 && (
            <Button
              mode="contained"
              style={[styles.button, styles.resultsButton]}
              onPress={() => props.goToResults()}
            >
              Results
            </Button>
          )}

          <Button
            mode="contained"
            style={[styles.button, styles.startButton]}
            onPress={() => props.start(true)}
          >
            START
          </Button>

          <Button
            mode="contained"
            style={[styles.button, styles.customButton]}
            buttonColor="#9c27b0"
            onPress={() => props.goToOptions(true)}
          >
            CUSTOM QUIZ
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3e5fc', // Light blue background like in screenshots
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    padding: 30,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#2196f3', // Blue color like in screenshot
  },
  customButton: {
    backgroundColor: '#9c27b0', // Purple color like in screenshot
  },
  resultsButton: {
    backgroundColor: '#ff9800', // Orange for results
  },
});
