import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
} 