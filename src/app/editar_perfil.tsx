import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTema } from '@/contexts/temaContexto';
import { useCores } from '@/constants/useCores';
import { CoresFixas } from '@/constants/cores';
import { Fontes } from '@/constants/fontes';

const MOCK_USUARIO = {
  nome: 'Victor Furlan',
  email: 'victor@email.com',
};

export default function EditarPerfilScreen() {
  const router = useRouter();
  const { isDark } = useTema();
  const cores = useCores();

  const [nome, setNome] = useState(MOCK_USUARIO.nome);
  const [email, setEmail] = useState(MOCK_USUARIO.email);
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

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
    <SafeAreaView style={[styles.safe, { backgroundColor: cores.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.botaoVoltar}>
            <Ionicons name="arrow-back" size={22} color={cores.textPrimario} />
          </TouchableOpacity>
          <Text style={[styles.titulo, { color: cores.textPrimario }]}>Editar perfil</Text>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>Nome</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
              placeholder="Seu nome completo"
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
              <ActivityIndicator color={CoresFixas.branco} />
            ) : sucesso ? (
              <>
                <Ionicons name="checkmark-outline" size={20} color={CoresFixas.branco} />
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
  botaoVoltar: { padding: 4 },
  titulo: {
    fontSize: 24,
    fontFamily: Fontes.bold,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  campo: { gap: 6 },
  label: {
    fontSize: 12,
    fontFamily: Fontes.semiBold,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fontes.regular,
  },
  erro: {
    color: CoresFixas.erro,
    fontSize: 12,
    fontFamily: Fontes.regular,
  },
  botao: {
    backgroundColor: CoresFixas.azul,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    shadowColor: CoresFixas.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoSucesso: { backgroundColor: '#2ecc71' },
  botaoTexto: {
    color: CoresFixas.branco,
    fontSize: 16,
    fontFamily: Fontes.bold,
    letterSpacing: 0.3,
  },
});