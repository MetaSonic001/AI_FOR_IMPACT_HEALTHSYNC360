import { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { Button } from './Button';
import { useTranslationStore } from '../store/translationStore';
import { translateText, SUPPORTED_LANGUAGES } from '../services/translationService';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

export const Translation = () => {
  const colorScheme = useColorScheme();
  const isDark = false; // Force dark theme
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [isListening, setIsListening] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'source' | 'target'>('source');
  const [messages, setMessages] = useState<Array<{
    id: string;
    originalText: string;
    translatedText: string;
    fromLanguage: string;
    toLanguage: string;
    timestamp: number;
  }>>([]);
  
  const { 
    sourceLanguage, 
    targetLanguage, 
    setLanguages,
    currentConversation,
    startNewConversation,
    addMessageToConversation,
    endCurrentConversation 
  } = useTranslationStore();

  useEffect(() => {
    startNewConversation();
    return () => {
      endCurrentConversation();
    };
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = async (e: any) => {
      if (e.value) {
        const spokenText = e.value[0];
        const fromLang = activeLanguage === 'source' ? sourceLanguage : targetLanguage;
        const toLang = activeLanguage === 'source' ? targetLanguage : sourceLanguage;
        
        try {
          const translatedResult = await translateText(spokenText, toLang, fromLang);
          
          const newMessage = {
            id: Date.now().toString(),
            originalText: spokenText,
            translatedText: translatedResult,
            fromLanguage: fromLang,
            toLanguage: toLang,
            timestamp: Date.now()
          };

          setMessages(prev => [...prev, newMessage]);
          addMessageToConversation(newMessage);

          await Speech.speak(translatedResult, {
            language: toLang,
            pitch: 1,
            rate: 0.75,
          });
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to translate text');
        }
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [sourceLanguage, targetLanguage, activeLanguage]);

  const startListening = async (language: 'source' | 'target') => {
    try {
      setActiveLanguage(language);
      await Voice.start(language === 'source' ? sourceLanguage : targetLanguage);
      setIsListening(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to start speech recognition');
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error(error);
    }
  };

  const swapLanguages = () => {
    setLanguages(targetLanguage, sourceLanguage);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header with language selectors */}
      <View className="px-4 pt-4 pb-2 border-b border-gray-200">

        <View className="flex-row justify-between items-center bg-gray-100 rounded-lg p-2">
          <View className="flex-1">
            <Picker
              selectedValue={sourceLanguage}
              onValueChange={(value) => setLanguages(value, targetLanguage)}
              dropdownIconColor="black"
              style={{ color: 'black' }}>
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                <Picker.Item key={code} label={name} value={code} color="black" />
              ))}
            </Picker>
          </View>
          <FontAwesome name="arrow-right" size={16} color="#4B5563" className="mx-2" />
          <View className="flex-1">
            <Picker
              selectedValue={targetLanguage}
              onValueChange={(value) => setLanguages(sourceLanguage, value)}
              dropdownIconColor="black"
              style={{ color: 'black' }}>
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                <Picker.Item key={code} label={name} value={code} color="black" />
              ))}
            </Picker>
          </View>
          <TouchableOpacity 
            onPress={swapLanguages}
            className="bg-gray-200 rounded-full p-3"
          >
            <FontAwesome name="exchange" size={20} color="black" />
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`my-3 max-w-[90%] ${
              message.fromLanguage === targetLanguage ? 'self-end' : 'self-start'
            }`}
          >
            <View className="space-y-2">
              {/* Original text */}
              <View className="bg-gray-800 rounded-t-2xl rounded-br-2xl p-3">
                <Text className="text-white">
                  {message.originalText}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {SUPPORTED_LANGUAGES[message.fromLanguage]}
                </Text>
              </View>

              {/* Translation */}
              <View className="bg-blue-600 rounded-b-2xl rounded-tr-2xl p-3">
                <Text className="text-white">
                  {message.translatedText}
                </Text>
                <Text className="text-blue-200 text-xs mt-1">
                  {SUPPORTED_LANGUAGES[message.toLanguage]}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 text-xs mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Speaking buttons */}
      <View className="p-4 flex gap-4 flex-row w-full bg-white border-t border-gray-200">
        <Button 
          title={isListening && activeLanguage === 'source' ? "Stop" : `Speak in ${SUPPORTED_LANGUAGES[sourceLanguage]}`} 
          onPress={() => isListening ? stopListening() : startListening('source')}
          className={`${
            isListening && activeLanguage === 'source' 
              ? 'bg-red-500' 
              : 'bg-blue-600'
          } py-4 rounded-xl flex-1`}
        />
        <Button 
          title={isListening && activeLanguage === 'target' ? "Stop" : `Speak in ${SUPPORTED_LANGUAGES[targetLanguage]}`} 
          onPress={() => isListening ? stopListening() : startListening('target')}
          className={`${
            isListening && activeLanguage === 'target' 
              ? 'bg-red-500' 
              : 'bg-blue-600'
          } py-4 rounded-xl flex-1`}
        />
      </View>
    </View>
  );
}; 