import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TemaProvider, useTema } from '@/contexts/temaContexto';

SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { isDark } = useTema();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="criar_conta" />
        <Stack.Screen name="esqueci_minha_senha" />
        <Stack.Screen name="sobre" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="editar_perfil" />
        <Stack.Screen name="alterar_senha" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TemaProvider>
        <AppLayout />
      </TemaProvider>
    </GestureHandlerRootView>
  );
}