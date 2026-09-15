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

export default function AlternarSenhaScreen() {
  const router = useRouter();
  const { isDark } = useTema();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
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
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (novaSenha.length < 6) {
      setErro('A nova senha deve ter pelo menos 6 caracteres.');
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
          <Text style={[styles.titulo, { color: textPrimary }]}>Alterar senha</Text>
        </View>

        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>Senha atual</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
              placeholder="••••••••"
              placeholderTextColor={textSecondary}
              secureTextEntry
              value={senhaAtual}
              onChangeText={text => { setSenhaAtual(text); setErro(''); }}
            />
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>Nova senha</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={textSecondary}
              secureTextEntry
              value={novaSenha}
              onChangeText={text => { setNovaSenha(text); setErro(''); }}
            />
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>Confirmar nova senha</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
              placeholder="Repita a nova senha"
              placeholderTextColor={textSecondary}
              secureTextEntry
              value={confirmarSenha}
              onChangeText={text => { setConfirmarSenha(text); setErro(''); }}
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
                <Text style={styles.botaoTexto}>Alterada!</Text>
              </>
            ) : (
              <Text style={styles.botaoTexto}>Alterar senha</Text>
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