import { Stack } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslationStore } from '~/store/translationStore';
import { SUPPORTED_LANGUAGES } from '~/services/translationService';
import { FontAwesome } from '@expo/vector-icons';

export default function History() {
  // Static conversation data
  const staticConversations = [
    {
      id: '1',
      startTime: Date.now() - 3600000, // 1 hour ago
      endTime: Date.now() - 3540000,   // 1 hour ago - 20 minutes
      sourceLanguage: 'en',
      targetLanguage: 'hi',
      messages: [
        {
          id: '1a',
          originalText: "नमस्ते, आज आप यहाँ किस परेशानी से आए हैं?",
          translatedText: "Hello, what brings you here today?",
          fromLanguage: 'en',
          toLanguage: 'hi',
          timestamp: Date.now() - 3600000
        },
        {
          id: '1b',
          originalText: "I have had fever and headache for the last 3 days",
          translatedText: "मुझे पिछले 3 दिनों से बुखार है और सिर में दर्द है",
          fromLanguage: 'hi',
          toLanguage: 'en',
          timestamp: Date.now() - 3590000
        }
      ]
    },
    {
      id: '2',
      startTime: Date.now() - 86400000, // 1 day ago
      endTime: Date.now() - 86100000,
      sourceLanguage: 'en',
      targetLanguage: 'mr',
      messages: [
        {
          id: '2a',
          originalText: "Good morning, I'm Dr. Smith. How can I help you?",
          translatedText: "सुप्रभात, मी डॉ. स्मिथ आहे. मी तुमची कशी मदत करू शकतो?",
          fromLanguage: 'en',
          toLanguage: 'mr',
          timestamp: Date.now() - 86400000
        },
        {
          id: '2b',
          originalText: "माझ्या छातीत दुखत आहे आणि श्वास घेण्यास त्रास होत आहे",
          translatedText: "I have chest pain and difficulty breathing",
          fromLanguage: 'mr',
          toLanguage: 'en',
          timestamp: Date.now() - 86300000
        }
      ]
    },
    {
      id: '3',
      startTime: Date.now() - 172800000, // 2 days ago
      endTime: Date.now() - 172500000,
      sourceLanguage: 'en',
      targetLanguage: 'gu',
      messages: [
        {
          id: '3a',
          originalText: "When did your stomach pain start?",
          translatedText: "તમારું પેટનું દુખાવો ક્યારે શરૂ થયું?",
          fromLanguage: 'en',
          toLanguage: 'gu',
          timestamp: Date.now() - 172800000
        },
        {
          id: '3b',
          originalText: "ગઈકાલ રાત્રે ભોજન પછી",
          translatedText: "After dinner last night",
          fromLanguage: 'gu',
          toLanguage: 'en',
          timestamp: Date.now() - 172700000
        }
      ]
    },
    {
      id: '4',
      startTime: Date.now() - 259200000, // 3 days ago
      endTime: Date.now() - 258900000,
      sourceLanguage: 'en',
      targetLanguage: 'bn',
      messages: [
        {
          id: '4a',
          originalText: "Are you allergic to any medications?",
          translatedText: "আপনার কি কোনো ওষুধে অ্যালার্জি আছে?",
          fromLanguage: 'en',
          toLanguage: 'bn',
          timestamp: Date.now() - 259200000
        },
        {
          id: '4b',
          originalText: "হ্যাঁ, পেনিসিলিন",
          translatedText: "Yes, penicillin",
          fromLanguage: 'bn',
          toLanguage: 'en',
          timestamp: Date.now() - 259100000
        }
      ]
    },
    {
      id: '5',
      startTime: Date.now() - 345600000, // 4 days ago
      endTime: Date.now() - 345300000,
      sourceLanguage: 'en',
      targetLanguage: 'ta',
      messages: [
        {
          id: '5a',
          originalText: "How long have you had this skin rash?",
          translatedText: "இந்த தோல் தடிப்பு உங்களுக்கு எவ்வளவு காலமாக இருக்கிறது?",
          fromLanguage: 'en',
          toLanguage: 'ta',
          timestamp: Date.now() - 345600000
        },
        {
          id: '5b',
          originalText: "சுமார் ஒரு வாரமாக",
          translatedText: "For about a week",
          fromLanguage: 'ta',
          toLanguage: 'en',
          timestamp: Date.now() - 345500000
        }
      ]
    }
  ];

  // Use static conversations instead of store conversations
  const conversations = staticConversations;

  const formatDuration = (start: number, end: number) => {
    const duration = Math.floor((end - start) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Conversation History' }} />
      <View style={styles.container}>
        <ScrollView className="flex-1">
          {conversations.map((conversation) => (
            <View
              key={conversation.id}
              className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100"
            >
              {/* Conversation Header */}
              <View className="p-4 border-b border-slate-100 bg-slate-50">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-slate-500">
                    {new Date(conversation.startTime).toLocaleDateString()}
                  </Text>
                  <Text className="text-sm text-slate-500">
                    Duration: {formatDuration(conversation.startTime, conversation.endTime)}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-slate-700 font-medium">
                    {SUPPORTED_LANGUAGES[conversation.sourceLanguage]}
                  </Text>
                  <FontAwesome name="exchange" size={12} color="#64748B" className="mx-2" />
                  <Text className="text-slate-700 font-medium">
                    {SUPPORTED_LANGUAGES[conversation.targetLanguage]}
                  </Text>
                </View>
              </View>

              {/* Messages */}
              <View className="p-4">
                {conversation.messages.map((message, index) => (
                  <View key={message.id} className="mb-4 last:mb-0">
                    <View className="space-y-2">
                      <View className="bg-slate-50 rounded-lg p-3">
                        <Text className="text-slate-900">
                          {message.originalText}
                        </Text>
                        <Text className="text-slate-500 text-xs mt-1">
                          {SUPPORTED_LANGUAGES[message.fromLanguage]}
                        </Text>
                      </View>

                      <View className="bg-blue-50 rounded-lg p-3">
                        <Text className="text-slate-900">
                          {message.translatedText}
                        </Text>
                        <Text className="text-blue-500 text-xs mt-1">
                          {SUPPORTED_LANGUAGES[message.toLanguage]}
                        </Text>
                      </View>
                    </View>
                    {index < conversation.messages.length - 1 && (
                      <View className="h-px bg-slate-100 my-4" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
});
