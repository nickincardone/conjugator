import { QuestionType, Quiz, Settings } from '@poropara/shared';
import React, { useState } from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';
import FillInBlankText, { StyleChoice } from '../components/FillInBlankText';

export interface QuizScreenProps {
  settings: Settings;
  goHome: () => void;
}

export default function QuizScreen(props: QuizScreenProps) {
  const [quiz] = useState(() => {
    const newQuiz = new Quiz();
    newQuiz.generateQuiz(props.settings);
    return newQuiz;
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = quiz.questions[currentQuestion];
  const progress = (currentQuestion + 1) / quiz.questions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz finished
        props.goHome();
      }
    }, 2000);
  };

  if (!question) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium">Quiz Complete!</Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={props.goHome}
            >
              Go Home
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          color="#2196f3"
          style={styles.progressBar}
        />
      </View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {selectedAnswer &&
          question.questionType === QuestionType.PorOParaFIB ? (
            <FillInBlankText
              text={question.top1}
              insert={selectedAnswer || ''}
              styleChoice={
                showResult
                  ? selectedAnswer === question.answer
                    ? StyleChoice.CORRECT
                    : StyleChoice.INCORRECT
                  : StyleChoice.NEUTRAL
              }
              style={styles.questionText}
            />
          ) : (
            <RNText style={styles.questionText}>{question.top1}</RNText>
          )}

          {question.translation && (
            <RNText style={styles.translationText}>
              {question.translation}
            </RNText>
          )}

          {question.questionType === QuestionType.PorOParaFIB &&
            question.choices && (
              <View style={styles.answersContainer}>
                {question.choices.map((choice, index) => (
                  <Button
                    key={index}
                    mode={selectedAnswer === choice ? 'contained' : 'outlined'}
                    style={[
                      styles.answerButton,
                      selectedAnswer === choice && styles.selectedButton,
                      showResult &&
                        selectedAnswer === choice &&
                        question.answer === choice &&
                        styles.correctButton,
                      showResult &&
                        selectedAnswer === choice &&
                        question.answer !== choice &&
                        styles.incorrectButton,
                    ]}
                    onPress={() => !showResult && handleAnswerSelect(choice)}
                    disabled={showResult}
                  >
                    {choice.charAt(0).toUpperCase() + choice.slice(1)}
                  </Button>
                ))}
              </View>
            )}

          {question.questionType === QuestionType.DefinitionMC &&
            question.choices && (
              <View style={styles.answersContainer}>
                {question.choices.map((choice, index) => (
                  <Button
                    key={index}
                    mode={selectedAnswer === choice ? 'contained' : 'outlined'}
                    style={[
                      styles.answerButton,
                      selectedAnswer === choice && styles.selectedButton,
                      showResult &&
                        selectedAnswer === choice &&
                        question.answer === choice &&
                        styles.correctButton,
                      showResult &&
                        selectedAnswer === choice &&
                        question.answer !== choice &&
                        styles.incorrectButton,
                    ]}
                    onPress={() => !showResult && handleAnswerSelect(choice)}
                    disabled={showResult}
                  >
                    {choice}
                  </Button>
                ))}
              </View>
            )}

          {showResult && (
            <RNText
              style={[
                styles.resultText,
                selectedAnswer === question.answer
                  ? styles.correctText
                  : styles.incorrectText,
              ]}
            >
              {selectedAnswer === question.answer
                ? 'Correct!'
                : `Incorrect. The answer is: ${question.answer}`}
            </RNText>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3e5fc',
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
    marginTop: 40,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    height: '100%',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  questionText: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
    lineHeight: 32,
    fontSize: 18,
  },
  translationText: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    fontStyle: 'italic',
  },
  answersContainer: {
    width: '100%',
    gap: 16,
  },
  answerButton: {
    marginBottom: 12,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#2196f3',
  },
  correctButton: {
    backgroundColor: '#4caf50',
  },
  incorrectButton: {
    backgroundColor: '#f44336',
  },
  resultText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  correctText: {
    color: '#4caf50',
  },
  incorrectText: {
    color: '#f44336',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
});
