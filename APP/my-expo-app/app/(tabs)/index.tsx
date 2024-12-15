import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Translation } from '~/components/Translation';

export default function TranslationScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Translator' }} />
      <View style={styles.container}>
        <Translation />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
