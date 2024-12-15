import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Message {
  id: string;
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  startTime: number;
  endTime: number;
  sourceLanguage: string;
  targetLanguage: string;
  messages: Message[];
}

interface TranslationState {
  sourceLanguage: string;
  targetLanguage: string;
  currentConversation: Conversation | null;
  conversations: Conversation[];
  setLanguages: (source: string, target: string) => void;
  startNewConversation: () => void;
  addMessageToConversation: (message: Message) => void;
  endCurrentConversation: () => void;
  loadConversations: () => Promise<void>;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  sourceLanguage: 'hi',
  targetLanguage: 'en',
  currentConversation: null,
  conversations: [],
  
  setLanguages: (source, target) => set({ sourceLanguage: source, targetLanguage: target }),
  
  startNewConversation: () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      startTime: Date.now(),
      endTime: 0,
      sourceLanguage: get().sourceLanguage,
      targetLanguage: get().targetLanguage,
      messages: [],
    };
    set({ currentConversation: newConversation });
  },
  
  addMessageToConversation: (message) => {
    set((state) => {
      if (!state.currentConversation) {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          startTime: Date.now(),
          endTime: 0,
          sourceLanguage: state.sourceLanguage,
          targetLanguage: state.targetLanguage,
          messages: [message],
        };
        return { currentConversation: newConversation };
      }

      const updatedConversation = {
        ...state.currentConversation,
        messages: [...state.currentConversation.messages, message],
      };
      return { currentConversation: updatedConversation };
    });
  },
  
  endCurrentConversation: () => {
    set((state) => {
      if (state.currentConversation) {
        const finishedConversation = {
          ...state.currentConversation,
          endTime: Date.now(),
        };
        const updatedConversations = [...state.conversations, finishedConversation];
        AsyncStorage.setItem('conversations', JSON.stringify(updatedConversations));
        return {
          conversations: updatedConversations,
          currentConversation: null,
        };
      }
      return state;
    });
  },
  
  loadConversations: async () => {
    const stored = await AsyncStorage.getItem('conversations');
    if (stored) {
      set({ conversations: JSON.parse(stored) });
    }
  },
})); 