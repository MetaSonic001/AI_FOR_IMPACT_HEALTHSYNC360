const { withPlugins } = require('expo/config-plugins');

const withVoice = (config) => {
  return withPlugins(config, [
    [
      '@react-native-voice/voice',
      {
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
        speechRecognitionPermission: 'Allow $(PRODUCT_NAME) to access speech recognition',
      },
    ],
  ]);
};

module.exports = withVoice; 