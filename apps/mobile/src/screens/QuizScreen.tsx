import { QuestionType, Quiz, Settings } from '@poropara/shared';
import React, { useState } from 'react';
import { StyleSheet, View, Text as RNText, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, ProgressBar, Text } from 'react-native-paper';
import FillInBlankText, { StyleChoice } from '../components/FillInBlankText';
import { AppColors, AppStyles } from '@poropara/shared';
import DottedUnderlineText from '../components/DottedUnderlineText';
import { DEFAULT_FONT_FAMILY } from '../styles/globalStyles';

export interface QuizScreenProps {
  settings: Settings;
  goHome: () => void;
  goToSettings?: () => void;
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
  const [showTranslation, setShowTranslation] = useState(false);

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
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={props.goHome} style={styles.topBarButton}>
          <RNText style={styles.topBarIcon}>✕</RNText>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={props.goToSettings} 
          style={styles.topBarButton}
          disabled={!props.goToSettings}
        >
          <RNText style={[styles.topBarIcon, !props.goToSettings && styles.disabledIcon]}>⚙</RNText>
        </TouchableOpacity>
      </View>
      
      <Card style={styles.card}>
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            color={AppColors.progressBar}
            style={styles.progressBar}
          />
        </View>
        <Card.Content style={styles.cardContent}>
          <View >
            <TouchableOpacity 
              onPress={() => question.translation && setShowTranslation(true)}
              disabled={!question.translation}
            >
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
                <DottedUnderlineText isCentered dotColor={AppColors.dottedUnderline} style={{ fontSize: 32, lineHeight: 38 }} lineHeight={38}>
                  {question.top1}
                </DottedUnderlineText>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ height: 16 }} />

          {(question.questionType === QuestionType.PorOParaFIB || 
            question.questionType === QuestionType.DefinitionMC) &&
            question.choices && (
              <View style={styles.answersContainer}>
                {/* Group choices into pairs of 2 */}
                {Array.from({ length: Math.ceil(question.choices.length / 2) }, (_, rowIndex) => (
                  <View key={rowIndex} style={styles.buttonRow}>
                    {question.choices.slice(rowIndex * 2, rowIndex * 2 + 2).map((choice, index) => (
                      <Button
                        labelStyle={styles.answerButtonLabel}
                        key={rowIndex * 2 + index}
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
                        {question.questionType === QuestionType.PorOParaFIB 
                          ? choice.charAt(0).toUpperCase() + choice.slice(1)
                          : choice
                        }
                      </Button>
                    ))}
                  </View>
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
      
      {/* Translation Modal */}
      <Modal
        visible={showTranslation}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTranslation(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowTranslation(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <RNText style={styles.modalTranslationText}>
                  {question.translation}
                </RNText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.mainBackground,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 4,
    boxShadow: AppStyles.progressBar.boxShadow,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    height: '100%',
    marginTop: 50,
    marginBottom: 20,
    padding: 20,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 8,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 32,
    fontFamily: DEFAULT_FONT_FAMILY,
  },
  translationText: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    fontStyle: 'italic',
  },
  answersContainer: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  answerButton: {
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 0,
    flex: 1,
    color: 'black',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  answerButtonLabel: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
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
    fontFamily: DEFAULT_FONT_FAMILY,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTranslationText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: DEFAULT_FONT_FAMILY,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: -60
  },
  topBarButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarIcon: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    fontFamily: DEFAULT_FONT_FAMILY,
  },
  disabledIcon: {
    color: '#ccc',
  },
});
