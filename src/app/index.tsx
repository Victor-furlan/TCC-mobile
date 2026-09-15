import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';
import { useTema } from '@/contexts/temaContexto';

export default function LoginScreen() {
  const router = useRouter();
  const cores = useCores();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const { isDark } = useTema();
  const logo = isDark
    ? require('@/assets/images/logo_completa_mindcash_escura.png')
    : require('@/assets/images/logo_completa_mindcash_clara.png');

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }
    setErro('');
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      router.replace('/(tabs)');
    }, 1000);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]} edges={['bottom']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={cores.bg}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: cores.bg }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={[styles.subtitulo, { color: cores.textSecundario }]}>
              DO GASTO AO SIGNIFICADO
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
            <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Entrar na conta</Text>

            <View style={styles.campo}>
              <Text style={[styles.label, { color: cores.textSecundario }]}>E-mail</Text>
              <TextInput
                style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                placeholder="seu@email.com"
                placeholderTextColor={cores.textSecundario}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={text => { setEmail(text); setErro(''); }}
              />
            </View>

            <View style={styles.campo}>
              <Text style={[styles.label, { color: cores.textSecundario }]}>Senha</Text>
              <TextInput
                style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                placeholder="••••••••"
                placeholderTextColor={cores.textSecundario}
                secureTextEntry
                value={senha}
                onChangeText={text => { setSenha(text); setErro(''); }}
              />
            </View>

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <TouchableOpacity
              style={[styles.botao, carregando && styles.botaoDesabilitado]}
              onPress={handleLogin}
              disabled={carregando}
              activeOpacity={0.85}
            >
              {carregando
                ? <ActivityIndicator color={CoresFixas.branco} />
                : <Text style={styles.botaoTexto}>Entrar</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity style={styles.esqueciContainer} activeOpacity={0.7} onPress={() => router.push('/esqueci_minha_senha')}>
              <Text style={[styles.linkTexto, { color: cores.textSecundario }]}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rodape}>
            <Text style={[styles.rodapeTexto, { color: cores.textSecundario }]}>Não tem conta? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/criar_conta')}>
              <Text style={styles.link}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 260,
    height: 82,
  },
  subtitulo: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 14,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  campo: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  erro: {
    color: CoresFixas.erro,
    fontSize: 12,
    marginTop: -4,
  },
  botao: {
    backgroundColor: CoresFixas.azul,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: CoresFixas.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: CoresFixas.branco,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  esqueciContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  linkTexto: {
    fontSize: 13,
  },
  link: {
    color: CoresFixas.azulClaro,
    fontSize: 14,
    fontWeight: '600',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rodapeTexto: {
    fontSize: 14,
  },
});