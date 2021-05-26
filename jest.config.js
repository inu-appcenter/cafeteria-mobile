module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // node_modules 중에서도 transform이 필요한 의존성은 명시해요!
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
};
