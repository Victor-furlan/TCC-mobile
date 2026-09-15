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
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';

export default function CriarContaScreen() {
  const router = useRouter();
  const { isDark } = useTema();
  const cores = useCores();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const logo = isDark
    ? require('@/assets/images/logo_completa_mindcash_escura.png')
    : require('@/assets/images/logo_completa_mindcash_clara.png');

  async function handleCriarConta() {
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setErro('');
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      router.replace('/');
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
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={[styles.subtitulo, { color: cores.textSecundario }]}>
              DO GASTO AO SIGNIFICADO
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
            <Text style={[styles.cardTitulo, { color: cores.textPrimario }]}>Criar conta</Text>

            <View style={styles.campo}>
              <Text style={[styles.label, { color: cores.textSecundario }]}>Nome</Text>
              <TextInput
                style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                placeholder="Seu nome"
                placeholderTextColor={cores.textSecundario}
                autoCapitalize="words"
                value={nome}
                onChangeText={text => { setNome(text); setErro(''); }}
              />
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

            <View style={styles.campo}>
              <Text style={[styles.label, { color: cores.textSecundario }]}>Senha</Text>
              <TextInput
                style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={cores.textSecundario}
                secureTextEntry
                value={senha}
                onChangeText={text => { setSenha(text); setErro(''); }}
              />
            </View>

            <View style={styles.campo}>
              <Text style={[styles.label, { color: cores.textSecundario }]}>Confirmar senha</Text>
              <TextInput
                style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
                placeholder="Repita a senha"
                placeholderTextColor={cores.textSecundario}
                secureTextEntry
                value={confirmarSenha}
                onChangeText={text => { setConfirmarSenha(text); setErro(''); }}
              />
            </View>

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <TouchableOpacity
              style={[styles.botao, carregando && styles.botaoDesabilitado]}
              onPress={handleCriarConta}
              disabled={carregando}
              activeOpacity={0.85}
            >
              {carregando
                ? <ActivityIndicator color={CoresFixas.branco} />
                : <Text style={styles.botaoTexto}>Criar conta</Text>
              }
            </TouchableOpacity>
          </View>

          <View style={styles.rodape}>
            <Text style={[styles.rodapeTexto, { color: cores.textSecundario }]}>Já tem conta? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Text style={styles.link}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    gap: 24,
    justifyContent: 'center',
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