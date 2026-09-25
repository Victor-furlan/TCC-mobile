import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack, usePathname, useRouter, useSegments} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui'
import * as Font from 'expo-font'
import { use, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationBar } from 'expo-navigation-bar';
import { TemaProvider, useTema } from '@/contexts/temaContexto';
import { CoresClaro, CoresEscuro } from '@/constants/cores';
import { AuthProvider, useAuth } from '@/contexts/authContexto';

SplashScreen.preventAutoHideAsync();

function RoteadorProtegido() {
  const {session, carregando} = useAuth();
  const segmentos = useSegments();
  const router = useRouter();

  useEffect(() => {
    if(carregando) return;

    const nasTabs = segmentos[0] === '(tabs)';
    const telasAuth = ['index', 'criar_conta', 'esqueci_minha_senha'];
    const naTelaAuth = telasAuth.includes(segmentos[0] as string) || segmentos[0] === undefined;

    if(nasTabs && !session) {
      //caso o usuario esteja em alguma das paginas na pasta tabs mas não esteja logado ele é jogado de volta pro index
      router.replace('/')
    }else if (naTelaAuth && session) {
      //caso o usuario não esteja nas tabs mas está logado, então ele é jogado pra home dentro das tabs
      router.replace('/(tabs)/home');
    }
  },[session, carregando, segmentos]);

  return null
}

function AppLayout() {
  const { isDark } = useTema();
  const pathname = usePathname();

  const [fontsLoaded] = Font.useFonts({
    'Inter_18pt-Regular': require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter_18pt-Medium': require('../../assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter_18pt-SemiBold': require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter_18pt-Bold': require('../../assets/fonts/Inter_18pt-Bold.ttf'),
  });

  const isTabs =
    pathname !== "/" &&
    pathname !== "/criar_conta" &&
    pathname !== "esqueci_minha_senha";

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      {/*essas duas linhas aq trocam a cor do fundo do sistema de acordo com o tema selecionado */}
      const cor = isTabs ? (isDark ? CoresEscuro.bg : CoresClaro.bg) : (isDark ? CoresEscuro.card : CoresClaro.card)
      SystemUI.setBackgroundColorAsync(cor)
    }
  }, [fontsLoaded, isDark, isTabs]);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      {/*o navigationbar server pra sumir e aparecer com a barrinha que tem o botão de voltar, sair, etc, do celular*/}
      <NavigationBar hidden={true} />
      <RoteadorProtegido />
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
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </TemaProvider>
    </GestureHandlerRootView>
  );
}