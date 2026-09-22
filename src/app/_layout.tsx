import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui'
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationBar } from 'expo-navigation-bar';
import { TemaProvider, useTema } from '@/contexts/temaContexto';
import { CoresClaro, CoresEscuro } from '@/constants/cores';

SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { isDark } = useTema();
  const pathname = usePathname();

  const isTabs =
    pathname !== "/" &&
    pathname !== "/criar_conta" &&
    pathname !== "esqueci_minha_senha";

  useEffect(() => {
    SplashScreen.hideAsync();
    {/*essas duas linhas aq trocam a cor do fundo do sistema de acordo com o tema selecionado */}
    const cor = isTabs ? (isDark ? CoresEscuro.bg : CoresClaro.bg) : (isDark ? CoresEscuro.card : CoresClaro.card)
    SystemUI.setBackgroundColorAsync(cor)
  }, [isDark, isTabs]);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      {/*o navigationbar server pra sumir e aparecer com a barrinha que tem o botão de voltar, sair, etc, do celular*/}
      <NavigationBar hidden={true} />
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