// Placeholder for SymptomCheckerScreen
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const questions = [
  { key: 'fever', text: 'Do you have a fever?' },
  { key: 'chills', text: 'Are you experiencing chills?' },
  { key: 'headache', text: 'Do you have a headache?' },
  { key: 'vomiting', text: 'Are you vomiting?' },
  { key: 'weakness', text: 'Do you feel weakness?' },
  { key: 'sweating', text: 'Are you sweating excessively?' },
  { key: 'diarrhea', text: 'Do you have diarrhea?' },
  { key: 'bodyPain', text: 'Are you experiencing body pain?' },
  { key: 'recentTravel', text: 'Have you recently traveled to a malaria-prone area?' },
  { key: 'duration', text: 'How many days have you had symptoms?' },
];

const SymptomCheckerScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (answer: any) => {
    const key = questions[step].key;
    setAnswers((prev) => ({ ...prev, [key]: answer }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Simple rule-based risk assessment
      let risk = 0;
      if (answers.fever || answer === true) risk++;
      if (answers.chills) risk++;
      if (answers.headache) risk++;
      if (answers.vomiting) risk++;
      if (answers.weakness) risk++;
      if (answers.sweating) risk++;
      if (answers.diarrhea) risk++;
      if (answers.bodyPain) risk++;
      if (answers.recentTravel) risk++;
      if (parseInt(answer) >= 3 || parseInt(answers.duration) >= 3) risk++;

      let riskLevel = 'Low Risk';
      let advice = 'Your symptoms suggest a low risk of malaria. Monitor your health and use preventive measures.';
      if (risk >= 4 && risk < 7) {
        riskLevel = 'Moderate Risk';
        advice = 'You have several symptoms. Please consult a healthcare professional soon.';
      } else if (risk >= 7 && risk < 9) {
        riskLevel = 'High Risk';
        advice = 'You have many symptoms of malaria. Seek medical attention as soon as possible.';
      } else if (risk >= 9) {
        riskLevel = 'Emergency Warning';
        advice = 'Severe symptoms detected. Seek emergency care immediately!';
      }
      setResult(`${riskLevel}\n\n${advice}`);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Assessment Result</Text>
        <Text style={styles.resultText}>{result}</Text>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart} accessibilityRole="button">
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[step];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Symptom Checker</Text>
      <Text style={styles.question}>{q.text}</Text>
      {q.key === 'duration' ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <TouchableOpacity
              key={d}
              style={styles.optionButton}
              onPress={() => handleAnswer(d)}
              accessibilityRole="button"
            >
              <Text style={styles.optionText}>{d} day{d > 1 ? 's' : ''}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(true)} accessibilityRole="button">
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false)} accessibilityRole="button">
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.progress}>{`Question ${step + 1} of ${questions.length}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    color: '#1565c0',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  optionText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    marginTop: 24,
    color: '#888',
    fontSize: 14,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  resultText: {
    fontSize: 18,
    color: '#1565c0',
    marginBottom: 32,
    textAlign: 'center',
  },
  restartButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SymptomCheckerScreen;
