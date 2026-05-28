import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Result = {
  level: string;
  advice: string;
  color: string;
  icon: string;
};

const questions = [
  { key: 'fever', text: 'Do you have a fever?', type: 'both' },
  { key: 'chills', text: 'Are you experiencing chills?', type: 'malaria' },
  { key: 'headache', text: 'Do you have a headache?', type: 'both' },
  { key: 'vomiting', text: 'Are you vomiting?', type: 'both' },
  { key: 'weakness', text: 'Do you feel unusual weakness?', type: 'typhoid' },
  { key: 'sweating', text: 'Are you sweating excessively?', type: 'malaria' },
  { key: 'diarrhea', text: 'Do you have diarrhea?', type: 'typhoid' },
  { key: 'bodyPain', text: 'Are you experiencing body pain?', type: 'both' },
  { key: 'abdominalPain', text: 'Do you have stomach or abdominal pain?', type: 'typhoid' },
  { key: 'recentTravel', text: 'Have you recently travelled to a high-risk area?', type: 'malaria' },
  { key: 'duration', text: 'How many days have you had symptoms?', type: 'both' },
];

const SymptomCheckerScreen = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<{
    malaria: number;
    typhoid: number;
    final: Result;
  } | null>(null);

  const progress = useMemo(
    () => ((step + 1) / questions.length) * 100,
    [step]
  );

  const calculateResult = (data: Record<string, any>) => {
    let malaria = 0;
    let typhoid = 0;

    const addScore = (key: string, type: string) => {
      const value = data[key];

      if (!value) return;

      if (type === 'malaria') malaria += 2;
      if (type === 'typhoid') typhoid += 2;
      if (type === 'both') {
        malaria += 1;
        typhoid += 1;
      }
    };

    questions.forEach((q) => {
      addScore(q.key, q.type);
    });

    // duration affects both
    if (Number(data.duration) >= 3) {
      malaria += 1;
      typhoid += 1;
    }

    let final: Result;

    if (malaria >= 7 && malaria > typhoid) {
      final = {
        level: 'High Malaria Risk',
        advice:
          'Your symptoms strongly suggest malaria. Seek testing and medical care immediately.',
        color: '#DC2626',
        icon: 'virus',
      };
    } else if (typhoid >= 7 && typhoid > malaria) {
      final = {
        level: 'High Typhoid Risk',
        advice:
          'Your symptoms strongly suggest typhoid fever. Please get a Widal or blood test and seek treatment.',
        color: '#EA580C',
        icon: 'bacteria',
      };
    } else if (malaria >= 4 || typhoid >= 4) {
      final = {
        level: 'Moderate Risk',
        advice:
          'You show overlapping symptoms of malaria and typhoid. A medical test is recommended for accurate diagnosis.',
        color: '#D97706',
        icon: 'stethoscope',
      };
    } else {
      final = {
        level: 'Low Risk',
        advice:
          'Your symptoms do not strongly indicate malaria or typhoid. Continue monitoring your health.',
        color: '#059669',
        icon: 'shield-check',
      };
    }

    return { malaria, typhoid, final };
  };

  const handleAnswer = (value: any) => {
    const updated = {
      ...answers,
      [questions[step].key]: value,
    };

    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    setResult(calculateResult(updated));
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center px-6">
        <View className="bg-white rounded-[32px] p-6">

          <View
            className="w-20 h-20 rounded-full items-center justify-center self-center"
            style={{ backgroundColor: `${result.final.color}20` }}
          >
            <MaterialCommunityIcons
              name={result.final.icon as any}
              size={42}
              color={result.final.color}
            />
          </View>

          <Text
            className="text-3xl font-bold text-center mt-6"
            style={{ color: result.final.color }}
          >
            {result.final.level}
          </Text>

          <Text className="text-slate-600 text-center mt-4 leading-6">
            {result.final.advice}
          </Text>

          {/* Score breakdown */}
          <View className="mt-6 bg-slate-50 p-4 rounded-2xl">
            <Text className="text-slate-700 font-bold text-center">
              Breakdown
            </Text>
            <Text className="text-slate-600 text-center mt-2">
              Malaria Score: {result.malaria}
            </Text>
            <Text className="text-slate-600 text-center">
              Typhoid Score: {result.typhoid}
            </Text>
          </View>

          <TouchableOpacity onPress={restart} className="mt-8">
            <LinearGradient
              colors={['#10B981', '#059669']}
              className="rounded-2xl py-4"
            >
              <Text className="text-white text-center font-bold">
                Start New Assessment
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  const q = questions[step];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">

      {/* HEADER */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        className="px-6 pt-5 pb-10 rounded-b-[40px]"
      >
        <Text className="text-white/80">
          Malaria & Typhoid Checker
        </Text>

        <Text className="text-white text-3xl font-bold mt-2">
          Symptom Assessment
        </Text>

        <Text className="text-white/80 mt-2">
          Check whether your symptoms match malaria or typhoid patterns
        </Text>

        <View className="mt-6">
          <View className="h-2 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>

          <Text className="text-white/80 mt-2 text-sm">
            {step + 1} / {questions.length}
          </Text>
        </View>
      </LinearGradient>

      {/* QUESTION */}
      <View className="flex-1 px-6 -mt-6">
        <View className="bg-white rounded-[32px] p-6">

          <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center self-center">
            <MaterialCommunityIcons
              name="medical-bag"
              size={30}
              color="#059669"
            />
          </View>

          <Text className="text-2xl font-bold text-center mt-6 text-slate-900">
            {q.text}
          </Text>

          {q.key === 'duration' ? (
            <ScrollView horizontal className="mt-8">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => handleAnswer(d)}
                  className="mr-3 bg-emerald-50 px-6 py-4 rounded-2xl"
                >
                  <Text className="text-emerald-700 font-bold">
                    {d} day{d > 1 ? 's' : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View className="mt-10">

              <TouchableOpacity
                onPress={() => handleAnswer(true)}
                className="bg-emerald-500 py-5 rounded-2xl"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Yes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleAnswer(false)}
                className="bg-slate-100 py-5 rounded-2xl mt-4"
              >
                <Text className="text-slate-700 text-center font-bold text-lg">
                  No
                </Text>
              </TouchableOpacity>

            </View>
          )}

        </View>
      </View>

    </SafeAreaView>
  );
};

export default SymptomCheckerScreen;