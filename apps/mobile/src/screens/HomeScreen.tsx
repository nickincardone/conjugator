import { AppColors, AppStyles } from '@poropara/shared';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SEN_FONT_FAMILY } from '../styles/globalStyles';

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
          <Text style={styles.welcomeText}>
            {props.started ? postQuizText() : 'Hello, welcome to Conjugator'}
          </Text>

          {props.started && props.incorrectAnswers !== 0 && (
            <Button
              mode="contained"
              style={[styles.button, styles.resultsButton]}
              onPress={() => props.goToResults()}
              labelStyle={styles.buttonText}
            >
              Results
            </Button>
          )}

          <Button
            mode="contained"
            style={[styles.button, styles.startButton]}
            onPress={() => props.start(true)}
            labelStyle={styles.buttonText}
          >
            START
          </Button>

          <Button
            mode="contained"
            style={[styles.button, styles.customButton]}
            onPress={() => props.goToOptions(true)}
            labelStyle={styles.buttonText}
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
    backgroundColor: AppColors.mainBackground,
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
    fontWeight: '400',
    fontSize: 16,
    marginVertical: 40,
    fontFamily: SEN_FONT_FAMILY,
  },
  button: {
    marginBottom: 16,
    borderRadius: 8,
    fontWeight: '800',
    boxShadow: AppStyles.regularButton.boxShadow,
  },
  buttonText: {
    fontWeight: '400',
  },
  startButton: {
    backgroundColor: AppColors.startButton,
  },
  customButton: {
    backgroundColor: AppColors.customStartButton,
  },
  resultsButton: {
    backgroundColor: AppColors.resultsButton,
  },
});
