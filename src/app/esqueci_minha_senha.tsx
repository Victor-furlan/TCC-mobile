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
  useColorScheme,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function EsqueciSenhaScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const logo = isDark
    ? require('@/assets/images/logo_completa_mindcash_escura.png')
    : require('@/assets/images/logo_completa_mindcash_clara.png');

  async function handleEnviar() {
    if (!email) {
      setErro('Digite seu e-mail.');
      return;
    }
    setErro('');
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setEnviado(true);
    }, 1000);
  }

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['bottom']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={bg}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: bg }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={[styles.subtitulo, { color: textSecondary }]}>
              DO GASTO AO SIGNIFICADO
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
            {!enviado ? (
              <>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitulo, { color: textPrimary }]}>Esqueci minha senha</Text>
                  <Text style={[styles.cardDescricao, { color: textSecondary }]}>
                    Digite seu e-mail e enviaremos um link para redefinir sua senha.
                  </Text>
                </View>

                <View style={styles.campo}>
                  <Text style={[styles.label, { color: textSecondary }]}>E-mail</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
                    placeholder="seu@email.com"
                    placeholderTextColor={textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => { setEmail(text); setErro(''); }}
                  />
                </View>

                {erro ? <Text style={styles.erro}>{erro}</Text> : null}

                <TouchableOpacity
                  style={[styles.botao, carregando && styles.botaoDesabilitado]}
                  onPress={handleEnviar}
                  disabled={carregando}
                  activeOpacity={0.85}
                >
                  {carregando
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.botaoTexto}>Enviar link</Text>
                  }
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.sucessoContainer}>
                <Text style={styles.sucessoIcone}>✉️</Text>
                <Text style={[styles.sucessoTitulo, { color: textPrimary }]}>E-mail enviado!</Text>
                <Text style={[styles.sucessoTexto, { color: textSecondary }]}>
                  Verifique sua caixa de entrada e clique no link para redefinir sua senha.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.rodape}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Text style={styles.link}>← Voltar para o login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const AZUL = '#1560A8';
const AZUL_CLARO = '#2E9EFF';

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
    gap: 16,
  },
  cardHeader: {
    gap: 6,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescricao: {
    fontSize: 13,
    lineHeight: 20,
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
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: -4,
  },
  botao: {
    backgroundColor: AZUL,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: AZUL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  sucessoContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  sucessoIcone: {
    fontSize: 48,
  },
  sucessoTitulo: {
    fontSize: 18,
    fontWeight: '700',
  },
  sucessoTexto: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: AZUL_CLARO,
    fontSize: 14,
    fontWeight: '600',
  },
  rodape: {
    alignItems: 'center',
  },
});