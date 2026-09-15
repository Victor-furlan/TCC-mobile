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
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';

export default function EsqueciSenhaScreen() {
  const router = useRouter();
  const { isDark } = useTema();
  const cores = useCores();

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
            {!enviado ? (
              <>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Esqueci minha senha</Text>
                  <Text style={[styles.cardDescricao, { color: cores.textSecundario }]}>
                    Digite seu e-mail e enviaremos um link para redefinir sua senha.
                  </Text>
                </View>

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

                {erro ? <Text style={styles.erro}>{erro}</Text> : null}

                <TouchableOpacity
                  style={[styles.botao, carregando && styles.botaoDesabilitado]}
                  onPress={handleEnviar}
                  disabled={carregando}
                  activeOpacity={0.85}
                >
                  {carregando
                    ? <ActivityIndicator color={CoresFixas.branco} />
                    : <Text style={styles.botaoTexto}>Enviar link</Text>
                  }
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.sucessoContainer}>
                <Text style={styles.sucessoIcone}>✉️</Text>
                <Text style={[styles.sucessoTitulo, { color: cores.textPrimario }]}>E-mail enviado!</Text>
                <Text style={[styles.sucessoTexto, { color: cores.textSecundario }]}>
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
    color: CoresFixas.azulClaro,
    fontSize: 14,
    fontWeight: '600',
  },
  rodape: {
    alignItems: 'center',
  },
});