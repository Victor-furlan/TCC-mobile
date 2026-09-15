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

export default function AlternarSenhaScreen() {
  const router = useRouter();
  const { isDark } = useTema();
  const cores = useCores();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

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
          <Text style={[styles.titulo, { color: cores.textPrimario }]}>Alterar senha</Text>
        </View>

        <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>Senha atual</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
              placeholder="••••••••"
              placeholderTextColor={cores.textSecundario}
              secureTextEntry
              value={senhaAtual}
              onChangeText={text => { setSenhaAtual(text); setErro(''); }}
            />
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>Nova senha</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={cores.textSecundario}
              secureTextEntry
              value={novaSenha}
              onChangeText={text => { setNovaSenha(text); setErro(''); }}
            />
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: cores.textSecundario }]}>Confirmar nova senha</Text>
            <TextInput
              style={[styles.input, { backgroundColor: cores.inputBg, borderColor: cores.border, color: cores.textPrimario }]}
              placeholder="Repita a nova senha"
              placeholderTextColor={cores.textSecundario}
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
              <ActivityIndicator color={CoresFixas.branco} />
            ) : sucesso ? (
              <>
                <Ionicons name="checkmark-outline" size={20} color={CoresFixas.branco} />
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
    color: CoresFixas.erro,
    fontSize: 12,
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
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoSucesso: {
    backgroundColor: '#2ecc71',
  },
  botaoTexto: {
    color: CoresFixas.branco,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});