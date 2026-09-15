import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTema } from '@/contexts/temaContexto';

const MOCK_USUARIO = {
  nome: 'Victor Furlan',
  email: 'victor@email.com',
};

export default function EditarPerfilScreen() {
  const router = useRouter();
  const { isDark } = useTema();

  const [nome, setNome] = useState(MOCK_USUARIO.nome);
  const [email, setEmail] = useState(MOCK_USUARIO.email);
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  function handleSalvar() {
    if (!nome || !email) {
      setErro('Preencha todos os campos.');
      return;
    }
    setErro('');
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setSucesso(true);
      setTimeout(() => router.back(), 1500);
    }, 1000);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.botaoVoltar}>
            <Ionicons name="arrow-back" size={22} color={textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.titulo, { color: textPrimary }]}>Editar perfil</Text>
        </View>

        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>Nome</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
              placeholder="Seu nome completo"
              placeholderTextColor={textSecondary}
              autoCapitalize="words"
              value={nome}
              onChangeText={text => { setNome(text); setErro(''); }}
            />
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
            style={[
              styles.botao,
              carregando && styles.botaoDesabilitado,
              sucesso && styles.botaoSucesso,
            ]}
            onPress={handleSalvar}
            disabled={carregando}
            activeOpacity={0.85}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : sucesso ? (
              <>
                <Ionicons name="checkmark-outline" size={20} color="#fff" />
                <Text style={styles.botaoTexto}>Salvo!</Text>
              </>
            ) : (
              <Text style={styles.botaoTexto}>Salvar alterações</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const AZUL = '#1560A8';

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botaoVoltar: {
    padding: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 14,
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
  },
  botao: {
    backgroundColor: AZUL,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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
  botaoSucesso: {
    backgroundColor: '#2ecc71',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});