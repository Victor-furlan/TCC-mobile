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

const CATEGORIAS = [
  { id: 'entretenimento', label: 'Entretenimento', icone: 'film-outline' },
  { id: 'software', label: 'Software', icone: 'code-slash-outline' },
  { id: 'compras', label: 'Compras', icone: 'bag-outline' },
  { id: 'utilidades', label: 'Utilidades', icone: 'flash-outline' },
  { id: 'alimentacao', label: 'Alimentação', icone: 'restaurant-outline' },
  { id: 'saude', label: 'Saúde', icone: 'medkit-outline' },
  { id: 'educacao', label: 'Educação', icone: 'book-outline' },
];

const HUMORES = [
  { id: 'feliz', emoji: '😊', label: 'Feliz' },
  { id: 'ansioso', emoji: '😰', label: 'Ansioso' },
  { id: 'estressado', emoji: '😡', label: 'Estressado' },
  { id: 'cansado', emoji: '😴', label: 'Cansado' },
  { id: 'neutro', emoji: '😐', label: 'Neutro' },
];

const PERIODICIDADES = [
  { id: 'mensal', label: 'Mensal' },
  { id: 'anual', label: 'Anual' },
  { id: 'semanal', label: 'Semanal' },
];

function Estrelas({ valor, onChange, textSecondary }: { valor: number; onChange: (v: number) => void; textSecondary: string }) {
  return (
    <View style={styles.estrelasRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity key={i} onPress={() => onChange(i)} activeOpacity={0.7}>
          <Ionicons
            name={i <= valor ? 'star' : 'star-outline'}
            size={28}
            color={i <= valor ? '#f5a623' : textSecondary}
          />
        </TouchableOpacity>
      ))}
      {valor > 0 && (
        <TouchableOpacity onPress={() => onChange(0)} activeOpacity={0.7}>
          <Text style={[styles.limparTexto, { color: textSecondary }]}>Limpar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function RegistrarScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [tipo, setTipo] = useState<'despesa' | 'assinatura'>('despesa');

  // Campos comuns
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [humor, setHumor] = useState('');
  const [motivo, setMotivo] = useState('');
  const [arrependimento, setArrependimento] = useState(0);

  // Campos despesa
  const [data, setData] = useState('');

  // Campos assinatura
  const [periodicidade, setPeriodicidade] = useState('');
  const [proximaCobranca, setProximaCobranca] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const bg = isDark ? '#0a1628' : '#eef4ff';
  const card = isDark ? '#111f35' : '#ffffff';
  const border = isDark ? '#1e3050' : '#dde8f5';
  const inputBg = isDark ? '#0d1a2e' : '#f5f9ff';
  const textPrimary = isDark ? '#e8f0fe' : '#0d1b2a';
  const textSecondary = isDark ? '#6b8aaa' : '#5a7a9a';

  function limparCampos() {
    setDescricao('');
    setValor('');
    setCategoria('');
    setHumor('');
    setMotivo('');
    setArrependimento(0);
    setData('');
    setPeriodicidade('');
    setProximaCobranca('');
  }

  function handleSalvar() {
    if (!valor || !descricao || !categoria) return;
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setSucesso(true);
      setTimeout(() => {
        setSucesso(false);
        limparCampos();
      }, 1500);
    }, 1000);
  }

  const podeSalvar = valor && descricao && categoria &&
    (tipo === 'despesa' || (tipo === 'assinatura' && periodicidade));

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.titulo, { color: textPrimary }]}>Registrar</Text>

        {/* Tipo */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Tipo</Text>
          <View style={styles.tipoRow}>
            <TouchableOpacity
              style={[styles.tipoBotao, tipo === 'despesa' && styles.tipoAtivo, { borderColor: border }]}
              onPress={() => { setTipo('despesa'); limparCampos(); }}
              activeOpacity={0.8}
            >
              <Ionicons name="cart-outline" size={18} color={tipo === 'despesa' ? '#fff' : textSecondary} />
              <Text style={[styles.tipoTexto, { color: tipo === 'despesa' ? '#fff' : textSecondary }]}>
                Despesa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tipoBotao, tipo === 'assinatura' && styles.tipoAtivo, { borderColor: border }]}
              onPress={() => { setTipo('assinatura'); limparCampos(); }}
              activeOpacity={0.8}
            >
              <Ionicons name="repeat-outline" size={18} color={tipo === 'assinatura' ? '#fff' : textSecondary} />
              <Text style={[styles.tipoTexto, { color: tipo === 'assinatura' ? '#fff' : textSecondary }]}>
                Assinatura
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Detalhes */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Detalhes</Text>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>Nome</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
              placeholder={tipo === 'despesa' ? 'Ex: iFood, Uber...' : 'Ex: Netflix, Spotify...'}
              placeholderTextColor={textSecondary}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          {tipo === 'despesa' ? (
            <View style={styles.linha}>
              <View style={[styles.campo, { flex: 1 }]}>
                <Text style={[styles.label, { color: textSecondary }]}>Data</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={textSecondary}
                  keyboardType="numeric"
                  value={data}
                  onChangeText={setData}
                />
              </View>
              <View style={[styles.campo, { flex: 1 }]}>
                <Text style={[styles.label, { color: textSecondary }]}>Valor (R$)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
                  placeholder="0,00"
                  placeholderTextColor={textSecondary}
                  keyboardType="numeric"
                  value={valor}
                  onChangeText={setValor}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.linha}>
                <View style={[styles.campo, { flex: 1 }]}>
                  <Text style={[styles.label, { color: textSecondary }]}>Valor (R$)</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
                    placeholder="0,00"
                    placeholderTextColor={textSecondary}
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                  />
                </View>
                <View style={[styles.campo, { flex: 1 }]}>
                  <Text style={[styles.label, { color: textSecondary }]}>Próxima cobrança</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={textSecondary}
                    keyboardType="numeric"
                    value={proximaCobranca}
                    onChangeText={setProximaCobranca}
                  />
                </View>
              </View>

              <View style={styles.campo}>
                <Text style={[styles.label, { color: textSecondary }]}>Periodicidade</Text>
                <View style={styles.tipoRow}>
                  {PERIODICIDADES.map(p => (
                    <TouchableOpacity
                      key={p.id}
                      style={[
                        styles.tipoBotao,
                        periodicidade === p.id && styles.tipoAtivo,
                        { borderColor: border },
                      ]}
                      onPress={() => setPeriodicidade(p.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.tipoTexto, { color: periodicidade === p.id ? '#fff' : textSecondary }]}>
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>

        {/* Categoria */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Categoria</Text>
          <View style={styles.categoriaGrid}>
            {CATEGORIAS.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoriaItem,
                  { backgroundColor: inputBg, borderColor: categoria === cat.id ? '#2E9EFF' : border },
                ]}
                onPress={() => setCategoria(cat.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={cat.icone as any}
                  size={22}
                  color={categoria === cat.id ? '#2E9EFF' : textSecondary}
                />
                <Text style={[styles.categoriaLabel, { color: categoria === cat.id ? '#2E9EFF' : textSecondary }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Campos emocionais */}
        <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
          <Text style={[styles.cardTitulo, { color: textPrimary }]}>Campos Emocionais (Opcional)</Text>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>
              {tipo === 'despesa' ? 'Como você estava se sentindo ao fazer essa despesa?' : 'Como você estava se sentindo ao assinar?'}
            </Text>
            <View style={styles.humorRow}>
              {HUMORES.map(h => (
                <TouchableOpacity
                  key={h.id}
                  style={[
                    styles.humorItem,
                    { borderColor: humor === h.id ? '#2E9EFF' : border, backgroundColor: inputBg },
                  ]}
                  onPress={() => setHumor(humor === h.id ? '' : h.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.humorEmoji}>{h.emoji}</Text>
                  <Text style={[styles.humorLabel, { color: humor === h.id ? '#2E9EFF' : textSecondary }]}>
                    {h.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>
              {tipo === 'despesa' ? 'Motivo da despesa' : 'Motivo da assinatura'}
            </Text>
            <TextInput
              style={[styles.inputMultiline, { backgroundColor: inputBg, borderColor: border, color: textPrimary }]}
              placeholder={tipo === 'despesa' ? 'Ex: Estava com fome, vi uma promoção...' : 'Ex: Preciso para trabalho, recomendação de amigo...'}
              placeholderTextColor={textSecondary}
              multiline
              numberOfLines={3}
              value={motivo}
              onChangeText={setMotivo}
            />
          </View>

          <View style={styles.campo}>
            <Text style={[styles.label, { color: textSecondary }]}>Nível de arrependimento</Text>
            <Estrelas valor={arrependimento} onChange={setArrependimento} textSecondary={textSecondary} />
          </View>
        </View>

        {/* Botão salvar */}
        <TouchableOpacity
          style={[
            styles.botao,
            !podeSalvar && styles.botaoDesabilitado,
            sucesso && styles.botaoSucesso,
          ]}
          onPress={handleSalvar}
          disabled={carregando || !podeSalvar}
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
            <Text style={styles.botaoTexto}>
              {tipo === 'despesa' ? 'Adicionar Despesa' : 'Adicionar Assinatura'}
            </Text>
          )}
        </TouchableOpacity>
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
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
  },
  tipoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tipoBotao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  tipoAtivo: {
    backgroundColor: AZUL,
    borderColor: AZUL,
  },
  tipoTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  campo: { gap: 6 },
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
  inputMultiline: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoriaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoriaItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  categoriaLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  humorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  humorItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  humorEmoji: {
    fontSize: 20,
  },
  humorLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  estrelasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  limparTexto: {
    fontSize: 13,
    marginLeft: 4,
  },
  botao: {
    backgroundColor: AZUL,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: AZUL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.4,
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