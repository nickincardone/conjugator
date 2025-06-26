import React, { ChangeEvent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Checkbox, Divider } from 'react-native-paper';
import { Settings, verbTypes, verbTypeNicknames } from '@poropara/shared';

export interface OptionsScreenProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  start: (mobile: boolean) => void;
  goBack: () => void;
}

export default function OptionsScreen(props: OptionsScreenProps) {
  const { settings, setSettings } = props;

  const handleSettingChange = (key: keyof Settings, value: boolean) => {
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

  const conjugationEnabled = settings.conjugationMC || settings.conjugationW;

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Question Types
            </Text>

            <View style={styles.checkboxRow}>
              <Checkbox.Item
                label="Definition (Multiple Choice)"
                status={settings.definitionMC ? 'checked' : 'unchecked'}
                onPress={() =>
                  handleSettingChange('definitionMC', !settings.definitionMC)
                }
                style={styles.checkboxItem}
              />
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox.Item
                label="Por vs Para"
                status={settings.poropara ? 'checked' : 'unchecked'}
                onPress={() =>
                  handleSettingChange('poropara', !settings.poropara)
                }
                style={styles.checkboxItem}
              />
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox.Item
                label="Conjugations (Multiple Choice)"
                status={settings.conjugationMC ? 'checked' : 'unchecked'}
                onPress={() =>
                  handleSettingChange('conjugationMC', !settings.conjugationMC)
                }
                style={styles.checkboxItem}
              />
            </View>

            <Divider style={styles.divider} />

            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Verb Tenses
            </Text>

            {verbTypes.map((verbType, index) => (
              <View key={index} style={styles.checkboxRow}>
                <Checkbox.Item
                  label={verbTypeNicknames[verbType]}
                  status={
                    settings.verbTypes.includes(verbType)
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    handleVerbTypeChange(
                      verbType,
                      !settings.verbTypes.includes(verbType)
                    )
                  }
                  disabled={!conjugationEnabled}
                  style={[
                    styles.checkboxItem,
                    !conjugationEnabled && styles.disabledItem,
                  ]}
                />
              </View>
            ))}

            <Divider style={styles.divider} />

            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Other
            </Text>

            <View style={styles.checkboxRow}>
              <Checkbox.Item
                label="Use Vosotros"
                status={settings.vosotros ? 'checked' : 'unchecked'}
                onPress={() =>
                  handleSettingChange('vosotros', !settings.vosotros)
                }
                style={styles.checkboxItem}
              />
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox.Item
                label="Irregular Only"
                status={settings.irregular ? 'checked' : 'unchecked'}
                onPress={() =>
                  handleSettingChange('irregular', !settings.irregular)
                }
                style={styles.checkboxItem}
              />
            </View>

            <Divider style={styles.divider} />

            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Number of Questions: {settings.numberOfQuestions}
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={[styles.button, styles.startButton]}
                disabled={disableStart()}
                onPress={() => props.start(true)}
              >
                START
              </Button>

              <Button
                mode="outlined"
                style={[styles.button, styles.backButton]}
                onPress={() => props.goBack()}
              >
                Back
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3e5fc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sectionTitle: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#2196f3',
    fontWeight: '600',
  },
  checkboxRow: {
    marginVertical: 2,
  },
  checkboxItem: {
    paddingVertical: 4,
  },
  disabledItem: {
    opacity: 0.5,
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
    backgroundColor: '#2196f3',
  },
  backButton: {
    borderColor: '#666',
  },
});
