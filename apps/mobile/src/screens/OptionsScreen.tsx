import { AppColors, Settings, verbTypeNicknames, verbTypes } from '@poropara/shared';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Button, Card, Divider, IconButton, List, Text } from 'react-native-paper';
import { SEN_FONT_FAMILY } from '../styles/globalStyles';

export interface OptionsScreenProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  start: (mobile: boolean) => void;
  goBack: () => void;
}

type OptionsSection = 'main' | 'questionTypes' | 'verbTenses' | 'advanced' | 'numberOfQuestions';

const MAIN_MENU_ITEMS = [
  {
    id: 'questionTypes' as OptionsSection,
    title: 'Question Types',
    icon: 'help-circle',
  },
  {
    id: 'verbTenses' as OptionsSection,
    title: 'Verb Tenses',
    icon: 'book-open',
  },
  {
    id: 'advanced' as OptionsSection,
    title: 'Other',
    icon: 'cog',
  },
  {
    id: 'numberOfQuestions' as OptionsSection,
    title: 'Number of Questions',
    icon: 'format-list-numbered',
  },
];

const SECTION_CONFIG = {
  main: { title: 'Options' },
  questionTypes: { title: 'Question Types' },
  verbTenses: { title: 'Verb Tenses' },
  advanced: { title: 'Advanced' },
  numberOfQuestions: { title: 'Number of Questions' },
};

type BooleanSettingKey = 'poropara' | 'definitionMC' | 'definitionW' | 'conjugationMC' | 'conjugationW' | 'vosotros' | 'irregular';

const QUESTION_TYPE_SWITCHES = [
  {
    id: 'poropara',
    label: 'Por vs Para',
    settingKey: 'poropara' as BooleanSettingKey,
  },
  {
    id: 'definitionMC',
    label: 'Definition (Select)',
    settingKey: 'definitionMC' as BooleanSettingKey,
  },
  {
    id: 'definitionW',
    label: 'Definition (Written)',
    settingKey: 'definitionW' as BooleanSettingKey,
  },
  {
    id: 'conjugationMC',
    label: 'Conjugations (Select)',
    settingKey: 'conjugationMC' as BooleanSettingKey,
  },
  {
    id: 'conjugationW',
    label: 'Conjugations (Written)',
    settingKey: 'conjugationW' as BooleanSettingKey,
  },
];

const ADVANCED_SWITCHES = [
  {
    id: 'vosotros',
    label: 'Use Vosotros',
    settingKey: 'vosotros' as BooleanSettingKey,
  },
  {
    id: 'irregular',
    label: 'Irregular Only',
    settingKey: 'irregular' as BooleanSettingKey,
  },
];

export default function OptionsScreen(props: OptionsScreenProps) {
  const { settings, setSettings } = props;
  const [currentSection, setCurrentSection] = useState<OptionsSection>('main');

  const handleSettingChange = (key: BooleanSettingKey, value: boolean) => {
    const newSettings = new Settings();
    Object.assign(newSettings, settings, { [key]: value });
    setSettings(newSettings);
  };

  const handleVerbTypeChange = (verbType: string, checked: boolean) => {
    const newSettings = new Settings();
    const newVerbTypes = checked
      ? [...settings.verbTypes, verbType]
      : settings.verbTypes.filter(vt => vt !== verbType);
    Object.assign(newSettings, settings, { verbTypes: newVerbTypes });
    setSettings(newSettings);
  };

  const handleNumberOfQuestionsChange = (value: number) => {
    const newSettings = new Settings();
    Object.assign(newSettings, settings, { numberOfQuestions: value });
    setSettings(newSettings);
  };

  const conjugationEnabled = settings.conjugationMC || settings.conjugationW;

  const renderSwitchItem = (label: string, value: boolean, onToggle: () => void, disabled: boolean = false) => (
    <View style={[styles.switchRow, disabled && styles.disabledItem]}>
      <Text style={[styles.switchLabel, disabled && styles.disabledText]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{ false: '#767577', true: AppColors.startButton }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );

  const disableStart = () => {
    if (
      !(
        settings.conjugationMC ||
        settings.conjugationW ||
        settings.definitionMC ||
        settings.definitionW ||
        settings.poropara
      )
    ) {
      return true;
    }
    if (settings.verbTypes.length !== 0) return false;
    return !(
      settings.definitionMC ||
      settings.definitionW ||
      settings.poropara
    );
  };

  const renderHeader = (title: string, showBackArrow: boolean = true) => (
    <View style={styles.header}>
      {showBackArrow && (
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => currentSection === 'main' ? props.goBack() : setCurrentSection('main')}
          style={styles.backButton}
          iconColor={AppColors.darkText}
        />
      )}
      <Text variant="headlineMedium" style={styles.headerTitle}>
        {title}
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );

  const renderMainScreen = () => (
    <ScreenWrapper>
      {MAIN_MENU_ITEMS.map((item, index) => (
        <React.Fragment key={item.id}>
          <List.Item
            title={item.title}
            left={props => <List.Icon {...props} icon={item.icon} />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setCurrentSection(item.id)}
            style={styles.listItem}
            titleStyle={styles.listItemTitle}
          />
          {index < MAIN_MENU_ITEMS.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.startButton]}
          disabled={disableStart()}
          onPress={() => props.start(true)}
        >
          START
        </Button>
      </View>
    </ScreenWrapper>
  );

  // Reusable screen wrapper component
  const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Card style={styles.card}>
        <Card.Content>
          {children}
        </Card.Content>
      </Card>
    </ScrollView>
  );

  // Utility function to render switch groups
  const renderSwitchGroup = (switches: typeof QUESTION_TYPE_SWITCHES, customHandler?: (item: any) => void) => (
    <ScreenWrapper>
      {switches.map((switchItem) => (
        <View key={switchItem.id}>
          {renderSwitchItem(
            switchItem.label,
            settings[switchItem.settingKey],
            customHandler 
              ? () => customHandler(switchItem)
              : () => handleSettingChange(switchItem.settingKey, !settings[switchItem.settingKey])
          )}
        </View>
      ))}
    </ScreenWrapper>
  );

  const renderQuestionTypesScreen = () => renderSwitchGroup(QUESTION_TYPE_SWITCHES);

  const renderVerbTensesScreen = () => (
    <ScreenWrapper>
      {verbTypes.map((verbType, index) => (
        <View key={index}>
          {renderSwitchItem(
            verbTypeNicknames[verbType],
            settings.verbTypes.includes(verbType),
            () => handleVerbTypeChange(verbType, !settings.verbTypes.includes(verbType)),
            !conjugationEnabled
          )}
        </View>
      ))}
    </ScreenWrapper>
  );

  const renderAdvancedScreen = () => renderSwitchGroup(ADVANCED_SWITCHES);

  const renderNumberOfQuestionsScreen = () => (
    <ScreenWrapper>
      <Text variant="headlineSmall" style={styles.sectionTitle}>
        Number of Questions
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        Choose how many questions you want in your quiz
      </Text>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderValue}>{settings.numberOfQuestions}</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={100}
          step={5}
          value={settings.numberOfQuestions}
          onValueChange={handleNumberOfQuestionsChange}
          minimumTrackTintColor={AppColors.startButton}
          maximumTrackTintColor="#d3d3d3"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>5</Text>
          <Text style={styles.sliderLabel}>100</Text>
        </View>
      </View>
    </ScreenWrapper>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'main':
        return renderMainScreen();
      case 'questionTypes':
        return renderQuestionTypesScreen();
      case 'verbTenses':
        return renderVerbTensesScreen();
      case 'advanced':  
        return renderAdvancedScreen();
      case 'numberOfQuestions':
        return renderNumberOfQuestionsScreen();
      default:
        return renderMainScreen();
    }
  };

  const getTitle = () => {
    return SECTION_CONFIG[currentSection]?.title || 'Options';
  };

  return (
    <View style={styles.container}>
      {renderHeader(getTitle())}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.mainBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: AppColors.mainBackground,
  },
  backButton: {
    margin: 0,
    color: AppColors.startButton,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: SEN_FONT_FAMILY,
    color: AppColors.darkText,
    fontSize: 24,
  },
  headerSpacer: {
    width: 24,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  listItem: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTitle: {
    fontWeight: '600',
  },
  sectionTitle: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  switchLabel: {
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  disabledItem: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    marginBottom: 12,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: AppColors.startButton,
  },
  sliderContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: AppColors.startButton,
    fontFamily: SEN_FONT_FAMILY,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
}); 